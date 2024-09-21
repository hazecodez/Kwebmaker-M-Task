const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SeoMeta = sequelize.define("SeoMeta", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = SeoMeta;
