import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
    const { event_id, name, description, details, location, date, contact_email, contact_no, community_id } = JSON.parse(event.body);

    try {
        const { data, error } = await supabase
        .from('events')
        .update({
            name: name, 
            datetime: date, 
            location: location, 
            details: details, 
            description: description, 
            contact_email:contact_email, 
            contact_no:contact_no, 
            community_id:community_id,
        })
        .eq('id', event_id)
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