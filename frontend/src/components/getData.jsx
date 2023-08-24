import axios from "axios";
import { createUrl } from '../utils/utils'
import { useState } from "react";
import { useEffect } from "react";
import { background } from "material-paper/build/lib/styles/paper.stl";
import { blue } from "@mui/material/colors";
import GetPostLikes from "../services/getPostLikes";

import { GetLikes } from "../services/funs";



async function GetData()
{
    const [likes, setLikes] = useState(0);

  useEffect(() => {
    
    async function fetchData() {
      const postId = 2; // Replace with the actual post ID
      const likesCount = await GetLikes();
      setLikes(likesCount);
    }

    fetchData();
  }, []);

  return (
    <div>
      <p>Likes</p>
    </div>
  );

}
   


    



export default GetData;