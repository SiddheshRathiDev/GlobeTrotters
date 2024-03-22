import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Messages from "../../assets/3.png";
import Memories from "../../assets/5.png";
import Trips from "../../assets/map.png";
import { AuthContext } from "../../context/authContext";
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import Diversity3TwoToneIcon from '@mui/icons-material/Diversity3TwoTone';
import CommuteTwoToneIcon from '@mui/icons-material/CommuteTwoTone';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Groups2Icon from '@mui/icons-material/Groups2';
import { useContext } from "react";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            {/* <img src={Friends} alt="" /> */}
            <PeopleAltOutlinedIcon/>
            <span>Friends</span>
          </div>
          <div className="item">
            {/* <img src={Messages} alt="" /> */}
            <MessageRoundedIcon/>
            <span>Messages</span>
          </div>
          <div className="item">
            {/* <img src={Groups} alt="" /> */}
            <Groups2Icon/>
            <span>Groups</span>
          </div>
          <div className="item">
            {/* <img src={Trips} alt="" /> */}
            <CommuteTwoToneIcon/>
            <span>Trips</span>
          </div>
          <div className="item">
            {/* <img src={Memories} alt="" /> */}
            <AddAPhotoIcon/>
            <span>Memories</span>
          </div>
        </div>
      </div>
    </div >
  );
};

export default LeftBar;
