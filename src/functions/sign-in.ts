import { Handler } from "@netlify/functions";
import { brotliDecompressSync } from "zlib";
import { supabase } from "./utils/supabase";
import { profilePhotoUrl } from "./utils/imgUrl";

const handler: Handler = async (event, context) => {
  const { email, password } = JSON.parse(event.body);

  try {
    // Create a new user in the auth schema (auth.users)
    let { user: authUser, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw { error: error };

    let { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)

    let user = data[0];
    let body = { user, session, data };
    if (user.has_img) {
      body["imgUrl"] = profilePhotoUrl(user.id);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(body),
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
