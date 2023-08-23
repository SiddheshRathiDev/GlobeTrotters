import axios from "axios";
import { createUrl } from "../utils/utils";


async function GetPostLikes(postId)
{
    var path = createUrl("/api/PostLikes/" + postId)
    var likes = 0;
    
    axios.get(path)
    .then(function (response){
        likes = response.data;
        console.log(response.data)
    })
    .catch(function (error) {
        console.log(error)
    })
    
    try {
        const response = await axios.get(path);
        console.log("in axios");
        console.log(response.data);
        likes = response.data;
        return likes;
      } catch (ex) {
        
        return 0
      }

   
    
}

export default GetPostLikes;