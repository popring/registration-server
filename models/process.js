const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class Process extends Sequelize.Model {}

Process.init(
  {
    sid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    apply: {
      type: Sequelize.INTEGER,
    },
    pay: {
      type: Sequelize.INTEGER,
    },
    check: {
      type: Sequelize.INTEGER,
    },
    addgrade: {
      type: Sequelize.INTEGER,
    },
    offer: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Process",
    timestamps: false,
    freezeTableName: true,
    // tableName: "process",
  }
);

module.exports = Process;
