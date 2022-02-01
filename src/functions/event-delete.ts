import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { event_id } = JSON.parse(event.body);

  try {

    // delete all event posts
    const { data: eventPosts } = await supabase
        .from("events_posts")
        .delete()
        .eq("event_id", event_id)
      
    // delete community users
    const { data: eventUsers } = await supabase
        .from("events_users")
        .delete()
        .eq("event_id", event_id)

    // delete event
    const { data: event } = await supabase
        .from("events")
        .delete()
        .eq("id", event_id)
      
    return {
      statusCode: 200,
      body: JSON.stringify({ event }),
    };
  } 
  
  catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};

export { handler };
