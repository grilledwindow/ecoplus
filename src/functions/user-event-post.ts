import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { event_id, user_id, post } = JSON.parse(event.body);

  try {
    // Create a new post in the public schema (public.community_posts)
    let { data: eventPost, error: eventPostError } = await supabase
      .from("events_posts")
      .insert([{event_id: event_id, user_id: user_id, post: post}])
    if (eventPostError) throw { error: eventPostError };
      
    return {
      statusCode: 200,
      body: JSON.stringify({ eventPost }),
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
