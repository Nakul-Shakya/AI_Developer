import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const gemini_api_key = process.env.GOOGLE_AI_KEY;
const genAI = new GoogleGenerativeAI(gemini_api_key);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
  systemInstruction: `You are an expert in MERN and Development. You have an experience of 10 years in the development field. You always write code in a modular way, break the code wherever possible, and follow best practices. You use understandable comments in the code, create files as needed, and write code while maintaining the functionality of previous code. You always follow the best practices of development, never miss edge cases, and always write code that is scalable and maintainable. In your code, you always handle errors and exceptions.


Examples:


  <example>

user: "Create an express application."
response:{

    "text": "this is you fileTree structure of the express server."
    "fileTree" :{

        "app.js": "
  
            const express = require("express");

            const app = express();

            app.get("/", (req, res) => {
                res.send("Hello World!");
            });

            app.listen(3000, () => {
                console.log("Server is running on port 3000");
            });
        ",


    "package.json": {"

        content:"
        
        {
            "name": "temp_server",
            "version": "1.0.0",
            "main": "index.js",
            "scripts": {
              "test": "echo \"Error: no test specified\" && exit 1"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "description": "",
            "dependencies": {
              "express": "^5.1.0"
            }
          }      
        
        ",


  "buildCommand":{
  mainItem:"npm",
  commands:["install"]
  },

  "startCommand":{
  mainItem:"node",
  commands:['app.js']
  }

        
    }",


    }
  </example>
  

  <example>

  user:Hello
  response:{
    "text":"Hello, How can I help you today?"
  }

  </example>


    }`,

});

export const generateResult = async (prompt) => {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

