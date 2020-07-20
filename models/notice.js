module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Notice", {
      nid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      aid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      // 禁止修改表名
      freezeTableName: true,
      // 表的名称
      tableName: "notice",
    });
};
