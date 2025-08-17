-- rentlix_users: RLS + trigger to auto-create profile from auth.users

-- 1) Ensure RLS is enabled
ALTER TABLE IF EXISTS public.rentlix_users ENABLE ROW LEVEL SECURITY;

-- 2) Policies (id = auth.uid())
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'rentlix_users' AND policyname = 'rentlix_users_select_own'
  ) THEN
    EXECUTE 'CREATE POLICY rentlix_users_select_own ON public.rentlix_users
      FOR SELECT
      USING (auth.uid() = id)';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'rentlix_users' AND policyname = 'rentlix_users_update_own'
  ) THEN
    EXECUTE 'CREATE POLICY rentlix_users_update_own ON public.rentlix_users
      FOR UPDATE
      USING (auth.uid() = id)';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'rentlix_users' AND policyname = 'rentlix_users_insert_own'
  ) THEN
    EXECUTE 'CREATE POLICY rentlix_users_insert_own ON public.rentlix_users
      FOR INSERT
      WITH CHECK (auth.uid() = id)';
  END IF;
END $$;

-- 3) updated_at trigger support (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  PERFORM 1 FROM pg_trigger t
  JOIN pg_class c ON c.oid = t.tgrelid
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE t.tgname = 'update_rentlix_users_updated_at'
    AND n.nspname = 'public'
    AND c.relname = 'rentlix_users';
  IF NOT FOUND THEN
    EXECUTE 'CREATE TRIGGER update_rentlix_users_updated_at BEFORE UPDATE ON public.rentlix_users
      FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()';
  END IF;
END $$;

-- 4) Trigger to auto-create a row in rentlix_users when an auth user is created
CREATE OR REPLACE FUNCTION public.handle_auth_user_created_rentlix()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.rentlix_users (id, email, full_name, is_verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email_confirmed_at IS NOT NULL
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Replace existing trigger if present
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE t.tgname = 'on_auth_user_created_rentlix'
      AND n.nspname = 'auth'
      AND c.relname = 'users'
  ) THEN
    EXECUTE 'DROP TRIGGER on_auth_user_created_rentlix ON auth.users';
  END IF;
  EXECUTE 'CREATE TRIGGER on_auth_user_created_rentlix
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_auth_user_created_rentlix()';
END $$;
