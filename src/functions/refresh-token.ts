import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";
import { profilePhotoUrl } from "./utils/imgUrl";

const handler: Handler = async (event, context) => {
  const { session: clientSession } = JSON.parse(event.body);
  console.log("old session:", clientSession.expires_at, clientSession.refresh_token);
  console.log("currenttime:", Math.round(Date.now() / 1000))

  try {
    // this doesnt actually work
    const { session: s, error: sessionError } = await supabase.auth.setSession(clientSession.refresh_token);
    if (sessionError) throw { error: sessionError }
    console.log("try session:", s.expires_at, s.refresh_token);

    const { data: session, error } = await supabase.auth.refreshSession();
    if (error) throw { error }
    console.log("new session:", session.expires_at, session.refresh_token);

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("username, has_img")
      .eq("id", session.user.id);
    if (userError) throw { error: userError }

    return {
      statusCode: 200,
      body: JSON.stringify({
        session,
        username: userData[0].username,
        imgUrl: userData[0].has_img ? profilePhotoUrl(session.user.id) : null,
      }),
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
