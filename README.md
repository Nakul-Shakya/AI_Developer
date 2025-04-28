
---


# AI Developer

A full-stack MERN (MongoDB, Express, React, Node.js) application designed for AI development tasks. It integrates real-time communication, AI services, and optimized caching solutions.

## Live Demo

(Provide deployed link here if available)

## Screenshots

(Add application screenshots here)

## Tech Stack

Frontend:
- React.js 19
- React Router DOM 7
- Axios
- TailwindCSS 4
- Markdown-to-JSX
- Highlight.js
- Remixicon
- Socket.IO Client
- WebContainer API

Backend:
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- JWT Authentication
- Bcrypt (Password hashing)
- Express Validator (Input validation)
- Socket.IO
- ioredis (Redis client)
- @google/generative-ai (Google AI API integration)
- Cookie-Parser
- Morgan (HTTP request logger)
- dotenv

Database:
- MongoDB Atlas (or Local MongoDB)

Caching:
- Redis Cloud (ioredis)

DevOps:
- Git & GitHub (Version Control)
- Postman (API Testing)

## Features

- User authentication and authorization
- Real-time communication with Socket.IO
- AI services using Google Generative AI API
- Markdown content rendering
- Caching system with Redis
- Environment-based configuration management
- Clean and scalable architecture
Samajh gaya main!
Aap keh rahe ho:

1. Jo aapne upar Installation section likha hai wo ekdum compact aur chipka hua hai — usko properly format karna chahie taaki achhe se open ho aur readable lage.


2. Aap apne project mein frontend aur backend dono mein .env_Null file diye ho. User ko batana hai ki:

_Null ko hata ke file ka naam .env karna hai.

Uske andar example ke hisaab se apne variables bharne hain.

Tab jaake project run karega.




Aur ye sab aapko English mein professional tarike se README me likhna hai.


---

Here’s the corrected and professional version:

## Installation

### Clone the Repository

`bash
git clone https://github.com/Nakul-Shakya/AI_Developer.git
cd AI_Developer

Setup Backend

cd backend
npm install
npm start

Setup Frontend

Open a new terminal window:

cd frontend
npm install
npm run dev

Environment Setup

Inside both frontend/ and backend/ folders, you will find a .env_Null file.
Follow these steps:

1. Rename .env_Null to .env.


2. Fill the .env file with the required environment variables, as shown below:



PORT=80XX
MONGODB_URI=mongodb://X.X.X.X/projectName
JWT_SECRET=JWT_SECRET
REDIS_HOST=redis-17wr1.crce1wr2.ap-south-1-8.ec2.redns.redis-cloud.com
REDIS_PORT=17XXX
REDIS_PASSWORD=Pzcdcz6IWSibk;f83waLjyyLQWKXq00y
GOOGLE_AI_KEY=AIzfsdjklBUcgs9SPK4akjsdkny9PsInG_GdJ7QfQ

> Note:
The project will not run unless the .env files are properly renamed and configured.



API Endpoints (Examples)

POST /api/auth/register – Register a new user

POST /api/auth/login – Login an existing user

GET /api/ai/generate – Generate AI response


Start Commands Summary

Backend:

npm start

Frontend:

npm run dev


License

This project is open-source and available under the MIT License.

Acknowledgements

MongoDB Atlas

Redis Cloud

Google AI API

Open Source Libraries


---

### Key Improvements:
- Proper headings (`##`, `###`) ka use kiya gaya hai.
- Code blocks (`bash`) ke andar commands format kiya gaya hai.
- `.env_Null` se `.env` rename karne ki clear instructions English mein add ki gayi hain.
- Note diya hai ki bina `.env` properly bharne ke project run nahi karega.
- Acknowledgements properly alag section mein likha hai.

---


### Notes:
- Main `.env` file ka pura section ready kar diya hai.
- Frontend aur backend ke dependencies ko Tech Stack mein clean categorize kar diya.
- Start commands ko clearly show kiya hai.
- API examples basic diye hain (detail API docs banana chaaho to alag se section bana sakte hain).

---
