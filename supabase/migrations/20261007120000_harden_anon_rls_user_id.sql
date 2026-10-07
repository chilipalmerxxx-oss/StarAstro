/*
  # Durcissement RLS : une session anonyme ne peut pas écrire de user_id

  1. Problème
    - Pour les visiteurs anonymes, les politiques INSERT / UPDATE vérifiaient
      seulement `session_id = x-session-id`, sans imposer `user_id IS NULL`.
    - Une session anonyme pouvait donc créer (ou modifier) une ligne portant le
      `user_id` d'un compte connecté : thème, données The Void ou abonnement
      push injectés dans le compte de quelqu'un d'autre (et, pour `void_data`,
      blocage de sa ligne unique).
    - `push_subscriptions` n'avait pas de WITH CHECK sur UPDATE.

  2. Correctif
    - Mêmes politiques qu'avant, avec `user_id IS NULL` dans la branche anonyme
      des contrôles d'écriture (WITH CHECK).
    - Lecture et suppression inchangées.
    - L'app envoie déjà `user_id: null` pour les sessions anonymes : aucun
      changement de comportement.
*/

-- birth_charts ---------------------------------------------------------------

DROP POLICY IF EXISTS "Users can create own birth charts" ON birth_charts;
CREATE POLICY "Users can create own birth charts"
  ON birth_charts
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

DROP POLICY IF EXISTS "Users can update own birth charts" ON birth_charts;
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
    (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

-- void_data ------------------------------------------------------------------

DROP POLICY IF EXISTS "Users can create own void data" ON void_data;
CREATE POLICY "Users can create own void data"
  ON void_data
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

DROP POLICY IF EXISTS "Users can update own void data" ON void_data;
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
    (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );

-- push_subscriptions (INSERT déjà correct ; UPDATE sans WITH CHECK) -----------

DROP POLICY IF EXISTS "Users can update own push subscriptions" ON push_subscriptions;
CREATE POLICY "Users can update own push subscriptions"
  ON push_subscriptions
  FOR UPDATE
  TO authenticated, anon
  USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  )
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND user_id IS NULL AND session_id IS NOT NULL AND session_id = current_setting('request.headers', true)::json->>'x-session-id')
  );
