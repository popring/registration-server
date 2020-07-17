const Sequelize = require("sequelize");
const {
  host,
  username,
  password,
  databaseName,
} = require("./defaultSet").databaseConf;

const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: "mysql",
});

module.exports = sequelize;
