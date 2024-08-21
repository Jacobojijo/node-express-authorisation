const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors"); // Import CORS middleware
const initModels = require("./models");
const authRoutes = require("./routes/authHandling");
require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined")); // Log all requests in the "combined" format

// Routes
app.use("/auth", authRoutes);

// Initialize the database and start the server
initModels().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
