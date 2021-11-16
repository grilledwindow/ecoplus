# Database usage documentation

This page shows how to use Supabase together with Netlify functions.

## Packages

1. Netlify CLI

```npm
npm i -g netlify-cli
```

2. Supabase

```npm
npm i
```

## Supabase config

1. Rename `example.env` to `.env`.
2. Replace the string in `SUPABASE_KEY="your-supabase-key"` with your Supabase
   API key.
3. Replace `supabaseUrl` in `src/functions/utils/supabase.ts` with your Supabase
   URL.

## Netlify usage

1. Run the command `netlify dev`.
2. Go to [localhost:8888](http://localhost:8888).

## Netlify functions usage

All functions are stored in the `src/functions` folder. An example of a sign up
function can be found at [/src/functions/sign-up.ts](/src/functions/sign-up.ts).

A request to the endpoint `/api/sign-up` of this function can be made as follows:

```js
const email = "bendover@nail.com";
const name = "Ben Dover";
const username = "brick";
const password = "securepasswrd";
fetch("/api/sign-up", {
  method: "POST",
  body: JSON.stringify({
    email,
    name,
    username,
    password,
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

Output:

```json
{
  "user": {
    "id": "d5596d42-31cf-4480-8227-c38e6ea9c017",
    "name": "Ben Dover",
    "username": "brick",
    "created_at": "2021-11-11T06:44:59.49933+00:00",
    "updated_at": "2021-11-11T06:44:59.49933+00:00"
  }
}
```
