/*
  # Fix RLS Policies for Anonymous Users
  
  1. Schema Changes
    - Make `user_id` nullable to support anonymous users
    - Add `session_id` column to track anonymous user sessions
    - Create index on `session_id` for query performance
  
  2. Security Changes
    - Drop existing restrictive policies that require authentication
    - Create new policies that work for both authenticated and anonymous users:
      - Authenticated users can view only their own charts (user_id check)
      - Anonymous users can view only charts from their session (session_id check)
      - Authenticated users can create charts for themselves (user_id set automatically)
      - Anonymous users can create charts with their session_id
      - Update and delete follow same pattern
  
  3. Important Notes
    - This maintains security by ensuring users can only access their own data
    - Anonymous users are isolated by session_id (browser-based identifier)
    - Authenticated users are isolated by user_id
    - No more `USING (true)` policies that bypass security
*/

-- Make user_id nullable to support anonymous users
ALTER TABLE birth_charts ALTER COLUMN user_id DROP NOT NULL;

-- Add session_id column for anonymous user tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'birth_charts' AND column_name = 'session_id'
  ) THEN
    ALTER TABLE birth_charts 
    ADD COLUMN session_id text;
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_birth_charts_session_id ON birth_charts(session_id);

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own birth charts" ON birth_charts;
DROP POLICY IF EXISTS "Users can create own birth charts" ON birth_charts;
DROP POLICY IF EXISTS "Users can update own birth charts" ON birth_charts;
DROP POLICY IF EXISTS "Users can delete own birth charts" ON birth_charts;

-- Create secure RLS policies for both authenticated and anonymous users

-- SELECT: Users can view charts they own (by user_id or session_id)
CREATE POLICY "Users can view own birth charts"
  ON birth_charts
  FOR SELECT
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

-- INSERT: Users can create charts for themselves
CREATE POLICY "Users can create own birth charts"
  ON birth_charts
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

-- UPDATE: Users can update only their own charts
CREATE POLICY "Users can update own birth charts"
  ON birth_charts
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

-- DELETE: Users can delete only their own charts
CREATE POLICY "Users can delete own birth charts"
  ON birth_charts
  FOR DELETE
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );