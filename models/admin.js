module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
      Aid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Aname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Apwd: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "admin",
      timestamps: false,
      freezeTableName: true,
    },
  );

  // 设置外键
  Admin.associate = function(models) {
    models.Admin.hasMany(models.Notice, {
      foreignKey: "Aid"
    });
  };
  return Admin;
};
