import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Input, Paper, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AuthContext } from "../../context/authContext";
import { uploadPost as uploadPostApi } from '../../services/user';

const UploadPost = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = useSelector(state => state.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Define the state for image preview
  const [caption, setCaption] = useState('');
  const [locationName, setLocationName] = useState('');

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
  
    // Update the image file state
    setImageFile(selectedImage);
  
    // Display a preview of the selected image
    const previewURL = URL.createObjectURL(selectedImage);
    setImagePreview(previewURL);
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
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('caption', caption);
      formData.append('location', locationName);

      // Call the API to upload the post
      const response = await uploadPostApi(userId, formData);

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
  };

  return (
    <Paper elevation={3} className="upload-post">
      <div className="upload-container">
        <Typography variant="h6" gutterBottom>
          Upload a New Post
        </Typography>
        {/* Use a label to trigger the file input */}
        <label htmlFor="file">
          <Input
            type="file"
            id="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
          </Button>
        </label>
        <Input
          placeholder="Add a caption"
          fullWidth
          value={caption}
          onChange={handleCaptionChange}
        />
        <Input
          placeholder="Add a location"
          fullWidth
          value={locationName}
          onChange={handleLocationChange}
        />
        <div className="upload-button">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadPost}
          >
            Share
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default UploadPost;
