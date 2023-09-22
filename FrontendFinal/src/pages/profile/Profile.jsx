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
import axios from 'axios';
import { createUrl } from "../../utils/utils";
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { Input } from "@mui/material";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post2 from './../../components/post/Post';

const Profile = () => {
  const currentUserId = sessionStorage.getItem("currentUserId");
  const currentUSerProfilePic = createUrl("/api/ProfilePic/" + currentUserId);
  const currentUserName = sessionStorage.getItem("currentUserName");
  const [postIdArray, setPostIdArray] = useState([]);
  const [followStatus, setFollowStatus] = useState("");
  const [isSelf, setIsSelf] = useState(0);
  const [profileUserName, setProfileUserName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Define the state for image preview

  const { profileId } = useParams();
  const userProfilePic = createUrl("/api/ProfilePic/" + profileId);

  const timestamp = new Date().getTime();
  const currentUSerProfilePicWithTimestamp = `${userProfilePic}?${timestamp}`;

  const navigate = useNavigate();


  useEffect(() => {

    //check if following
    const fetchProfileStatus = async () => {
      if (profileId == currentUserId) {
        
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


    //get individual posts
    const fetchData = async () => {
      try {
        const path = createUrl("/api/posts/getIndividualPost/" + profileId);
        const resp = await axios.get(path);
        setPostIdArray(resp.data);
       
        console.log("in axios profile posts " + resp.data);

      } catch (error) {
        console.log("in error");
        return []
      }
    };


    //get profile name
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


  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Update the image file state
    setImageFile(selectedImage);

    // Display a preview of the selected image
    const previewURL = URL.createObjectURL(selectedImage);
    setImagePreview(previewURL);
    setOpenModal(true);
  };

  const uploadProfileImage = async () => {
    
    try {

      const formData = new FormData();
      formData.append('uId', currentUserId);
      formData.append('Image', imageFile);


      const path = createUrl("/api/ProfilePic/upload");
      const response = await axios.post(path, formData);
      navigate('/profile/' + currentUserId);
      setOpenModal(false);

      console.log(formData);

      if (response.status === 200) {
        // Show success toast and reset the state
        toast.success('Profile Picture uploaded successfully!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });

        setImageFile(null);
      } else {
        // Show error toast
        toast.error('Failed to upload image. Please try again later.', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      // Show error toast
      toast.error('Error uploading image. Please try again later.', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }


  };


  const handleCloseModal = () => {
    navigate('/profile/' + currentUserId);
    setOpenModal(false);
  };



  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <Input
          type="file" accept="image/*"
          id="file"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        ></Input>

        <label htmlFor="file">
          <div className="item">
           
             <img
              src={currentUSerProfilePicWithTimestamp} // Use the URL with timestamp
              alt="profile photo"
              className="profilePic"
            />
          </div>
        </label>


        <div className="bottom">
          <div className="left">

            <Modal
              open={openModal}
              onClose={handleCloseModal}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Paper style={{ width: '100%', maxWidth: '500px', padding: '20px', }}>
                <img src={imagePreview} style={{
                  maxWidth: '400px',
                  maxHeight: '400px',
                  borderRadius: '50px'
                }}></img>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  <img
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                    src={currentUSerProfilePic}
                    alt=""
                  />
                </div>

                <div className="right" >
                  <button style={{
                    border: 'none',
                    padding: '5px',
                    color: 'white',
                    cursor: 'pointer',
                    backgroundColor: '#5271ff',
                    borderRadius: '3px',
                    float: 'right'
                  }} onClick={uploadProfileImage}>Upload</button>
                </div>
              </Paper>
            </Modal>

          </div>
        </div>

      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left" style={{ marginTop: '46px' }}>
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
          <Post2 post={post} key={post.id} />
        ))}

      </div>
    </div>
  );
};

export default Profile;
