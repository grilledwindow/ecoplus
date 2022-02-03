import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
    const { user_id, name, username } = JSON.parse(event.body);
    console.log(user_id, name, username);
    try {
        const { data, error } = await supabase
        .from('users')
        .update({
            name: name, 
            username: username
        })
        .eq('id', user_id);
        if (error) throw { error: error };
        console.log(data)
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