import * as meta from "./meta";
import * as google from "./google";
import type { Platform } from "../db";

export interface PlatformAdapter {
  createCampaign(input: { name: string; dailyBudgetCents: number }): Promise<{ externalCampaignId: string }>;
  pauseCampaign(externalCampaignId: string): Promise<void>;
  getSpend(externalCampaignId: string): Promise<{ spendCents: number; impressions: number; clicks: number }>;
  isConfigured(): boolean;
}

const adapters: Record<Platform, PlatformAdapter> = { meta, google };

export function getAdapter(platform: Platform): PlatformAdapter {
  return adapters[platform];
}
