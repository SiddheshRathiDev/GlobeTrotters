import Post from "../post/Post";
import "./posts.scss";


import { useState, useEffect } from "react";
import { createUrl } from "../../utils/utils";

import Post2 from "../post/Post2";



import axios from "axios";

const Posts = () => {
  //TEMPORARY
  const [postIdArray, setPostIdArray] = useState([]);


 
  
      useEffect(() => {
          const fetchData = async () => {
              try{
                  const path = createUrl("/api/posts/getAllPostsIds");
                  const resp = await axios.get(path);
                  setPostIdArray(resp.data);
                  // dispatch(setPostId(postIdArray));
                  console.log("in axios" + resp.data);
                  
                  // console.log("in redux "+ red )
                  
              }catch(error){
                  console.log("in error");
                  return []
              }
          };


         
          fetchData();
      }, [])

  return <div className="posts">
    {postIdArray.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
  </div>;
};

export default Posts;
