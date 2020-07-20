module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Score",
    {
      sid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      cid: {
        // TODO 外键
        type: DataTypes.INTEGER,
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
};
