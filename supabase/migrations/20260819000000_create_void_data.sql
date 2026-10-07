/*
  # Create void_data table (cross-device sync for The Void)

  1. New Tables
    - `void_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable) - Set when the person is logged in
      - `session_id` (text, nullable) - Set for anonymous browser sessions
      - `birth_data` (jsonb) - { date, time, city, latitude, longitude } used by The Void
      - `history` (jsonb array) - Questions asked, responses received, pinned/liked state
      - `updated_at` (timestamptz)
      - `created_at` (timestamptz)

    One row per user (or per anonymous session) — it is upserted in place
    rather than appended to, since it mirrors what used to be a single
    localStorage document.

  2. Security
    - Enable RLS on `void_data`
    - Authenticated users can only read/write the row matching their own
      `user_id` (auth.uid())
    - Anonymous users can only read/write the row matching their own
      `session_id`, sent via the `x-session-id` request header (same
      mechanism already used by `birth_charts`)
*/

CREATE TABLE IF NOT EXISTS void_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  session_id text,
  birth_data jsonb,
  history jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS void_data_user_id_unique
  ON void_data (user_id) WHERE user_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS void_data_session_id_unique
  ON void_data (session_id) WHERE user_id IS NULL AND session_id IS NOT NULL;

ALTER TABLE void_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own void data"
  ON void_data
  FOR SELECT
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

CREATE POLICY "Users can create own void data"
  ON void_data
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

CREATE POLICY "Users can update own void data"
  ON void_data
  FOR UPDATE
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  )
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

CREATE POLICY "Users can delete own void data"
  ON void_data
  FOR DELETE
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );
