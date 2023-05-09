const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn.js");
const User = require("./User.js");

const Tought = sequelize.define("Tought", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Tought.belongsTo(User);
User.hasMany(Tought);

module.exports = Tought;
