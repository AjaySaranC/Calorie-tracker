const express = require('express');
const cors = require('cors');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

// Enable CORS (allows requests from different origins)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Load environment variables from .env file
require('dotenv').config();

// Configure Google Generative AI
const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Enable file uploads
app.use(fileUpload());

app.post('/nutritionist', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const imageFile = req.files.image;
    console.log("Uploaded file object:", imageFile);

    const prompt = `
    You are an expert in nutritionist where you need to see the food items from the image
    and calculate the total calories, also provide the details of every food items with calories intake
    is below format

    1. Item 1 - no of calories
    2. Item 2 - no of calories
   
  `;

    const imageParts = [
      {
        inlineData: {
          data: imageFile.data.toString('base64'),
          mimeType: imageFile.mimetype
        },
      }
    ];

    const model = genai.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image.');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
