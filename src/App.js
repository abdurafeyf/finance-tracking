import React from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import './css/style.css';
import './charts/ChartjsConfig';
import Hello from "./pages/Hello";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/hello" element={<Hello/>} />
      </Routes>
    </>
  );
}

export default App;
