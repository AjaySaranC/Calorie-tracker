import React, { useState, useEffect } from 'react';
import "./content.css";
import mental from "./mental.png";
import heart from "./heartdetect.png";
import diet from "./diet1.png";
import { useNavigate } from "react-router-dom";
import { database } from "./firebase";

const Content = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = database.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleClick = () => {
    navigate("/calorie"); // Navigate to the '/calorie' route when button is clicked
  };

  const handledetect = () => {
    // Redirect to Heart Disease Detector
    window.location.href = "http://localhost:8501/";
  };

  const handlemental = () => {
    // Redirect to Mental Illness Chatbot
    window.location.href = "http://localhost:8502/";
  };

  const handleServiceClick = (service) => {
    if (user) {
      // User is authenticated, allow access to the service
      if (service === "detect") {
        // Redirect to Heart Disease Detector
        handledetect();
      } else if (service === "chatbot") {
        // Redirect to Mental Illness Chatbot
        handlemental();
      } else if (service === "tracker") {
        // Redirect to Calorie Tracker
        handleClick();
      }
    } else {
      // User is not authenticated, show login/signup prompt
      // You can customize this part based on your UI design
      alert("Please sign in to access this service.");
    }
  };

  return (
    <section id="content">
      <div className="contentarea">
        <span className="service">Find Our Services Below</span>
        <div className="grid-container">
          <div className="grid-row">
            <div className="grid-item2">
              <img src={heart} alt="logo" className="detect" />
              <span className="mentaltext">Heart Disease Detector</span>
              <button className="chatbot-button" onClick={() => handleServiceClick("detect")}>
                Detect
              </button>
            </div>
            <div className="grid-item-description">
              Heart Disease Detector
            </div>
          </div>

          <div className="grid-row">
            <div className="grid-item-description">
              Mental Illness Chatbot
            </div>
            <div className="grid-item">
              <img src={mental} alt="logo" className="mental" />
              <span className="mentaltext">Mental Illness Chatbot</span>
              <button className="chatbot-button" onClick={() => handleServiceClick("chatbot")}>
                Start Chat
              </button>
            </div>
          </div>

          <div className="grid-row">
            <div className="grid-item3">
              <img src={diet} alt="logo" className="tracker" />
              <span className="mentaltext">Calorie tracker</span>
              <button className="chatbot-button" onClick={() => handleServiceClick("tracker")}>
                TrackNow
              </button>
            </div>
            <div className="grid-item-description">
              Calorie tracker
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
