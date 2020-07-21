module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Major", {
      mid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      mname: {
        type: DataTypes.STRING,
      },
      cids: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      // 禁止修改表名
      freezeTableName: true,
      // 表的名称
      tableName: "major",
      hooks: {
        afterFind (major) {
          // 将获取的cids，转换为数组
          let cids = [];
          if (!Array.isArray(major)) {
            cids = major.get("cids") || [];
            major.set("cids", cids.split(","));
          } else {
            major.forEach(item => {
              cids = item.get("cids") || [];
              item.set("cids", cids.split(","));
            });
          }
        },
      },
    });
};
