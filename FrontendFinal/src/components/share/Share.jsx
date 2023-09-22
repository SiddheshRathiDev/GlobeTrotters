import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useSelector } from "react-redux";
import { createUrl } from "../../utils/utils";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { Input } from "@mui/material";
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";


const Share = () => {

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Define the state for image preview
  const [caption, setCaption] = useState('');
  const [locationName, setLocationName] = useState('');
  const [openModal, setOpenModal] = useState(false);


  const currentUserId = sessionStorage.getItem("currentUserId");
  const currentUSerProfilePic = createUrl("/api/ProfilePic/" + currentUserId);
  const currentUserName = sessionStorage.getItem("currentUserName");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Update the image file state
    setImageFile(selectedImage);

    // Display a preview of the selected image
    const previewURL = URL.createObjectURL(selectedImage);
    setImagePreview(previewURL);
    setOpenModal(true);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleUploadPost = async () => {
    try {
      // Create a new FormData instance and append the data

      //   const UserId = currentUserId;
      //   const ImageFile = imageFile;
      //   const  Caption = caption;
      //   const LocationName = locationName;
      //   const Latitude = 0;
      //   const Longitude = 0;

      const formData = new FormData();
      formData.append('UserId', currentUserId);
      formData.append('ImageFile', imageFile);
      formData.append('Caption', caption);
      formData.append('Latitude', 0);
      formData.append('Longitude', 0);
      formData.append('LocationName', locationName);



      const path = createUrl("/api/posts/upload_post");
      const response = await axios.post(path, formData);

      console.log(formData);

      if (response.status === 200) {
        // Show success toast and reset the state
        toast.success('Post uploaded successfully!', {
          position: toast.POSITION.BOTTOM_CENTER,
        });

        setImageFile(null);
        setCaption('');
        setLocationName('');
      } else {
        // Show error toast
        toast.error('Failed to upload post. Please try again later.', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      // Show error toast
      toast.error('Error uploading post. Please try again later.', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    navigate("/");


  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };




  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUSerProfilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUserName}?`} value={caption}
            onChange={handleCaptionChange} />

        </div>

        <hr />
        <div className="bottom">
          <div className="left">
            <Input
              type="file" accept="image/*"
              id="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            ></Input>

            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span >Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>

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
                  <input style={{
                    border: 'none',
                    outline: 'none',
                    padding: '20px 10px',
                    backgroundColor: 'transparent',
                    width: '60%',
                  }}
                    // type="text" placeholder={`What's on your mind ${currentUserName}?`} value={caption}
                    type="text" placeholder={`What's on your mind`} value={caption}
                    onChange={handleCaptionChange} />
                  <Input
                    placeholder="Add a location"
                    fullWidth
                    value={locationName}
                    onChange={handleLocationChange}
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
                  }} onClick={handleUploadPost}>Share</button>
                </div>

              </Paper>
            </Modal>

          </div>
          <div className="right">
            <button onClick={handleUploadPost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
