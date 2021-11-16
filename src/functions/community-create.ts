import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { name, description, owner_id } = JSON.parse(event.body);

  try {
    // Check if community name exists
    const { data: sameCommunityName } = await supabase
      .from("communities")
      .select("name")
      .eq("name", name);
    if (sameCommunityName.length > 0) throw { error: "Community name has been taken" };

    // Create a new community in the public schema (public.communities)
    let { data: community, error: communityError } = await supabase
      .from("communities")
      .insert([
          {name: name, description: description, owner_id: owner_id}
      ])
    
    // Add owner to communities users table
    let { data: userCommunity, error: userCommunityError } = await supabase
      .from("communities_users")
      .insert([
          {id: owner_id, community_id: community[0].id}
      ])
    if (communityError) throw { error: communityError };

    return {
      statusCode: 200,
      body: JSON.stringify({ community: community[0] }),
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
