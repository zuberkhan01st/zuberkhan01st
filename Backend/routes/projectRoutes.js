
const express = require('express');
const router = express.Router();
const {projects} = require('../controllers/projectController');

router.get('/projects',projects)

module.exports = router;
