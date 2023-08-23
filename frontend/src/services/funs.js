import axios from "axios";
import { createUrl } from "../utils/utils";


async function GetLikes ()
{
    var path = createUrl("/api/PostLikes/" + 2);
    var likes = 0;

    try {
        const response = await axios.get(path);
        return response.data; // Return the number of likes
      } catch (error) {
        console.error('Error fetching likes:', error);
        return 0; // Return a default value in case of an error
      }
    
}

export {GetLikes};