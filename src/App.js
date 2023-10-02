import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import './charts/ChartjsConfig';
import Hello from "./pages/Hello";
import Login from "./pages/Login";

function App() {
  return (
    <div className="h-[100vh]">
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/hello" element={<Hello/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
