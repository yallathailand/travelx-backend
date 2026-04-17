const express = require("express");
const router = express.Router();

// ─── Admin credentials (replace with DB + bcrypt in production) ──
const ADMINS = [
  {
    id: 1,
    name: "Admin",
    email: "admin@travelx.com",
    password: "admin123",
  },
];

// ─── Simple token generator ────────────────────────────────────
function generateToken(adminId) {
  const payload = `${adminId}:${Date.now()}:${Math.random()}`;
  return Buffer.from(payload).toString("base64");
}

// ─── POST /api/auth/login ──────────────────────────────────────
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const admin = ADMINS.find(
    (a) => a.email === email && a.password === password
  );

  if (!admin) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateToken(admin.id);

  res.json({
    success: true,
    token,
    name: admin.name,
    email: admin.email,
  });
});

// ─── POST /api/auth/logout ─────────────────────────────────────
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

// ─── GET /api/auth/me ──────────────────────────────────────────
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json({ authenticated: true });
});

module.exports = router;