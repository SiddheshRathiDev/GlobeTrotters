import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { createUrl } from "../../utils/utils";
import { useDispatch, useSelector } from 'react-redux';



const Comments = ({ post }) => {
  const { currentUser } = useContext(AuthContext);
  
  
  
  const [comments, setComments] = useState([]);
  const [postComment, setPostComment] = useState("");
  const pathProfilePic = createUrl("/api/ProfilePic/");
  const [justToReloadComments, setJustToReloadComments] = useState("");
  
  
  //const currentUserId = useSelector((state) => state.auth.userId);
  
  const currentUserId = useSelector((state)=>state.auth.userId);
  const currentUSerProfilePic = createUrl("/api/ProfilePic/"+currentUserId);
  
  
  useEffect(() => {
    
    //get comments
    const pathComment = createUrl("/api/PostComments/" + post);
   
    axios.get(pathComment)
    .then((response) => {

        setComments(response.data);
        console.log(response.data);


      })
      .catch((error) => {
        console.log(error);
      })

  }, [postComment])


  const postCommentToServer = () => {


    const path = createUrl("/api/PostComments");
    axios.post(path, {
      "postId": post,
      "userId": currentUserId,
      "commentContent": postComment
    })
      .then((response) => {
        setPostComment("");
      })
      .catch((error) => {
        console.log(error)
      });

      
  }





  return (
    <div className="comments">
      <div className="write">
        <img src={pathProfilePic+currentUserId} alt="" />
        <input type="text" value = {postComment} onChange={(args) => setPostComment(args.target.value)} placeholder="write a comment" />
        <button onClick={postCommentToServer}>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={pathProfilePic + comment.userId} alt="" />
          <div className="info">
            <span>{comment.userName}</span>
            <p>{comment.commentContent}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
