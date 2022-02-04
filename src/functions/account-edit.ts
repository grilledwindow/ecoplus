import { Handler } from "@netlify/functions";
import { supabase } from "./utils/supabase";

const handler: Handler = async (event, context) => {
    const { user_id, name, username } = JSON.parse(event.body);

    try {
        let fields = {};
        if (!name && !username) {
            return {
                statusCode: 200,
                body: JSON.stringify({ data: null }),
            }
        }

        if (name) {
            fields["name"] = name;
        }
        if (username) {
            fields["username"] = username;
        }
        const { data, error } = await supabase
        .from('users')
        .update(fields)
        .eq('id', user_id);

        if (error) throw { error: error };
        console.log(data)
        return {
            statusCode: 200,
            body: JSON.stringify({ data }),
        };
    } 

    catch (error) { 
        console.error(error)
        
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }
};

export { handler };