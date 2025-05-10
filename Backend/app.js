// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static('public')); // Serve static files like CSS, JS, images
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/projectsDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Use the project routes
app.use(projectRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
