import { Handler } from "@netlify/functions";
import { Event } from "@netlify/functions/dist/function/event";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event: Event, context) => {
  try {
    const { session: clientSession } = JSON.parse(event.body);

    const { session, error: sessionError } = await supabase.auth.setSession(clientSession.refresh_token);
    console.log(session)
    if (sessionError) throw { error: sessionError };

    const { data: newSession } = await supabase.auth.refreshSession();

    const fileName = `users/${session.user.id}.jpg`;

    const { data: imgData, error: imgError } = await supabase.storage.from('public').remove([fileName]);
    if (imgError) throw { error: imgError, session: newSession };

    const { data: userData, error: userError } = await supabase
      .from("users")
      .update({ has_img: false })
      .eq("id", session.user.id);
    if (userError) throw { error: userError }

    return {
      statusCode: 200,
      body: JSON.stringify({
        session: newSession,
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
