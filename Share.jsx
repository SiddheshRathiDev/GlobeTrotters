import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
const Share = () => {

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                {/* <img src={Image} alt="" /> */}
                <AddPhotoAlternateOutlinedIcon/>
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              {/* <img src={Map} alt="" /> */}
              <AddLocationAltOutlinedIcon/>
              <span>Add Place</span>
            </div>
            <div className="item">
              {/* <img src={Friend} alt="" /> */}
              <TagOutlinedIcon/>+
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
