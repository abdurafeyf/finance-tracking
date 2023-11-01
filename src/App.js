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
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);

  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:5000/api/v1/auth/user", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated");
        dispatch(setIsAuthenticated(false));
        dispatch(setAuthUser(null));
        navigate("/login/error");
      });

    if (response && response.data) {
      console.log("User: ", response.data);
      dispatch(setIsAuthenticated(true));
      dispatch(setAuthUser(response.data));
      navigate("/welcome");
    }
  };

  const redirectToGoogleSSO = async () => {
    let timer = null;
    const googleLoginURL = "http://localhost:5000/api/v1/login/google";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
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