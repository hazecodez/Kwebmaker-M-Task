const express = require("express");
const router = express.Router();
const { login, getDashboard } = require("../controllers/adminController");
const {
  getContentSections,
  updateContentSection,
  getBanners,
  updateBanner,
  getSeoMeta,
  updateSeoMeta,
} = require("../controllers/cmsController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/login", login);
router.get("/dashboard", authenticate, getDashboard);

// CMS Routes
router.get("/cms/content-sections", authenticate, getContentSections); // Get all content sections
router.put("/cms/content-sections/:id", authenticate, updateContentSection); // Update a content section

router.get("/cms/banners", authenticate, getBanners); // Get all banners
router.put("/cms/banners/:id", authenticate, updateBanner); // Update a banner

router.get("/cms/seo", authenticate, getSeoMeta); // Get SEO meta
router.put("/cms/seo", authenticate, updateSeoMeta); // Update SEO meta

module.exports = router;
