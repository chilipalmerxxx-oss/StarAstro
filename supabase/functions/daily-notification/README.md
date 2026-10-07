# daily-notification

Sends the morning "Ton défi du jour t'attend" push to every device that turned
the reminder on from the CoStar page.

## One-time setup

1. Generate a VAPID key pair (keep the private key secret):

   ```sh
   npx web-push generate-vapid-keys
   ```

2. Front-end: add the public key to the Vercel environment (and `.env.local`
   for local tests):

   ```
   VITE_VAPID_PUBLIC_KEY=<public key>
   ```

3. Apply the migration `20261004000000_create_push_subscriptions.sql`
   (`supabase db push`).

4. Function secrets and deploy:

   ```sh
   supabase secrets set VAPID_PUBLIC_KEY=<public key> VAPID_PRIVATE_KEY=<private key> \
     VAPID_SUBJECT=mailto:<contact email> CRON_SECRET=<long random string>
   supabase functions deploy daily-notification --no-verify-jwt
   ```

5. Call it every hour (SQL editor, with `pg_cron` and `pg_net` enabled):

   ```sql
   select cron.schedule(
     'daily-notification',
     '0 * * * *',
     $$
     select net.http_post(
       url := 'https://<project-ref>.supabase.co/functions/v1/daily-notification',
       headers := jsonb_build_object('Authorization', 'Bearer <CRON_SECRET>')
     );
     $$
   );
   ```

## Notes

- Each subscription is notified once per local day, from `notify_hour`
  (8 h by default) in its own timezone.
- iPhone: Web Push only works once the app is added to the home screen
  (iOS 16.4+). The CoStar page explains this instead of showing the toggle.
- Expired subscriptions (HTTP 404/410) are deleted automatically.
