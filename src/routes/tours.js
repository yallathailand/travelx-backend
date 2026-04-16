const express = require("express");
const router = express.Router();

// ─── Mock data (replace with DB queries later) ─────────────────
const tours = [
  {
    id: "1",
    slug: "phi-phi-islands-full-day-tour",
    title: "Phi Phi Islands Full Day Tour",
    category: "tour",
    supplier: "Sea Explorer Co.",
    price: 2500,
    currency: "THB",
    duration: "Full day (8hrs)",
    capacity: 35,
    location: "Phuket",
    description: "Explore the stunning Phi Phi Islands with crystal clear waters, snorkeling, and lunch included.",
    images: ["/images/phi-phi-1.jpg", "/images/phi-phi-2.jpg"],
    highlights: ["Snorkeling gear included", "Hotel pickup", "Lunch on board", "English guide"],
    availability: "available",
    status: "published",
  },
  {
    id: "2",
    slug: "james-bond-island-tour",
    title: "James Bond Island Tour",
    category: "tour",
    supplier: "Island Hoppers",
    price: 1800,
    currency: "THB",
    duration: "Full day (7hrs)",
    capacity: 20,
    location: "Krabi",
    description: "Visit the iconic James Bond Island (Ko Tapu) with kayaking through sea caves.",
    images: ["/images/james-bond-1.jpg"],
    highlights: ["Kayaking included", "Sea cave exploration", "Hotel transfer", "Thai lunch"],
    availability: "available",
    status: "published",
  },
  {
    id: "3",
    slug: "phuket-airport-transfer",
    title: "Phuket Airport Transfer",
    category: "transport",
    supplier: "Quick Ride",
    price: 800,
    currency: "THB",
    duration: "45 mins",
    capacity: 8,
    location: "Phuket",
    description: "Private air-conditioned vehicle from Phuket Airport to your hotel in Patong.",
    images: [],
    highlights: ["Air-conditioned", "Meet & greet", "Flight tracking", "24/7 service"],
    availability: "available",
    status: "published",
  },
  {
    id: "4",
    slug: "fantasea-cultural-show",
    title: "Fantasea Cultural Show",
    category: "attraction",
    supplier: "Fantasea Phuket",
    price: 1900,
    currency: "THB",
    duration: "4hrs",
    capacity: 200,
    location: "Phuket",
    description: "A magical night of Thai culture, elephant shows, and a grand buffet dinner.",
    images: [],
    highlights: ["Buffet dinner", "Elephant show", "Cultural performances", "Fireworks"],
    availability: "limited",
    status: "published",
  },
  {
    id: "5",
    slug: "4-islands-snorkeling",
    title: "4 Islands Snorkeling",
    category: "tour",
    supplier: "Krabi Tours",
    price: 1500,
    currency: "THB",
    duration: "Full day",
    capacity: 25,
    location: "Krabi",
    description: "Visit four stunning islands around Krabi with snorkeling and beach time.",
    images: [],
    highlights: ["4 island stops", "Snorkeling gear", "Lunch included", "Longtail boat"],
    availability: "available",
    status: "published",
  },
  {
    id: "6",
    slug: "tiger-kingdom-visit",
    title: "Tiger Kingdom Visit",
    category: "attraction",
    supplier: "Tiger Kingdom",
    price: 900,
    currency: "THB",
    duration: "2hrs",
    capacity: 50,
    location: "Phuket",
    description: "Get up close with tigers of all sizes at the famous Tiger Kingdom in Phuket.",
    images: [],
    highlights: ["Photo opportunities", "Multiple tiger sizes", "Expert guides", "Safety briefing"],
    availability: "available",
    status: "published",
  },
];

// ─── GET /api/tours ────────────────────────────────────────────
router.get("/", (req, res) => {
  const { category, location, search } = req.query;
  let result = [...tours];

  if (category) result = result.filter(t => t.category === category);
  if (location) result = result.filter(t => t.location.toLowerCase() === location.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  }

  res.json({ data: result, total: result.length });
});

// ─── GET /api/tours/search ─────────────────────────────────────
router.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ data: [], total: 0 });

  const query = q.toLowerCase();
  const results = tours.filter(t =>
    t.title.toLowerCase().includes(query) ||
    t.description.toLowerCase().includes(query) ||
    t.location.toLowerCase().includes(query) ||
    t.category.toLowerCase().includes(query)
  );

  res.json({ data: results, total: results.length });
});

// ─── GET /api/tours/slug/:slug ─────────────────────────────────
router.get("/slug/:slug", (req, res) => {
  const tour = tours.find(t => t.slug === req.params.slug);
  if (!tour) return res.status(404).json({ error: "Tour not found" });
  res.json({ data: tour });
});

// ─── GET /api/tours/:id ────────────────────────────────────────
router.get("/:id", (req, res) => {
  const tour = tours.find(t => t.id === req.params.id);
  if (!tour) return res.status(404).json({ error: "Tour not found" });
  res.json({ data: tour });
});

module.exports = router;