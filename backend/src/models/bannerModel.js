const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Banner = sequelize.define("Banner", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Banner;
