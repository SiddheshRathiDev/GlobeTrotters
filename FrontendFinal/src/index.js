import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { store } from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import UploadPost from "./uploadPost";

import App2 from "./App2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
    <DarkModeContextProvider>
      <AuthContextProvider>
      <ToastContainer></ToastContainer>
        <App2 />
      </AuthContextProvider>
    </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);
