const ContentSection = require("../models/ContentSectionModel");
const Banner = require("../models/bannerModel");
const SeoMeta = require("../models/seoModel");
const { uploadImage } = require("../utils/claudinary");

// Get all content sections
const getContentSections = async (req, res) => {
  try {
    const sections = await ContentSection.findAll();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content sections" });
  }
};

// Update a content section
const updateContentSection = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);

    await ContentSection.update(req.body, { where: { id } });
    res.status(200).json({ message: "Content section updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update content section" });
  }
};

// Get all banners
const getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
};

// Update a banner
const updateBanner = async (req, res) => {
  const banner = req.body.image;
  const id = req.params.id;
  try {
    const image = await uploadImage(banner, "banner");

    await Banner.update({ image }, { where: { id } });

    res.status(200).json({ message: "Banner updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update banner" });
  }
};

// Get SEO meta
const getSeoMeta = async (req, res) => {
  try {
    const seoMeta = await SeoMeta.findOne(); // Assuming one record for SEO
    res.json(seoMeta);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch SEO meta" });
  }
};

// Update SEO meta
const updateSeoMeta = async (req, res) => {
  try {
    await SeoMeta.update(req.body, { where: { id: 1 } });
    res.status(200).json({ message: "SEO meta updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update SEO meta" });
  }
};

module.exports = {
  getContentSections,
  updateContentSection,
  getBanners,
  updateBanner,
  getSeoMeta,
  updateSeoMeta,
};
