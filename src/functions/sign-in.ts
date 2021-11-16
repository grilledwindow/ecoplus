import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { email, password } = JSON.parse(event.body);

  try {
    // Create a new user in the auth schema (auth.users)
    let { user: user, error: error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw { error: error };

    return {
      statusCode: 200,
      body: JSON.stringify({ user: user }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

export { handler };
