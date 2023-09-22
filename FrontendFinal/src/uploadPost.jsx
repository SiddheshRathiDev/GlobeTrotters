import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Button, Input, Paper, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createUrl } from './utils/utils';
import axios from 'axios';

const UploadPost = () => {

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

      const formData = new FormData();
      formData.append('UserId', 9);
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
            type="file" accept="image/*"
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
        <img src = {imagePreview}></img>
      </div>
    </Paper>
  );
};

export default UploadPost;