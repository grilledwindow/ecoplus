import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { email, password, name, username } = JSON.parse(event.body);

  try {
    // Check if username exists
    const { data: sameUsername } = await supabase
      .from("users")
      .select("username")
      .eq("username", username);
    if (sameUsername.length > 0) throw { error: "Username taken" };

    // Create a new user in the auth schema (auth.users)
    let { user: authUser, error: authUserError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authUserError) throw { error: authUserError };

    // Create a new user in the public schema (public.users)
    let { data: publicUser, error: publicUserError } = await supabase
      .from("users")
      .update({ name, username })
      .eq("id", authUser.id);
    if (publicUserError) throw { error: publicUserError };

    return {
      statusCode: 200,
      body: JSON.stringify({ authUser }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

export { handler };
