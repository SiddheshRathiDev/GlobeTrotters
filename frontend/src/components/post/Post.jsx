import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";

import axios from "axios";

import { createUrl } from "../../utils/utils";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [ifLiked, setIfLiked] = useState(0);

  const [numberOfComments, setNumberOfComments] = useState(0);


  const [userName, setUserName] = useState([]);
 
  const postImagePath = createUrl("/api/posts/get_post_image/"+post);
  const pathProfilePic = createUrl("/api/ProfilePic/");
  const currentUserId = useSelector((state)=>state.auth.userId);
  
  const [postProfilePic, setPostProfilePic] = useState("");


  //TEMPORARY
  const liked = false;

  useEffect(() => {

    

     //get number of likes
     const getLikes = async () => {
      

      const path = createUrl("/api/posts/" + post);
      try {
          const response = await axios.get(path);
          setNumberOfLikes(response.data);

    
      } catch (ex) {


      }

      //get comment count
      const pathNumberofComments = createUrl("/getCommentCount" + post);
      axios.get(pathNumberofComments)
          .then((response) => {

              setNumberOfComments(response.data);
              console.log(numberOfComments);

          })
          .catch((error) => {
              console.log(error);
          })


          //get if post is liked
          const pathForIfLiked = createUrl("/api/PostLikes/GetData?userId=" + currentUserId + "&postId=" + post);

          axios.get(pathForIfLiked)
              .then((response) => {
                  setIfLiked(response.data);
           
              })
              .catch((error) => {
                  console.log(error);
              })
  }

  const pathForUsername = createUrl("/api/posts/getUserName/" + post);

            axios.get(pathForUsername)
            .then((response) => {
              setUserName(response.data);
              setPostProfilePic(pathProfilePic + response.data.map((ele) => ele.userId))
           })
            .catch((error) => {
                console.log(error);
            })

 

    getLikes();

  }, [ifLiked, numberOfLikes, numberOfComments, commentOpen])

  var handleLike = () => {
    // if (colorLike == "") {
    //     setColorLike("red");

    // }
    // else {
    //     setColorLike("");
    // }
    if (ifLiked == 1) {
        console.log("in if ")
        const path = createUrl("/api/PostLikes/deleteLike?userId=" + currentUserId + "&postId=" + post);
        axios.delete(path)
            .then((response) => {
                
                setIfLiked(0);
            })
            .catch((error) => {
                console.log(error)
            });
    }
    else {
        
        console.log("in else")
        const path = createUrl("/api/PostLikes/insertLike?userId=" + currentUserId + "&postId=" + post);
        axios.post(path)
            .then((response) => {
              setIfLiked(1);
            })
            .catch((error) => {
                console.log(error)
            });
    }
}







  return (
    <div className="post">
      <div className="container" id = {post}>
        <div className="user">
          <div className="userInfo">
            <img src={postProfilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{userName.map(u=> {return(<>{u.userName}</>)})}</span>
              </Link>
              <span className="date">{userName.map(u=> {return(<>{u.locationName}</>)})}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <img src= {postImagePath} alt="" />
          
        </div>
        <div>
        <p>{userName.map(u=> {return(<>{u.caption}</>)})}</p>
        <br></br>
        </div>
        <div className="info">
          <div className="item" onClick={handleLike}>
            {ifLiked == 1  ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            {numberOfLikes} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {numberOfComments} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments post={post} key={post.id} />}
      </div>
    </div>
  );
};

export default Post;
