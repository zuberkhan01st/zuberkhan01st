// models/project.js
const mongoose = require('mongoose');

// Define the schema for a project
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  technologies: [String],
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
