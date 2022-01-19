import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { id, community_id } = JSON.parse(event.body);

  try {
    // Create a new usesr in the public schema (public.communities_users)
    let { data: communityUser, error: communityUserError } = await supabase
      .from("communities_users")
      .insert([
          {community_id: community_id, user_id: id}
      ])
    if (communityUserError) throw { error: communityUserError };
      
    return {
      statusCode: 200,
      body: JSON.stringify({ communityUser }),
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
