const express = require("express");
const router = express.Router();
const { login, getDashboard } = require("../controllers/adminController");
const {
  getHomePageContent,
  addHomePageContent,
  updateHomePageContent,
} = require("../controllers/cmsController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/login", login);
router.get("/dashboard", authenticate, getDashboard)
router.get("/content",  getHomePageContent);
router.post("/addContent", authenticate, addHomePageContent);
router.put("/updateContent", authenticate, updateHomePageContent)

module.exports = router;
