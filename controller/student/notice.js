const models = require("../../models");
const tips = require("../../config/Tips");

/**
 * 查询公告信息
 * @param nid 公告id，若无，则默认查询所有信息
 */
async function findNotice (nid) {
  if (!nid) {
    // 查询所有公告信息
    let notice = await models.Notice.findAll({
      include: "Admin",
    });
    return {
      ...tips.GET_INFO_SUCCESS,
      data: notice.map(item => {
        let data = item.dataValues;
        data.Aname = item.Admin.get("Aname");
        delete data.Admin;
        return data;
      }),
    };
  } else {
    // 查询所有公告信息
    let notice = await models.Notice.findOne({
      include: "Admin",
    });
    let data = notice.dataValues;
    data.Aname = notice.Admin.get("Aname");
    delete data.Admin;
    return {
      ...tips.GET_INFO_SUCCESS,
      data,
    };
  }
}

module.exports = {
  findNotice,
};
