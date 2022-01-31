import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { community_id } = JSON.parse(event.body);

  try {
    // set events's community_id to null
    const { data: communityEvents } = await supabase
        .from("events")
        .update({ community_id: null })
        .eq("community_id", community_id)

    // delete all community posts
    const { data: communityPosts } = await supabase
        .from("communities_posts")
        .delete()
        .eq("community_id", community_id)
      
    // delete community users
    const { data: communityUsers } = await supabase
        .from("communities_users")
        .delete()
        .eq("community_id", community_id)

    // delete community
    const { data: community } = await supabase
        .from("communities")
        .delete()
        .eq("id", community_id)
      
    return {
      statusCode: 200,
      body: JSON.stringify({ communityEvents }),
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
