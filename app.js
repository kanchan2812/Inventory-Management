const express = require('express');
const connectDB = require('./db');
const routes = require('./routes');

const app = express();
const PORT = 3000; // Set your desired port

// Connect to MongoDB
connectDB();

// Use built-in middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
