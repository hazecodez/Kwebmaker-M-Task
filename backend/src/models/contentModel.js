const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Content = sequelize.define("Content", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  seoKeywords: {
    type: DataTypes.STRING,
  },
  banner: {
    type: DataTypes.STRING, // Store banner image URL
  },
});

module.exports = Content;
