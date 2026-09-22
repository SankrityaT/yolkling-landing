// Google Ads API adapter (REST interface, no client library).
//
// createCampaign builds the full serving chain in one call: budget, campaign, geo +
// language targeting, ad group, keywords (phrase match), and a Responsive Search Ad
// with the final URL (UTM params included, built by the caller). That's the whole
// resource graph Google needs before a real person can see this.
//
// Known geo target constants (Google's fixed IDs, not ours):
//   US = 2840, Japan = 2392. Language constants: English = 1000, Japanese = 1005.

// Google Ads API versions sunset fast and without much warning: v17 was already
// gone, v20 got blocked, and even v21 (confirmed live on 2026-08-09) was a 404 by
// 2026-08-22, two weeks later. Confirmed v25 live via a real listAccessibleCustomers
// + campaignBudgets:mutate call. If createCampaign starts failing with
// UNSUPPORTED_VERSION or a plain 404, this is the first thing to re-check.
const API_VERSION = "v25";

function requireConfig() {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID; // the MCC, digits only
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID; // the actual Yolkling Ads account, digits only
  const missing = [
    !clientId && "GOOGLE_ADS_CLIENT_ID",
    !clientSecret && "GOOGLE_ADS_CLIENT_SECRET",
    !refreshToken && "GOOGLE_ADS_REFRESH_TOKEN",
    !developerToken && "GOOGLE_ADS_DEVELOPER_TOKEN",
    !loginCustomerId && "GOOGLE_ADS_LOGIN_CUSTOMER_ID",
    !customerId && "GOOGLE_ADS_CUSTOMER_ID",
  ].filter(Boolean);
  if (missing.length) {
    throw new Error(`Google Ads is not configured yet, missing: ${missing.join(", ")}`);
  }
  return { clientId: clientId!, clientSecret: clientSecret!, refreshToken: refreshToken!, developerToken: developerToken!, loginCustomerId: loginCustomerId!, customerId: customerId! };
}

