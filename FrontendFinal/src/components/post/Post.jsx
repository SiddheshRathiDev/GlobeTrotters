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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {

  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [ifLiked, setIfLiked] = useState(0);

  const [numberOfComments, setNumberOfComments] = useState(0);

 // const { profileId } = useParams();

 const [postProfileId, setProfileId] = useState(0);


  const [userName, setUserName] = useState([]);
 
  const postImagePath = createUrl("/api/posts/get_post_image/"+post);
  const pathProfilePic = createUrl("/api/ProfilePic/");
  // const currentUserId = useSelector((state)=>state.auth.userId);
  const currentUserId = sessionStorage.getItem("currentUserId");

  
  const [postProfilePic, setPostProfilePic] = useState("");


  //TEMPORARY
  const liked = false;
  const getCommentCount = async () => {

    //get comment count
    const pathNumberofComments = createUrl("/api/posts/getCommentCount/" + post);
    axios.get(pathNumberofComments)
        .then((response) => {

            setNumberOfComments(response.data);
            console.log(numberOfComments);

        })
        .catch((error) => {
            console.log(error);
        })

  }

  //get posts username and profilephoto
  const getUserName = async () => {
    const pathForUsername = createUrl("/api/posts/getUserName/" + post);

            axios.get(pathForUsername)
            .then((response) => {
              setUserName(response.data);
              setPostProfilePic(pathProfilePic + response.data.map((ele) => ele.userId));
              setProfileId(response.data.map((ele) => ele.userId));
           })
            .catch((error) => {
                console.log(error);
            })

  }

  const getIfLiked = async () => {
    const pathForIfLiked = createUrl("/api/PostLikes/GetData?userId=" + currentUserId + "&postId=" + post);

          axios.get(pathForIfLiked)
              .then((response) => {
                  setIfLiked(response.data);
           
              })
              .catch((error) => {
                  console.log(error);
              })

  }

  

  useEffect(() => {
    console.log("in Post "+currentUserId)
    getUserName();
    getCommentCount();
    getIfLiked();

  },[])

  useEffect(() => {
    getCommentCount();
  },[commentOpen])


  // useEffect(() => {

    
  //     console.log("in Post "+currentUserId)
    
  //         //get if post is liked
          
  
  // }, [numberOfComments, commentOpen, postProfilePic, currentUserId])


  //taking number of likes seperately

  useEffect(()=>{

    const getLikes = async () => {
      const path = createUrl("/api/posts/" + post);
      try {
          const response = await axios.get(path);
          setNumberOfLikes(response.data);
      } catch (ex) {


      }

    }

    getLikes();

  },[numberOfLikes, ifLiked]);




  const getLikes = async () => {
    const path = createUrl("/api/posts/" + post);
    try {
        const response = await axios.get(path);
        setNumberOfLikes(response.data);
    } catch (ex) {


    }


    

  }

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
                getLikes();
                
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
              getLikes();
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
                to={`/profile/${postProfileId}`}
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
          {/* <div className="item">
            <ShareOutlinedIcon />
            Share
          </div> */}
        </div>
        {commentOpen && <Comments post={post} key={post.id} />}
      </div>
    </div>
  );
};

export default Post;
