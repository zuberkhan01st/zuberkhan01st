// routes/projects.js
const express = require('express');
const router = express.Router();
const project = require("../models/project")

// Example: Route to get project by ID
const projects= async (req, res) => {
    const projectId = req.params.id;
    const projects = await project.find();
  
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
  
    res.json(projects);
}

module.exports = {projects};
