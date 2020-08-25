module.exports = (sequelize, DataTypes) => {
  const Process = sequelize.define("Process", {
      Sid: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      apply: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      pay: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      check: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      addgrade: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      offer: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "process",
    });
  Process.associate = function(models) {
    models.Process.belongsTo(models.Student, {
      foreignKey: "Sid",
    });
  };
  return Process;
};

