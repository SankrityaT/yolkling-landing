-- Schedules the ads-cron Edge Function via pg_cron + pg_net, every 30 minutes.
-- Run this once in the Supabase SQL editor, AFTER the edge function is deployed
-- (`supabase functions deploy ads-cron`) and its secrets are set.
--
-- Uses Vault instead of pasting the service role key into the cron job definition
-- directly, so the key never sits in plaintext in cron.job.

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

-- Run once by hand with your real service role key (Project Settings > API), then
-- never commit the substituted version of this line anywhere.
select vault.create_secret(
  'PASTE_YOUR_SERVICE_ROLE_KEY_HERE',
  'ads_cron_service_role_key',
  'used by pg_net to call the ads-cron edge function'
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
        select decrypted_secret from vault.decrypted_secrets where name = 'ads_cron_service_role_key'
      )
    ),
    body := '{}'::jsonb
  ) as request_id;
  $$
);

-- To check it's running: select * from cron.job; select * from cron.job_run_details order by start_time desc limit 10;
-- To stop it: select cron.unschedule('ads-cron-poll');
