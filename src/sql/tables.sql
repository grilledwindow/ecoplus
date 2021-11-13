DROP TABLE IF EXISTS public.events_posts;
DROP TABLE IF EXISTS public.communities_posts;
DROP TABLE IF EXISTS public.volunteers;
DROP TABLE IF EXISTS public.events;
DROP TABLE IF EXISTS public.communities;
DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
  id uuid not null PRIMARY KEY, -- UUID from auth.users
  name text,
  username text,
  created_at timestamp with time zone DEFAULT timezone('gmt'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('gmt'::text, now()) NOT NULL
);

CREATE TABLE public.communities (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('gmt'::text, now()) NOT NULL,
  owner_id uuid references public.users NOT NULL
);

CREATE TABLE public.events (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  datetime timestamp with time zone NOT NULL,
  location text NOT NULL,
  details text NOT NULL,
  description text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('gmt'::text, now()) NOT NULL,
  contact_email text NOT NULL,
  contact_contact_no char(8) NOT NULL,
  community_id bigint references public.communities,
  host_user_id uuid references public.users NOT NULL
);

CREATE TABLE public.volunteers (
  user_id uuid references public.users,
  event_id bigint references public.events,
);

CREATE TABLE public.communities_posts (
  communityt_id bigint references public.communities NOT NULL,
  user_id uuid references public.users NOT NULL,
  post text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('gmt'::text, now()) NOT NULL
);

CREATE TABLE public.events_posts (
  event_id bigint references public.events NOT NULL,
  user_id uuid references public.users NOT NULL,
  post text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('gmt'::text, now()) NOT NULL
);