DROP TRIGGER IF EXISTS create_user_from_auth ON auth.users;
DROP TRIGGER IF EXISTS on_user_update ON public.users;
DROP TRIGGER IF EXISTS on_community_create ON public.communities;
DROP TRIGGER IF EXISTS on_event_create ON public.events;

CREATE OR REPLACE FUNCTION public.create_user_from_auth()
RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.users (id)
    VALUES (NEW.id);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_user_from_auth
AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_from_auth();

CREATE OR REPLACE FUNCTION public.on_user_update()
RETURNS trigger AS $$
  BEGIN
    NEW.updated_at := timezone('gmt'::text, now());
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_update
BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.on_user_update();

CREATE OR REPLACE FUNCTION public.add_community_owner_to_communities_users()
RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.communities_users
    VALUES (NEW.id, NEW.owner_id, NEW.created_at);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_community_create
AFTER INSERT ON public.communities
  FOR EACH ROW EXECUTE FUNCTION public.add_community_owner_to_communities_users();

CREATE OR REPLACE FUNCTION public.add_event_owner_to_events_users()
RETURNS trigger AS $$
  BEGIN
    INSERT INTO public.events_users
    VALUES (NEW.id, NEW.owner_id, NEW.created_at);
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_event_create
AFTER INSERT ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.add_event_owner_to_events_users();