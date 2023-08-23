import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Post from "./components/post";
import GetData from "./components/getData";
import GetAllPosts from "./components/getAllPosts";

function App() {
  return (
    <>
      <BrowserRouter>
        <GetAllPosts/> 
      

      </BrowserRouter>
    
    </>
  );
}

export default App;
