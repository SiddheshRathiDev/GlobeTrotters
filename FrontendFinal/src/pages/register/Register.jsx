import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

import { FormControl } from "@mui/material";
import {InputLabel} from "@mui/material";
import {NativeSelect} from "@mui/material";

import { useState } from "react";
import axios from "axios";
import { createUrl } from "../../utils/utils";

import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();



  function handleRegister() {
    const path = createUrl("/api/EncryptedUser/register");
    axios.post(path, {
      "email": email,
      "password": password,
      "userName": userName,
      "name": name,
      "dateOfBirth": dob,
      "gender": gender,
      "mobile": mobile
    });
    toast.success("Registration Successful");
    navigate("/login");
  }


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Globe Trotters</h1>
          <p>
          Embark on a journey of exploration and connection with our traveler-centric social platform. Share your adventures, connect with fellow globetrotters, and discover the world together
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Username" value={userName} onChange={(e) => setuserName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="date" placeholder="Dob" value={dob} onChange={(e) => setDob(e.target.value)} />
            {/* <input type="gender" placeholder="Gender" value = {gender} onChange={(e) => setGender(e.target.value)}/> */}
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Gender
              </InputLabel>
              <NativeSelect
                defaultValue="male"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male"></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </NativeSelect>
            </FormControl>
            <input type="mobile" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
