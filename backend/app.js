// Dependencies
import express from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import aiRoute from "./routes/ai.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
connect();

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/ai", aiRoute);

// Default route
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Start server
export default app;
