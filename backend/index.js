const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- RESPONSE FORMATTER ---------------- */
app.use((req, res, next) => {
  res.success = (data = null, message = "Success", status = 200) => {
    return res.status(status).json({
      status: "success",
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  };

  res.error = (message = "Error", status = 400, details = null) => {
    return res.status(status).json({
      status: "error",
      message,
      details,
      timestamp: new Date().toISOString(),
    });
  };

  next();
});

/* ---------------- SAMPLE ROUTES ---------------- */
app.get("/api/health", (req, res) => {
  res.success({ uptime: process.uptime() }, "Backend is running");
});

app.get("/api/error", (req, res) => {
  const error = new Error("This is a test error");
  error.statusCode = 400;
  throw error;
});

/* ---------------- 404 HANDLER ---------------- */
app.use((req, res) => {
  res.error("Route not found", 404);
});

/* ---------------- CENTRAL ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  res.status(err.statusCode || 500).json({
    status: "error",
    message:
      err.statusCode === 500
        ? "Internal server error"
        : err.message,
    timestamp: new Date().toISOString(),
  });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
