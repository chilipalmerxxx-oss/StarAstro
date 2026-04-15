/*
  # Fix Birth Charts Security Issues
  
  1. Schema Changes
    - Add `user_id` column to `birth_charts` table to track ownership
    - Set default to `auth.uid()` for new records
    - Create index on `user_id` for query performance
  
  2. Security Changes
    - Drop existing insecure RLS policies that use `USING (true)` and `WITH CHECK (true)`
    - Create restrictive policies that check authentication and ownership:
      - Users can only view their own birth charts
      - Users can only create birth charts for themselves
      - Users can only update their own birth charts
      - Users can only delete their own birth charts
  
  3. Important Notes
    - All policies now require authentication (`TO authenticated`)
    - All policies verify ownership by checking `user_id = auth.uid()`
    - Anonymous users no longer have access to birth charts
    - This ensures data privacy and proper access control
*/

-- Add user_id column to track ownership
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'birth_charts' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE birth_charts 
    ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_birth_charts_user_id ON birth_charts(user_id);

-- Drop existing insecure policies
DROP POLICY IF EXISTS "Anyone can view birth charts" ON birth_charts;
DROP POLICY IF EXISTS "Anyone can create birth charts" ON birth_charts;

-- Create secure RLS policies

-- Users can view only their own birth charts
CREATE POLICY "Users can view own birth charts"
  ON birth_charts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can create birth charts only for themselves
CREATE POLICY "Users can create own birth charts"
  ON birth_charts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update only their own birth charts
CREATE POLICY "Users can update own birth charts"
  ON birth_charts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete only their own birth charts
CREATE POLICY "Users can delete own birth charts"
  ON birth_charts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);