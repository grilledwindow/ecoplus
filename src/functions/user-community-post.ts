import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { community_id, user_id, post } = JSON.parse(event.body);

  try {
    // Create a new post in the public schema (public.community_posts)
    let { data: communityPost, error: communityPostError } = await supabase
      .from("communities_posts")
      .insert([
          {community_id: community_id, user_id: user_id, post: post}
      ])
    if (communityPostError) throw { error: communityPostError };
      
    return {
      statusCode: 200,
      body: JSON.stringify({ communityPost }),
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
