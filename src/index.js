import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import GoogleMap from "./GoogleMap";
import Calorie from "./Calorie";
import App from "./App";
import Home from "./Home";
// import Login from "./Login";
import SignUp from "./Signup/SignUp";
import AboutPage from "./about";
// import Map from "./MapContainer";
import ContactForm from "./ContactForm";
import MapboxHospitalFinder from "./MapboxHospitalFinder";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(


      <React.StrictMode> 
    <Router>
      <Navbar />  
      
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app" element={<App />} />
        <Route path="/calorie" element={<Calorie />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactForm /> } />
        <Route path="/hospital" element={<MapboxHospitalFinder /> } />

      </Routes>
  </Router>
    </React.StrictMode> 
);