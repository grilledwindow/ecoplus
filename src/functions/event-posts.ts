import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { id } = JSON.parse(event.body);

  try {
    const { data } = await supabase
      .from("events_posts")
      .select("users(username), post")
      .eq("event_id", id)
      
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
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
