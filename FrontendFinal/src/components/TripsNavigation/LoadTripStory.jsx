import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import "./TripsNavigation.scss";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';


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


function LoadTripstroy(props) {

  const [userInfo, setUserInfo] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getTripInfo = (id) => {
    axios
      .get("https://localhost:7118/api/Trips/all_trip_info/" + id)
      .then((resp) => {
        setUserInfo(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getTripInfo(props.id);
  }, []);

  return (
    <>
      <div className='story'>
        <img src={"https://localhost:7118/api/ProfilePic/" + props.id} alt="" onClick={handleOpen}/>
        <span>{userInfo.userName}</span>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Location Name :{userInfo.locationName}
          </Typography>
          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            Route : {userInfo.itinerary}
          </Typography>
          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
            Interested Count : {userInfo.interestedCount}
          </Typography>
          <ThumbUpOffAltIcon/>
        </Box>
      </Modal>
    </>
  );
}

export default LoadTripstroy;
