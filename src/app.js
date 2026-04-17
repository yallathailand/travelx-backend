const express = require("express");
const cors = require("cors");
require("dotenv").config();

const toursRouter = require("./routes/tours");
const bookingsRouter = require("./routes/bookings");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://travelx-frontend.vercel.app",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}));

app.use(express.json());

// ─── Health check ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "TravelX API is running 🚀" });
});

// ─── Routes ───────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/tours", toursRouter);
app.use("/api/bookings", bookingsRouter);

// ─── 404 ──────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ─── Error handler ────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = app;