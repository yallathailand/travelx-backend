const express = require("express");
const cors = require("cors");
require("dotenv").config();

const toursRouter = require("./routes/tours");
const bookingsRouter = require("./routes/bookings");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://travelx-frontend.vercel.app"],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "TravelX API is running 🚀" });
});

app.use("/api/tours", toursRouter);
app.use("/api/bookings", bookingsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;