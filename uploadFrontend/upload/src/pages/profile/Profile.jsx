import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";


import { createUrl } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from './../../components/post/Post';

const Profile = () => {
  const currentUserId = useSelector((state)=>state.auth.userId);
  const currentUSerProfilePic = createUrl("/api/ProfilePic/"+currentUserId);
  const currentUserName = useSelector((state) => state.auth.currentUserName);
  const [postIdArray, setPostIdArray] = useState([]);
  const [followStatus,setFollowStatus] = useState(0);

  const {profileId} = useParams();

  //followStatus 
  //2 -> self
  //0 -> not following
  //1 -> other is following
  //-1 -> i am following

  useEffect(()=>{

    if(profileId == currentUserId)
    {
      setFollowStatus(2);
    }

    else{
      const path = createUrl("/api/Connections/GetData?userId="+currentUserId+"&otherUserId="+profileId);
        axios.get(path)
        .then((response) => {
            if(response.data == -1)
            {
              setFollowStatus("Following")
            }
            else if(response.data == 1)
            {
              setFollowStatus("Following You")
            }
           
        })
    }

    const fetchData = async () => {
      try{
          const path = createUrl("/api/posts/getIndividualPost/"+currentUserId);
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

  }, [followStatus])

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src={currentUSerProfilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center" >
            <div style={{backgroundColor:`red`}}>{currentUserName}</div>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            {followStatus == 1 ? <button>follow</button> : <div/> }
            
            
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        {postIdArray.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
      </div>
    </div>
  );
};

export default Profile;
