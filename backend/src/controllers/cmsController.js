const Content = require("../models/contentModel");

const getHomePageContent = async (req, res) => {
  try {
    const content = await Content.findAll();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateHomePageContent = async (req, res) => {
  const { title, description, seoKeywords, banner } = req.body;

  try {
    const content = await Content.upsert({
      title,
      description,
      seoKeywords,
      banner,
    });
    res.status(200).json(content);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = { getHomePageContent, updateHomePageContent };
