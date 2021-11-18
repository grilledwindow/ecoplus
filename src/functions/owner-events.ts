import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  const { id } = JSON.parse(event.body);

  try {
    const { data: data, error: error } = await supabase
      .from("events")
      .select("id, name")
      .eq("owner_id", id)
    if (error) throw (error)

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
