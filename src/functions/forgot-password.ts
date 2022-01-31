import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { email } = JSON.parse(event.body);

  try {
      // forgot passsword
    let { data, error } = await supabase.auth.api.resetPasswordForEmail(email);
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
