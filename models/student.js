const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Model = Sequelize.Model;
class Student extends Model {}

Student.init(
  {
    sid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    sphone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    spwd: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sname: {
      type: Sequelize.STRING,
    },
    sbirth: {
      type: Sequelize.DATE,
    },
    spolitics: {
      type: Sequelize.STRING,
    },
    sidcard: {
      type: Sequelize.STRING(18),
    },
    sschool: {
      type: Sequelize.STRING,
    },
    smajor: {
      type: Sequelize.INTEGER,
    },
  },
  {
    // 数据库配置
    sequelize,
    // model 名称
    modelName: "student",
    timestamps: false,
    // 禁止修改表名
    freezeTableName: true,
    // 表的名称
    tableName: "student",
  }
);

module.exports = Student;
