-- Schedules the ads-cron Edge Function via pg_cron + pg_net, every 30 minutes.
-- Run this once in the Supabase SQL editor, AFTER the edge function is deployed with
-- `supabase functions deploy ads-cron --no-verify-jwt` (platform-level JWT
-- verification is disabled on purpose: pg_net calls this with ADS_API_KEY as the
-- bearer token, not a Supabase-issued JWT, and the function checks that itself).
--
-- Uses Vault instead of pasting the key into the cron job definition directly, so
-- it never sits in plaintext in cron.job.

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

-- Run once by hand with the real ADS_API_KEY value (same one the dashboard and the
-- Next.js API routes use), then never commit the substituted version of this line.
select vault.create_secret(
  'PASTE_YOUR_ADS_API_KEY_HERE',
  'ads_cron_auth_key',
  'ADS_API_KEY, used by pg_net to authenticate to the ads-cron edge function'
);

select cron.schedule(
  'ads-cron-poll',
  '*/30 * * * *',
  $$
  select net.http_post(
    url := 'https://vlucekvrdxvpkvbizabz.supabase.co/functions/v1/ads-cron',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (
        select decrypted_secret from vault.decrypted_secrets where name = 'ads_cron_auth_key'
      )
    ),
    body := '{}'::jsonb
  ) as request_id;
  $$
);

-- To check it's running: select * from cron.job; select * from cron.job_run_details order by start_time desc limit 10;
-- To stop it: select cron.unschedule('ads-cron-poll');