async function getAccessToken(): Promise<string> {
  const { clientId, clientSecret, refreshToken } = requireConfig();
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Google token refresh failed: ${body.error_description || body.error}`);
  return body.access_token;
}

async function adsFetch(path: string, init: RequestInit = {}) {
  const { developerToken, loginCustomerId, customerId } = requireConfig();
  const accessToken = await getAccessToken();
  const res = await fetch(`https://googleads.googleapis.com/${API_VERSION}/customers/${customerId}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "developer-token": developerToken,
      "login-customer-id": loginCustomerId,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Google Ads API error (${res.status}): ${JSON.stringify(body?.error || body)}`);
  }
  return body;
}

export async function createCampaign(input: {
  name: string;
  dailyBudgetCents: number;
  keywords: string[];
  headlines: string[]; // 3-15, each <= 30 chars
  descriptions: string[]; // 2-4, each <= 90 chars
  finalUrl: string;
  geoTargetConstant: string; // e.g. "2840" (US) or "2392" (Japan)
  languageConstant?: string; // default "1000" (English)
  validateOnly?: boolean; // dry-run: builds every request, persists nothing
}): Promise<{ externalCampaignId: string; adGroupId: string; validated: boolean }> {
  const { customerId } = requireConfig();
  const validateOnly = Boolean(input.validateOnly);

  const budgetRes = await adsFetch(`/campaignBudgets:mutate`, {
    method: "POST",
    body: JSON.stringify({
      validateOnly,
      operations: [
        {
          create: {
            name: `${input.name} budget`,
            amountMicros: String(input.dailyBudgetCents * 10_000),
            deliveryMethod: "STANDARD",
          },
        },
      ],
    }),
  });
  // In validateOnly mode Google returns no resourceName (nothing was created), so
  // every downstream step uses a placeholder resource name instead of a real one.
  const budgetResourceName = validateOnly
    ? `customers/${customerId}/campaignBudgets/0`
    : budgetRes.results[0].resourceName;

  const campaignRes = await adsFetch(`/campaigns:mutate`, {
    method: "POST",
    body: JSON.stringify({
      validateOnly,
      operations: [
        {
          create: {
            name: input.name,
            advertisingChannelType: "SEARCH",
            status: "ENABLED",
            campaignBudget: budgetResourceName,
            manualCpc: {},
            networkSettings: { targetGoogleSearch: true, targetSearchNetwork: false },
          },
        },
      ],
    }),
  });
  const campaignResourceName: string = validateOnly
    ? `customers/${customerId}/campaigns/0`
    : campaignRes.results[0].resourceName;
  const externalCampaignId = campaignResourceName.split("/").pop()!;

  // Geo + language targeting on the campaign itself.
  await adsFetch(`/campaignCriteria:mutate`, {
    method: "POST",
    body: JSON.stringify({
      validateOnly,
      operations: [
        {
          create: {
            campaign: campaignResourceName,
            location: { geoTargetConstant: `geoTargetConstants/${input.geoTargetConstant}` },
          },
        },
        {
          create: {
            campaign: campaignResourceName,
            language: { languageConstant: `languageConstants/${input.languageConstant ?? "1000"}` },
          },
        },
      ],
    }),
  });

  const adGroupRes = await adsFetch(`/adGroups:mutate`, {
    method: "POST",
    body: JSON.stringify({
      validateOnly,
      operations: [
        {
          create: {
            name: `${input.name} ad group`,
            campaign: campaignResourceName,
            status: "ENABLED",
            type: "SEARCH_STANDARD",
          },
        },
      ],
    }),
  });
  const adGroupResourceName: string = validateOnly
    ? `customers/${customerId}/adGroups/0`
    : adGroupRes.results[0].resourceName;
  const adGroupId = adGroupResourceName.split("/").pop()!;

  await adsFetch(`/adGroupCriteria:mutate`, {
    method: "POST",
    body: JSON.stringify({
      validateOnly,
      operations: input.keywords.map((text) => ({
        create: {
          adGroup: adGroupResourceName,
          status: "ENABLED",
          keyword: { text, matchType: "PHRASE" },
        },
      })),
    }),
  });

  await adsFetch(`/adGroupAds:mutate`, {
    method: "POST",
    body: JSON.stringify({
      validateOnly,
      operations: [
        {
          create: {
            adGroup: adGroupResourceName,
            status: "ENABLED",
            ad: {
              finalUrls: [input.finalUrl],
              responsiveSearchAd: {
                headlines: input.headlines.map((text) => ({ text })),
                descriptions: input.descriptions.map((text) => ({ text })),
              },
            },
          },
        },
      ],
    }),
  });

  return { externalCampaignId, adGroupId, validated: validateOnly };
}

export async function pauseCampaign(externalCampaignId: string): Promise<void> {
  const { customerId } = requireConfig();
  await adsFetch(`/campaigns:mutate`, {
    method: "POST",
    body: JSON.stringify({
      operations: [
        {
          update: { resourceName: `customers/${customerId}/campaigns/${externalCampaignId}`, status: "PAUSED" },
          updateMask: "status",
        },
      ],
    }),
  });
}

export async function getSpend(
  externalCampaignId: string
): Promise<{ spendCents: number; impressions: number; clicks: number }> {
  const body = await adsFetch(`/googleAds:search`, {
    method: "POST",
    body: JSON.stringify({
      query: `SELECT metrics.cost_micros, metrics.impressions, metrics.clicks FROM campaign WHERE campaign.id = ${externalCampaignId}`,
    }),
  });
  const row = body?.results?.[0]?.metrics;
  if (!row) return { spendCents: 0, impressions: 0, clicks: 0 };
  return {
    spendCents: Math.round(Number(row.costMicros || 0) / 10_000),
    impressions: Number(row.impressions || 0),
    clicks: Number(row.clicks || 0),
  };
}

export function isConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_ADS_CLIENT_ID &&
      process.env.GOOGLE_ADS_CLIENT_SECRET &&
      process.env.GOOGLE_ADS_REFRESH_TOKEN &&
      process.env.GOOGLE_ADS_DEVELOPER_TOKEN &&
      process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID &&
      process.env.GOOGLE_ADS_CUSTOMER_ID
  );
}
