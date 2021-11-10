DROP TRIGGER IF EXISTS trig_create_user_from_auth ON auth.users;
DROP FUNCTION IF EXISTS public.create_user_from_auth;

CREATE FUNCTION public.create_user_from_auth() RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.users (id)
    VALUES (NEW.id);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trig_create_user_from_auth
AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.trig_create_user_from_auth();