import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Messages from "../../assets/3.png";
import Memories from "../../assets/5.png";
import Trips from "../../assets/map.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { createUrl } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LeftBar = () => {

  const currentUserId = sessionStorage.getItem("currentUserId");
  const currentUSerProfilePic = createUrl("/api/ProfilePic/"+currentUserId);
  const currentUserName = sessionStorage.getItem("currentUserName");

  const navigate = useNavigate();

  const handleClick = () =>
  {
    navigate("/");
  }
  

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user" onClick={handleClick}>
            <img

              src={currentUSerProfilePic}
              alt=""
              onClick={handleClick}
            />
            <span>{currentUserName}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Trips} alt="" />
            <span>Trips</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LeftBar;
