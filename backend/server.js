
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/profiles", profileRoutes);

// Connect MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Coy Backend API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
