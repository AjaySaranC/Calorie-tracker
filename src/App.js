import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chathistory, setChathistory] = useState([]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setError("");
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please ask something");
      return;
    }

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chathistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);
      setChathistory((oldChathistory) => [
        ...oldChathistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="App">
      <section className="search-result">
        {chathistory.map((chatItem, index) => (
          <div key={index} className="chat-pair">
            <p className="response">
              <strong>{chatItem.role}:</strong> {chatItem.parts}
            </p>
          </div>
        ))}
      </section>

      <section className="search">
        <div className="searchsection">
          <input
            className="input"
            placeholder="How do you feel?"
            value={value}
            onChange={handleInputChange}
          />
          <button className="submit" onClick={getResponse}>
            AskMe
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </section>
    </div>
  );
};

export default App;
