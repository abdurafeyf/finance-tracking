import React, { useEffect } from "react";
import styled from "styled-components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { LoginSuccess } from "./containers/LoginSuccess";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setIsAuthenticated } from "./redux/appSlice";
import Dashboard from './pages/Dashboard';
import './charts/ChartjsConfig';
import Hello from "./pages/Hello";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 31px;
`;

function App() {
  const user = useSelector((state) => state.app.authUser);
  console.log('rafey:', user);
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchAuthUser();
  }, []);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);

  const fetchAuthUser = () => {
    const token = sessionStorage.getItem('token');
    console.log('this is a token', token);
    const xhr = new XMLHttpRequest();
    
    xhr.open("GET", "https://fin-tracking-backend.vercel.app", true);
    xhr.withCredentials = true;
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log('test', JSON.parse(xhr.responseText));
        // const responseData = JSON.parse(xhr.responseText);
        // console.log("User: ", responseData);
        // // Assuming you have access to dispatch functions
        // dispatch(setIsAuthenticated(true));
        // dispatch(setAuthUser(responseData));
      } else {
        console.log('in else');
        // console.log("Not properly authenticated");
        // Assuming you have access to dispatch functions
        // dispatch(setIsAuthenticated(false));
        // dispatch(setAuthUser(null));
      }
    };
  
    xhr.onerror = () => {
      console.error("An error occurred while making the request.");
    };
  
    xhr.send();
  };
  

  const redirectToGoogleSSO = async () => {
    const googleLoginURL = "https://fin-tracking-backend.vercel.app/api/v1/login/google";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );
  
    if (!newWindow) {
      console.error("Failed to open Google SSO window");
      return;
    }
  
    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          clearInterval(timer);
          reject(new Error("Authentication timed out"));
        }, 60000); // Set a reasonable timeout (e.g., 60 seconds)
  
        const timer = setInterval(() => {
          if (newWindow.closed) {
            clearInterval(timer);
            clearTimeout(timeout);
            fetchAuthUser();
            resolve();
            navigate('/welcome');
          }
        }, 500);
      });
    } catch (error) {
      console.error("Authentication error:", error);
      navigate('/login/error');
    }
  };  

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/hello" element={<Hello/>} />
        <Route exact path="/login" element={<GoogleButton onClick={redirectToGoogleSSO} />} />
        <Route
          path="/welcome"
          element={
            isAuthenticated ? (
              <div>Welcome Back {user && user.fullName}</div>
            ) : (
              <div>Loading...</div>
            )
          }
        />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/login/error">Error logging in. Please try again later!</Route>
      </Routes>
    </>
  );
  

}

export default App;