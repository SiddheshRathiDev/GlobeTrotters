// import { useContext } from "react";
// import "./TripsNavigation.scss";
// import { AuthContext } from "../../context/authContext";

// const Stories = () => {
//   const { currentUser } = useContext(AuthContext);

//   //TEMPORARY
//   const stories = [
//     {
//       id: 1,
//       name: "Prasad",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 2,
//       name: "Hitesh",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 3,
//       name: "Shardul",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//     {
//       id: 4,
//       name: "Saurabh",
//       img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
//     },
//   ];

//   return (
//     <div className="stories">
//       <div className="story">
//         <img src={currentUser.profilePic} alt="" />
//         <span>{currentUser.name}</span>
//         <button>+</button>
//       </div>

//       {stories.map((story) => (
//         <div className="story" key={story.id}>
//           <img src={story.img} alt="" />
//           <span>{story.name}</span>
//         </div>
//       ))}
//     </div>
//   );
// };


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
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.id;
  const [itinerary , setItinerary] = useState('');
  const [locationName , setLocationName] = useState('');
  const[userIamFollowingArr,setUserIamFollowingArr] = useState([]);

  const [open, setOpen] = React.useState(false);
  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);


  const onloadSetUsersIdIFollow = ()=> {
    axios
    .get('http://localhost:9999/api/Connections/i_follow/' + currentUser.id)
    .then((resp)=> {
      setUserIamFollowingArr(resp.data);
    })
    .catch((err)=> {
      console.log(err.message);
    })
  }

  const addTripStroy = ()=> {
    axios.post('http://localhost:9999/api/Trips/',{userId,locationName,itinerary})
    .then((resp)=> {
      alert(resp.data);
      closeForm();
    })
    .catch((error)=> {
      alert(error.message);
      closeForm();
    })
  }


  useEffect(onloadSetUsersIdIFollow,[]);


  return (
    <div className="stories">
      <div className="story">
        <img
          src={"http://localhost:9999/api/ProfilePic/" + currentUser.id}
          alt=""
        />
        <span>{currentUser.name}</span>
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
            Cancle
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

