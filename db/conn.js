const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
);
try {
  sequelize.authenticate();
  console.log("Conectado com sucesso");
} catch (error) {
  console.log("Error", error);
}

module.exports = sequelize;
