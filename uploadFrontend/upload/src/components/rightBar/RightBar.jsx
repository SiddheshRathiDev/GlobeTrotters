import { useEffect, useState } from "react";
import "./rightBar.scss";
import axios from "axios";
import { createUrl } from "../../utils/utils";
import { useSelector } from "react-redux";


const RightBar = () => {

  const [userName, setUserName] = useState([]);
  const pathProfilePic = createUrl("/api/ProfilePic/");
  const currentUserId = useSelector((state)=>state.auth.userId);


  useEffect(()=>{
    const fetchData = async () => {
      try{
          const path = createUrl("/api/Users/getUserWithMaxLikedPost/"+currentUserId);
          const resp = await axios.get(path);
          setUserName(resp.data);
          // dispatch(setPostId(postIdArray));
          console.log("in axioss " + resp.data);
          
          // console.log("in redux "+ red )
          
      }catch(error){
          console.log("in error");
          return []
      }
  };

  fetchData();
  },[])


  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {userName.map(user => {return (<>
            <div className="user">
            <div className="userInfo">
              <img
                src={pathProfilePic+user.userId}
                alt=""
              />
              <span>{user.userName}</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Ignore</button>
            </div>
          </div>
          
          
          </>)})}
          
          
          
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Akash Naik</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Hitesh Yewale</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Gaurav Tiwary</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                <span>Mohit Dhawale</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Akash Naik</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Hitesh Yewale</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Gaurav Tiwary</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Madhav Wakhare</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Shardul Limaye</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
