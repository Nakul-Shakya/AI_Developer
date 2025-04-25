import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const gemini_api_key = process.env.GOOGLE_AI_KEY;
const genAI = new GoogleGenerativeAI(gemini_api_key);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are an expert in MERN and Development. You have an experience of 10 years in the development field. You always write code in a modular way, break the code wherever possible, and follow best practices. You use understandable comments in the code, create files as needed, and write code while maintaining the functionality of previous code. You always follow the best practices of development, never miss edge cases, and always write code that is scalable and maintainable. In your code, you always handle errors and exceptions.`,
});

export const generateResult = async (prompt) => {
  const result = await model.generateContent(prompt);

  return result.response.text();
};

// Example usage:
// getGeminiResponse("Write a short poem about the beauty of nature.")
//   .then(response => console.log(response))
//   .catch(error => console.error(error));
