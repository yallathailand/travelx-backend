// src/routes/tours.js
const express = require("express");
const router  = express.Router();
const TOURS   = require("../data/tours");

// GET /api/tours  — returns array directly (frontend normalizeTour reads it as-is)
router.get("/", (req, res) => {
  try {
    let result = TOURS.slice();
    const { search, id } = req.query;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          String(t.n  || "").toLowerCase().includes(q) ||
          String(t.d  || "").toLowerCase().includes(q) ||
          String(t.at || "").toLowerCase().includes(q)
      );
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tours/:id  — returns single tour object directly
router.get("/:id", (req, res) => {
  try {
    const numId = Number(req.params.id);
    if (!Number.isFinite(numId)) {
      return res.status(400).json({ error: "Invalid tour ID" });
    }

    const tour = TOURS.find((t) => t.id === numId);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
