import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { id } = JSON.parse(event.body);
  
  try {

    let { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      if (eventError) throw { error: eventError };

    let { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", event[0].user_id)
      if (userError) throw { error: userError };

    if (event[0].community_id != null) {
      let { data: community, error: communityError } = await supabase
      .from("communities")
      .select("*")
      .eq("id", event[0].community_id)
      if (communityError) throw { error: communityError };

      return {
        statusCode: 200,
        body: JSON.stringify({ data: {user:user, event:event, community:community} }),
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: {user:user, event:event} }),
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