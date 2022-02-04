import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { name, description, details, location, date, contact_email, contact_no, community_id, owner_id } = JSON.parse(event.body);

  try {
    // Check if event name exists
    const { data: sameEventName } = await supabase
        .from("events")
        .select("name")
        .eq("name", name);
    if (sameEventName.length > 0) throw { error: "Event name has been taken" };

    // Create a new event in the public schema (public.events)
    let { data: event, error: eventError } = await supabase
      .from("events")
      .insert([
          {name: name, datetime:date, location: location, details: details, description: description, contact_email:contact_email, contact_no:contact_no, community_id:community_id, owner_id: owner_id, has_img: false}
      ])
    
    // Add owner to event users table
    let { data: userEvent, error: userEventError } = await supabase
      .from("events_users")
      .insert([
          {user_id: owner_id, event_id: event[0].id}
      ])
    if (eventError) throw { error: eventError };

    return {
      statusCode: 200,
      body: JSON.stringify({ event: event[0] }),
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
