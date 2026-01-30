// ==========================
//      SERVER SETUP
// ==========================
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const employeeRoutes = require("./src/routes/employeeRoutes");

const app = express();

// ==========================
//      MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json()); // parse JSON body

// ==========================
//      ROUTES
// ==========================
app.use("/api/employees", employeeRoutes);

// ==========================
//      DATABASE CONNECTION
// ==========================
const MONGO_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/EmployeeSystem";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ==========================
//      ERROR HANDLING
// ==========================
// 404 for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ status: 404, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, message: "Internal Server Error" });
});

// ==========================
//      SERVER LISTEN
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
