module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
      cid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      cname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      callgrade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      // 禁止修改表名
      freezeTableName: true,
      // 表的名称
      tableName: "course",
    });
  return Course;
};
