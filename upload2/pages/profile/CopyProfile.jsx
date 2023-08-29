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
import Button from '@mui/material/Button';


import { createUrl } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from './../../components/post/Post';

const Profile = () => {
  const currentUserId = sessionStorage.getItem("currentUserId");
  const currentUSerProfilePic = createUrl("/api/ProfilePic/" + currentUserId);
  const currentUserName = sessionStorage.getItem("currentUserName");
  const [postIdArray, setPostIdArray] = useState([]);
  const [followStatus, setFollowStatus] = useState("");
  const [isSelf, setIsSelf] = useState(0);
  const [profileUserName, setProfileUserName] = useState("");

  const { profileId } = useParams();
  const userProfilePic = createUrl("/api/ProfilePic/" + profileId);

  useEffect(() => {

    const fetchProfileStatus = async () => {
      if (profileId == currentUserId) {
        console.log("self");
        setFollowStatus("self");
      }

      else {
        const path = createUrl("/api/Connections/GetData?userId=" + currentUserId + "&otherUserId=" + profileId);
        axios.get(path)
          .then((response) => {

            if (response.data == -1) {
              setFollowStatus("Following")
            }
            else if (response.data == 1) {
              setFollowStatus("Following You")
            }
            else {
              setFollowStatus("Follow");
            }

          })
      }

    }


    const fetchData = async () => {
      try {
        const path = createUrl("/api/posts/getIndividualPost/" + profileId);
        const resp = await axios.get(path);
        setPostIdArray(resp.data);
        // dispatch(setPostId(postIdArray));
        console.log("in axios profile posts " + resp.data);

        // console.log("in redux "+ red )

      } catch (error) {
        console.log("in error");
        return []
      }
    };


    const fetchUserName = async () => {
      try {
        const path = createUrl("/getUserName" + profileId);
        const resp = await axios.get(path);
        setProfileUserName(resp.data);
        console.log(profileUserName);
        // dispatch(setPostId(postIdArray));
        console.log("in axios" + resp.data);

        // console.log("in redux "+ red )

      } catch (error) {
        console.log("in error");
        return []
      }
    };

   


    fetchUserName();
    
    fetchProfileStatus();
    fetchData();
   

  }, [followStatus, profileId, profileUserName])




  function handleFollow() {
    if (followStatus == "Following") {
      console.log("in if");
      const path = createUrl("/api/Connections/unFollow?userId=" + currentUserId + "&otherId=" + profileId);
      axios.delete(path)
        .then((response) => {

          setFollowStatus("Follow")
        })
    }
    else if (followStatus == "Following You") {
      console.log("in else if");
      const path = createUrl("/api/Connections/removeFollower?userId=" + currentUserId + "&otherId=" + profileId);
      axios.delete(path)
        .then((response) => {

          setFollowStatus("Follow")
        })
    }
    else {
      console.log("else");
      const path = createUrl("/api/Connections/follow?userId=" + currentUserId + "&otherId=" + profileId);
      axios.post(path)
        .then((response) => {
          setFollowStatus("Following")
        })
    }
  }


  // function changeProfilePhoto () {
  //   if (currentUserId == profileId)
  //   {

  //   }
  // }




  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src={userProfilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left" style={{marginTop:'46px'}}>
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
            <div style={{ backgroundColor: `` }}><h2>{profileUserName}</h2></div>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>India</span>
              </div>
              
            </div>

            {followStatus == "self" ? <></> : <Button variant="contained" color="success" onClick={handleFollow} >
              {followStatus}
            </Button>}



          

          </div>
          <div>
            
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        {postIdArray.map(post => (
          <Post post={post} key={post.id} />
        ))}
        
      </div>
    </div>
  );
};

export default Profile;
