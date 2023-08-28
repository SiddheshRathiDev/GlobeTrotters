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
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { createUrl } from "../../utils/utils";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  //const { currentUser } = useContext(AuthContext);

  

  const currentUserId = useSelector((state) => state.auth.userId);
  const currentUserProfilePic = createUrl("/api/ProfilePic/"+currentUserId);
  const currentUserName = useSelector((state) => state.auth.currentUserName);

  const navigate = useNavigate();

  const profileNavigation = () => {
    navigate('/profile/'+currentUserId)
  }



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
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user" onClick={profileNavigation}>
          <img
            src={currentUserProfilePic}
            alt=""
          />
          <span>{currentUserName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
