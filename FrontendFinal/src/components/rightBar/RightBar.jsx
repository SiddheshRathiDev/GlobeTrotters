import { useEffect, useState } from "react";
import "./rightBar.scss";
import axios from "axios";
import { createUrl } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const RightBar = () => {

  const [userName, setUserName] = useState([]);
  const pathProfilePic = createUrl("/api/ProfilePic/");
  const currentUserId = sessionStorage.getItem("currentUserId");

  const navigate = useNavigate();


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



  const profileNavigation = (userId) => {
    console.log("in nvigate + "+userId)

    navigate('/profile/'+userId)
  }


  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {userName.map(user => {return (<>
            <div className="user">
            <div className="userInfo">
              <img
                id = {user.userId}
                src={pathProfilePic+user.userId}
                alt=""
                onClick={() => profileNavigation(user.userId)}
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVNXjf-E1lPfG2Gi4pWNuNmHRo_MseqIZG5A&usqp=CAU"
                alt=""
              />
              <p>
                <span>arnav</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://media.istockphoto.com/id/1392554386/photo/young-asian-woman-solo-travel-on-tropical-island-mountain-in-summer-sunny-day.jpg?s=612x612&w=0&k=20&c=u82dGZHLJgtqQgLK2McQfbP9crtj6gvMVcoeHEfd6RY="
                alt=""
              />
              <p>
                <span>sneha</span> changed their profile picture
              </p>
            </div>
            <span>16 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwcePLzkqdQnaHt4_Vq1sLXqW4gv8QbxwTgg&usqp=CAU"
                alt=""
              />
              <p>
                <span>Gaurav</span> has planned a trip
              </p>
            </div>
            <span>1 hour ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6OXAfGDwi-wtbv5LoMz6xmL0QF81AER1Ew&usqp=CAU"
                alt=""
              />
              <p>
                <span>himanshu</span> changed their profile picture
              </p>
            </div>
            <span>3 hours ago</span>
          </div>
        </div>
        {/* <div className="item">
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
        </div> */}
      </div>
    </div>
  );
};

export default RightBar;
