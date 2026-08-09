-- Ad-ops schema: UTM attribution + campaign tracking + spend snapshots.
-- Run once in the Supabase SQL editor (no migration runner in this repo, same as
-- the existing waitlist/feedback tables). Safe to re-run, everything is IF NOT EXISTS.

alter table waitlist
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists utm_term text;

create index if not exists waitlist_utm_campaign_idx on waitlist (utm_campaign);

-- One row per ad campaign we create, on either platform. external_campaign_id is
-- null until the platform actually creates it (draft/failed creations still get a row
-- so we have a full audit trail, per CLAIMS.md-style honesty: never hide a failure).
create table if not exists ad_campaigns (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('meta', 'google')),
  external_campaign_id text,
  hook text not null,
  utm_campaign text not null unique,
  daily_budget_cents integer not null,
  lifetime_budget_cents integer,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'paused', 'failed', 'ended')),
  status_detail text,
  created_at timestamptz not null default now(),
  launched_at timestamptz,
  paused_at timestamptz
);

-- Spend/performance polled on a schedule (see app/api/ads/cron). One row per poll.
create table if not exists ad_spend_snapshots (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references ad_campaigns (id) on delete cascade,
  spend_cents integer not null default 0,
  impressions integer not null default 0,
  clicks integer not null default 0,
  fetched_at timestamptz not null default now()
);

create index if not exists ad_spend_snapshots_campaign_idx
  on ad_spend_snapshots (campaign_id, fetched_at desc);
