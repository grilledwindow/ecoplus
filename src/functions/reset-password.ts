import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { access_token, new_password } = JSON.parse(event.body);

  try {
      // reset passsword
    const { error, data } = await supabase.auth.api
      .updateUser(access_token, { password : new_password })
    if (error) throw { error: error };

    return {
      statusCode: 200,
      body: JSON.stringify({ data, error }),
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
