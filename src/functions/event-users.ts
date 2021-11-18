import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { event_id } = JSON.parse(event.body);

  try {
    const { data } = await supabase
      .from("events_users")
      .select("users(id, name)")
      .eq("event_id", event_id)
      
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
