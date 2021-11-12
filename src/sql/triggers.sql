DROP TRIGGER IF EXISTS create_user_from_auth ON auth.users;
DROP FUNCTION IF EXISTS public.create_user_from_auth;

DROP TRIGGER IF EXISTS on_user_update ON public.users;
DROP FUNCTION IF EXISTS public.on_user_update;

CREATE FUNCTION public.create_user_from_auth() RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.users (id)
    VALUES (NEW.id);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_user_from_auth
AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_from_auth();

CREATE FUNCTION public.on_user_update() RETURNS trigger AS $$
  BEGIN
    NEW.updated_at := timezone('gmt'::text, now());
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_update
BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.on_user_update();