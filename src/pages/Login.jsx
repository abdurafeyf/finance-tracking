import React from 'react';
import axios from 'axios';
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser, setIsAuthenticated } from '../redux/appSlice';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const fetchAuthUser = async () => {

    const response = await axios
      .get("https://fin-tracking-backend.vercel.app/api/v1/auth/user", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated");
        dispatch(setIsAuthenticated(false));
        dispatch(setAuthUser(null));
        navigate('/login/error');
      });
  
    if (response && response.data) {
      console.log("User: ", response.data);
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(response.data));
      navigate('/welcome');
    }
  };

  const redirectToGoogleSSO = async () => {
    let timer = null;
    const googleLoginURL = "https://fin-tracking-backend.vercel.app/api/v1/login/google";
    const newWindow = window.open(googleLoginURL, "_blank", "width=500, height=600");
    
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log('We are authenticated');
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      });
    }
  };  

  return (
    <GoogleButton onClick={redirectToGoogleSSO}/>
  )
}
