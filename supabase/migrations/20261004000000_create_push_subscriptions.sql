/*
  # Daily challenge push notifications

  1. New table `push_subscriptions`
    - One Web Push subscription per device (unique endpoint)
    - Owned by the signed-in user (user_id) or the anonymous browser session (session_id)
    - `timezone` + `notify_hour` let the sender deliver at the user's local morning
    - `last_sent_on` prevents sending twice the same day

  2. Security
    - Same isolation as birth_charts: user_id for authenticated users,
      x-session-id header for anonymous users
    - The sender (Edge Function `daily-notification`) uses the service role
*/

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint text UNIQUE NOT NULL,
  subscription jsonb NOT NULL,
  user_id uuid REFERENCES auth.users (id) ON DELETE CASCADE,
  session_id text,
  timezone text NOT NULL DEFAULT 'Europe/Paris',
  notify_hour smallint NOT NULL DEFAULT 8 CHECK (notify_hour BETWEEN 0 AND 23),
  last_sent_on date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_push_subscriptions_session_id ON push_subscriptions (session_id);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id ON push_subscriptions (user_id);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own push subscriptions"
  ON push_subscriptions
  FOR SELECT
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

CREATE POLICY "Users can create own push subscriptions"
  ON push_subscriptions
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

CREATE POLICY "Users can update own push subscriptions"
  ON push_subscriptions
  FOR UPDATE
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

CREATE POLICY "Users can delete own push subscriptions"
  ON push_subscriptions
  FOR DELETE
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );
