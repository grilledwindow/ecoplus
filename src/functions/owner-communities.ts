import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { id } = JSON.parse(event.body);

  try {
    const { data } = await supabase
      .from("communities")
      .select("id, name")
      .eq("owner_id", id)
      console.log(data)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
