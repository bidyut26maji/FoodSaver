const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ---------------- DATABASE CONNECTION ---------------- */
const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodsaver";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) =>
    console.error("❌ MongoDB Connection Error:", err.message)
  );

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

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.get("/api/health", (req, res) => {
  res.success(
    {
      uptime: process.uptime(),
      dbStatus:
        mongoose.connection.readyState === 1
          ? "Connected"
          : "Disconnected",
    },
    "Backend is healthy"
  );
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
  console.error("❌ Global Error:", err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message:
      statusCode === 500
        ? "Internal server error"
        : err.message,
    timestamp: new Date().toISOString(),
  });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
