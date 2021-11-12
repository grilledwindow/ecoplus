DROP TRIGGER IF EXISTS create_user_from_auth ON auth.users;
DROP FUNCTION IF EXISTS public.create_user_from_auth;

CREATE FUNCTION public.create_user_from_auth() RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.users (id)
    VALUES (NEW.id);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;