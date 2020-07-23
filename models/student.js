module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
      Sid: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
      },
      Sphone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Spwd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Sname: DataTypes.STRING,
      Sbirth: DataTypes.DATE,
      Spolitics: DataTypes.STRING,
      Sidcard: DataTypes.STRING(18),
      Sschool: DataTypes.STRING,
      Smajor: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      // 禁止修改表名
      freezeTableName: true,
      // 表的名称
      tableName: "student",
    });

  Student.associate = function(models) {
    models.Student.belongsTo(models.Major, {
      foreignKey: "Smajor",
    });
  };
  return Student;
};
