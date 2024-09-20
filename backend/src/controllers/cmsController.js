const Content = require("../models/contentModel");

const getHomePageContent = async (req, res) => {
  try {
    console.log("ethiii");

    const content = await Content.findAll();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const addHomePageContent = async (req, res) => {
  const { title, description, seoKeywords, banner } = req.body;

  try {
    const content = await Content.create({
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

const updateHomePageContent = async (req, res) => {
  const { title, description, seoKeywords, banner } = req.body;
  const { id } = req.params;

  try {
    const content = await Content.findOne({ where: { id } });

    if (!content) {
      return res.json({ message: "Content not found" }).status(404);
    }

    await Content.update(
      {
        title,
        description,
        seoKeywords,
        banner,
      },
      { where: { id } }
    );

    const updatedContent = await Content.findOne({ where: { id } });
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  getHomePageContent,
  addHomePageContent,
  updateHomePageContent,
};
