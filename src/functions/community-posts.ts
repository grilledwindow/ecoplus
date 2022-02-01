import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";
import { profilePhotoUrl } from "./utils/imgUrl";

const handler: Handler = async (event, context) => {
  const { community_id } = JSON.parse(event.body);

  try {
    const { data: posts } = await supabase
      .from("communities_posts_view")
      .select("*")
      .eq("community_id", community_id)
      
    posts.forEach(function(post, index, arr) {
      if (post.has_img) {
        arr[index]["imgUrl"] = profilePhotoUrl(post.user_id);
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ posts }),
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
