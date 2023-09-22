import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import "./TripsNavigation.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import LoadTripStory from "./LoadTripStory";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import { Stack } from '@mui/material';
import { createUrl } from '../../utils/utils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




const Stories = () => {
 // const { currentUser } = useContext(AuthContext);
  const userId = sessionStorage.getItem("currentUserId");
  const currentUserName = sessionStorage.getItem("currentUserName");
  const [itinerary , setItinerary] = useState('');
  const [locationName , setLocationName] = useState('');
  const[userIamFollowingArr,setUserIamFollowingArr] = useState([]);

  const pathProfilePic = createUrl("/api/ProfilePic/");

  const [open, setOpen] = React.useState(false);
  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);


  const onloadSetUsersIdIFollow = ()=> {
    axios
    .get('https://localhost:7118/api/Connections/i_follow/' + userId)
    .then((resp)=> {
      setUserIamFollowingArr(resp.data);
    
    })
    .catch((err)=> {
      console.log(err.message);
    })
  }

  const addTripStroy = ()=> {
    axios.post('https://localhost:7118/api/Trips/',{userId,locationName,itinerary})
    .then((resp)=> {
      //alert(resp.data);
      closeForm();
    })
    .catch((error)=> {
     // alert(error.message);
      closeForm();
    })
  }


  useEffect(onloadSetUsersIdIFollow,[]);


  return (
    <div className="stories">
      <div className="story">
        <img
          src={"https://localhost:7118/api/ProfilePic/" + userId}
          alt=""
        />
        <span>{currentUserName}</span>
        <button onClick={openForm}>+</button>
      </div>

      <Modal
        open={open}
        onClose={closeForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add Trip Details
          </Typography>
          <br />
          <Box sx={{ width: 500, maxWidth: "100%" }}>
            <TextField
              fullWidth
              label="Location Name"
              onChange={(e) => {
                setLocationName(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              fullWidth
              multiline
              maxRows={4}
              label="Itinerary[Route]"
              onChange={(e) => {
                setItinerary(e.target.value);
              }}
            />
          </Box>
          <br/>
          <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" onClick={addTripStroy}>
            Add Trip
          </Button>
          <Button variant="contained" color="error" onClick={closeForm}>
            Cancel
          </Button>
          </Stack>
        </Box>
      </Modal>

      {userIamFollowingArr.map((uId) => (
        <div className="story" key={uId}>
          <LoadTripStory id={uId} />
        </div>
      ))}
    </div>
  );
}

export default Stories;