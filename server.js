const express = require("express");

const app = express();

// مهم علشان نستقبل JSON
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("🔥 TravelX Backend Working");
});

// 🎯 Booking API
app.post("/api/bookings", (req, res) => {
  const booking = req.body;

  console.log("📦 New Booking:", booking);

  res.json({
    message: "Booking received successfully",
    data: booking,
  });
});

// start server
app.listen(5000, () => {
  console.log("🚀 Server started on port 5000");
});