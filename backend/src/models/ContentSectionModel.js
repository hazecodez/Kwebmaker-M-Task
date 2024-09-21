const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ContentSection = sequelize.define("ContentSection", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = ContentSection;
