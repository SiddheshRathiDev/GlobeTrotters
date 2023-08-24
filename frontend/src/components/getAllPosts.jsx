import { useEffect } from "react";
import Post from "./post";
import axios from "axios";
import { createUrl } from "../utils/utils";


import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import CopyPost from "./copyPost";
import { setPostId } from "../features/postIdSlice";

export default function GetAllPosts ({postIdArray}) {
   

//     const [postIdArray, setPostIdArray] = useState([]);
//     const [red, setRed] = useState([]);

//     const dispatch = useDispatch();
//     setRed(useSelector((state) => state.postIds.postIdArray))

//     useEffect(() => {
//         const fetchData = async () => {
//             try{
//                 const path = createUrl("/api/posts/getIndividualPost/"+4);
//                 const resp = await axios.get(path);
//                 setPostIdArray(resp.data);
//                 dispatch(setPostId(postIdArray));
//                 console.log("in axios" + resp.data);
                
//                 console.log("in redux "+ red )
                
//             }catch(error){
//                 console.log("in error");
//                 return []
//             }
//         };
        
//         fetchData();
//     }, [])
    
    
    
    
    var arr = [1, 2, 3, 4]
    return (
        <>         
            {console.log("in return " + postIdArray)} 
            {arr.map((ele) => CopyPost(ele) )}
           
        </>
    );
}