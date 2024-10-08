import React, { useState } from "react";
import "./Calorie.css";

function Calorie() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);

    // Display the uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await fetch("http://localhost:8000/nutritionist", {
      method: "POST",
      body: formData,
    });

    const data = await response.text();
    setResponse(data);
  };

  return (
    <div className="calorie-container">
      <h1>Calorie Counter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Analyze Image</button>
      </form>
      <div className="image-container">
        {uploadedImage && (
          <img src={uploadedImage} alt="Uploaded" className="preview-image" />
        )}
      </div>
      {response && (
        <div className="analysis-result">
          <h2>Analysis Result:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Calorie;
