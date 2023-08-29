import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import axios from "axios";
import { createUrl } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();


  const handleLogin = () => {
   
    const path = createUrl("/api/EncryptedUser/login");
    axios.post(path, {
      "emailId": email,
      "password": password
    })
    .then((resp) =>{
      console.log("in here")
      console.log(resp.data)
      const {userId, userName} = resp.data;
      sessionStorage['currentUserName'] = userName;
      sessionStorage['currentUserId'] = userId;
      
      dispatch(login());
      
    })
    navigate('/');
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Globe Trotters</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" value = {email} onChange={(u) => setEmail(u.target.value)} />
            <input type="password" placeholder="Password" value = {password} onChange={(p) => setPassword(p.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
