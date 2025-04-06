import Project from "../models/project.model.js";
import * as porjectService from "../services/project.service.js";
import usesModel from "../models/user.model.js";
import { validationResult } from "express-validator";

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;
    const loggedInUser = await usesModel.findById({ email: req.user.email });
    const userId = loggedInUser._id;

    const newProject = await porjectService.createProject({ name, userId });

  } catch (error) {
    console.log("Error creating project:", error);
    res.status(201).json(newProject);
  }
};
