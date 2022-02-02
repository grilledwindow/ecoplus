import { Handler } from "@netlify/functions";
import { Event } from "@netlify/functions/dist/function/event";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event: Event, context) => {
  try {
    const { session: clientSession, event_id, img } = JSON.parse(event.body);

    const { session, error: sessionError } = await supabase.auth.setSession(clientSession.refresh_token);
    if (sessionError) throw { error: sessionError };

    const { data: newSession } = await supabase.auth.refreshSession();
    
    const fileName = `events/${event_id}.jpg`;
    const buf = Buffer.from(img, 'base64');

    const { data: imgData, error: imgError } = await supabase.storage.from('public')
      .upload(fileName, buf, {
        contentType: "image/jpeg",
        upsert: true,
        cacheControl: "0",
      });
    if (imgError) throw { error: imgError, session: newSession };

    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .update({ has_img: true })
      .eq("id", event_id);
    if (eventError) throw { error: eventError }

    return {
      statusCode: 200,
      body: JSON.stringify({
            imgUrl: `https://stolploftqaslfirbfsf.supabase.in/storage/v1/object/${imgData.Key}`,
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
