import * as meta from "./meta";
import * as google from "./google";
import type { Platform } from "../db";

export interface CreateCampaignInput {
  name: string;
  dailyBudgetCents: number;
  keywords: string[];
  headlines: string[];
  descriptions: string[];
  finalUrl: string;
  geoTargetConstant: string;
  languageConstant?: string;
  validateOnly?: boolean;
}

export interface PlatformAdapter {
  createCampaign(
    input: CreateCampaignInput
  ): Promise<{ externalCampaignId: string; adGroupId?: string; validated?: boolean }>;
  pauseCampaign(externalCampaignId: string): Promise<void>;
  getSpend(externalCampaignId: string): Promise<{ spendCents: number; impressions: number; clicks: number }>;
  isConfigured(): boolean;
}

const adapters: Record<Platform, PlatformAdapter> = { meta, google };

export function getAdapter(platform: Platform): PlatformAdapter {
  return adapters[platform];
}
