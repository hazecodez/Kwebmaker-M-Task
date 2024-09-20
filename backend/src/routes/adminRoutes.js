const express = require("express");
const router = express.Router();
const { login } = require("../controllers/adminController");
const {
  getHomePageContent,
  updateHomePageContent,
} = require("../controllers/cmsController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/login", login);
router.get("/content", authenticate, getHomePageContent);
router.post("/content", authenticate, updateHomePageContent);

module.exports = router;
