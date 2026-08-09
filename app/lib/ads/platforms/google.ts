// Google Ads API adapter (REST interface, no client library). Same scope note as the
// Meta adapter: this creates a campaign budget + campaign object and reads its spend.
// Ad groups, keywords, and ads (the layer that actually shows something to someone)
// come once real keyword/copy decisions are made, not faked here. A campaign with no
// ad group under it spends nothing.

const API_VERSION = "v17";

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
}): Promise<{ externalCampaignId: string }> {
  const micros = input.dailyBudgetCents * 10_000; // cents -> micros (1 unit = 1,000,000 micros)

  const budgetRes = await adsFetch(`/campaignBudgets:mutate`, {
    method: "POST",
    body: JSON.stringify({
      operations: [
        {
          create: {
            name: `${input.name} budget`,
            amountMicros: String(micros),
            deliveryMethod: "STANDARD",
          },
        },
      ],
    }),
  });
  const budgetResourceName = budgetRes.results[0].resourceName;

  const campaignRes = await adsFetch(`/campaigns:mutate`, {
    method: "POST",
    body: JSON.stringify({
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
  const resourceName: string = campaignRes.results[0].resourceName; // "customers/{id}/campaigns/{campaignId}"
  const externalCampaignId = resourceName.split("/").pop()!;
  return { externalCampaignId };
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
