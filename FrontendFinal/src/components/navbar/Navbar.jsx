import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { createUrl } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';

import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

import { IconButton, Avatar, Typography } from '@mui/material';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  //const { currentUser } = useContext(AuthContext);

  const currentUserId = sessionStorage.getItem("currentUserId");
  const currentUserProfilePic = createUrl("/api/ProfilePic/" + currentUserId);
  const currentUserName = sessionStorage.getItem("currentUserName");
  const pathProfilePic = createUrl("/api/ProfilePic/");

  const timestamp = new Date().getTime();
  const currentUSerProfilePicWithTimestamp = `${currentUserProfilePic}?${timestamp}`;

  const [searchTerm, setSearchTerm] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  
  const profileNavigation = () => {
    navigate('/profile/' + currentUserId)
    this.forceUpdate(); 
  }

  const profileNavigationSearch = (userId) => {

    navigate('/profile/'+userId);  

  }


  //new

 

 

  const handleSearch = () => {
  
    axios.get("https://localhost:7118/getUserNameAndId/"+searchTerm)
    .then((resp) => {
        console.log(resp.data)
        setUserNames(resp.data);

    })
   

    setOpenModal(true);
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  



  return (
    <div className="navbar">
      <div className="left">

        <Link to="/" style={{ textDecoration: "none" }}>
          <span>GlobeTrotters</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />

        <Box>
          <div className="search" >
            <SearchOutlinedIcon onClick={handleSearch} />
            <input type="text" placeholder="Search..." label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
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



            
            
            <Paper style={{ width: '100%', maxWidth: '300px', padding: '20px', marginTop: '-500px' }}>

              {userNames.map(user => {return (
                <>
                  <div className="user">
            <div className="userInfo" style={{display:'flex', alignItems:'center'}}>
              <img style ={{width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover'}}
                
                src={pathProfilePic+user.userId}
                alt="../../../public/images/NoUser.png"
                onClick={() => profileNavigationSearch(user.userId)}
                // onClick={() => profileNavigation(user.userId)}
              />
              
              <span style = {{marginLeft:'20px'}} >{user.userName}</span>
            </div>
            </div>
                </>
              )})}

            
            </Paper>
          </Modal>


        </Box>




      </div>


      <div className="right">
        {/* <PersonOutlinedIcon /> */}
        <NotificationsOutlinedIcon />
        <div className="user" onClick={profileNavigation}>
          <img
            src={currentUSerProfilePicWithTimestamp}
            alt=""
          />
          <span>{currentUserName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
