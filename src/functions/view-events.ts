import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
  try {
    const { data } = await supabase
      .from("events")
      .select("*")
      .order('id', { ascending: true })

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
