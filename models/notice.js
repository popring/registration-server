
module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define("Notice", {
      Nid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Aid: {
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

  // 设置外键
  Notice.associate = function(models) {
    models.Notice.belongsTo(models.Admin, {
      foreignKey: "Aid",
    })
  }
  return Notice;
};
