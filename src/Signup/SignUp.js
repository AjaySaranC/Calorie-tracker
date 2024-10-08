import React, { useState } from "react";
import { database } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [login, setLogin] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type === "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/");
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    };

  const boxStyle = {
    width: "400px",
    height: "400px",
    backgroundColor: "#f8f9fa",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const glassStyle = {
    position: "relative",
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    padding: "20px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <div style={glassStyle}>
          <div style={headerStyle}>
            <div
              className={login === false ? "activeColor" : "pointer"}
              onClick={() => setLogin(false)}
            >
              SignUp
            </div>
            <div
              className={login === true ? "activeColor" : "pointer"}
              onClick={() => setLogin(true)}
            >
              SignIn
            </div>
          </div>
          <h1>{login ? "SignIn" : "SignUp"}</h1>
          <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
            <input name="email" placeholder="Email" style={buttonStyle} />
            <br />
            <input name="password" type="password" placeholder="Password" style={buttonStyle} />
            <br />
            <br />
            <button style={buttonStyle}>{login ? "SignIn" : "SignUp"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
