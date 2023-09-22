import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
  Routes
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import Posts from "./components/posts/Posts";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/authslice";

function App2() {
  //const {currentUser} = useContext(AuthContext);
  const dispatch = useDispatch();
  //const loginStatus = useSelector((state) => state.auth.status)
  const [loginStatus, setLoginStatus] = useState();
  // setLoginStatus(useSelector((state) => state.auth.status))

  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if(sessionStorage['currentUserName'])
    {
      setLoginStatus(true);
      dispatch(login());
    }
  }, [loginStatus]);



 

  const ProtectedRoute = ({ children }) => {
    // Get the authentication status from Redux
    const isAuthenticated = useSelector((state) => state.auth.status);
  
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
  
    // If the user is authenticated, render the children components
    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
}

export default App2;