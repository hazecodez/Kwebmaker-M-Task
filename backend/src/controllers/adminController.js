const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Banner = require("../models/bannerModel");
const ContentSection = require("../models/ContentSectionModel");
const SeoMeta = require("../models/seoModel");

exports.login = async (req, res) => {
  const { name, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { name } });
    if (!admin) return res.json({ message: "Admin not found" }).status(400);

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.json({ message: "Incorrect Password" }).status(400);

    const accessToken = jwt.sign(
      { name: admin.name },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500);
  }
};

exports.getDashboard = async (req, res) => {
  try {
    // Fetching data from all models
    const banners = await Banner.findAll();
    const contentSections = await ContentSection.findAll();
    const seoMeta = await SeoMeta.findAll();

    res.status(200).json({
      banners,
      contentSections,
      seoMeta,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
