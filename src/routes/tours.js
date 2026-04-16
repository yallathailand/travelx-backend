import express from "express";

const router = express.Router();

const tours = [
  {
    id: 1,
    title: "Phi Phi Islands",
    price: 1799,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Amazing island tour",
  },
  {
    id: 2,
    title: "James Bond Island",
    price: 1400,
    image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c",
    description: "Phang Nga Bay adventure",
  }
];

// GET ALL
router.get("/", (req, res) => {
  res.json(tours);
});

// GET BY ID
router.get("/:id", (req, res) => {
  const tour = tours.find(t => t.id == req.params.id);
  res.json(tour);
});

export default router;
