import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { id, user_id } = JSON.parse(event.body);

  try {
    let { data: sameEvent, error: sameEventError } = await supabase
        .from("events_users")
        .select("*")
        .eq("id", id)
        .eq("user_id", user_id)
    if (sameEvent.length > 0) throw { error: "You have joined this event already" };

    // Create a new user in the public schema (public.events_users)
    let { data: eventUser, error: eventUserError } = await supabase
      .from("events_users")
      .insert([
          {id: id, user_id: user_id}
      ])
    if (eventUserError) throw { error: eventUserError };
      
    return {
      statusCode: 200,
      body: JSON.stringify({ eventUser }),
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
