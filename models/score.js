module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define("Score",
    {
      sid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      cid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      // 禁止修改表名
      freezeTableName: true,
      // 表的名称
      tableName: "grade",
    },
  );
  Score.associate = function(models) {
    models.Score.belongsTo(models.Course, {
      foreignKey: "cid",
    });

    models.Score.belongsTo(models.Student, {
      foreignKey: "sid",
    });
  };
  return Score;
};
