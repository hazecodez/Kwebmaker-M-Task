const express = require("express");
const router = express.Router();
const { login, getDashboard } = require("../controllers/adminController");
const {
  getHomePageContent,
  updateHomePageContent,
} = require("../controllers/cmsController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/login", login);
router.get("/dashboard", authenticate, getDashboard)
router.get("/content", authenticate, getHomePageContent);
router.post("/content", authenticate, updateHomePageContent);

module.exports = router;
