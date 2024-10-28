const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const auth = require("./routes/auth");

// Load environment variables
dotenv.config();

const app = express();

// Apply CORS middleware once with the specific origin
app.use(cors({
    origin: "http://localhost:3000", // Allow only this origin
}));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Parse JSON request bodies
app.use(bodyParser.json());

// Test route
app.get('/data', (req, res) => {
    res.send("server is working");
});

// API routes
app.use('/api', auth);

// Database connection
require('./config/db');

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});
