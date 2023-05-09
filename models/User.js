const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn.js");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    require: true,
  },
});

module.exports = User;
