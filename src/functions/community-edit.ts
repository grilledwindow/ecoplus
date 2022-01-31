import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { community_id, name, description } = JSON.parse(event.body);

  try {
        const { data, error } = await supabase
        .from('communities')
        .update({
            name: name,
            description: description,
        })
        .eq('id', community_id)
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
