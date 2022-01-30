import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { community_id, user_id } = JSON.parse(event.body);

  try {
    const { data } = await supabase
      .from("communities_users")
      .delete()
      .eq("user_id", user_id)
      .eq("community_id", community_id)
      
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
