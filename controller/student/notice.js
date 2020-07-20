const models = require("../../models");
const tips = require("../../config/Tips");

/**
 * 查询所有公告信息
 */
async function findAll () {
  const notice = await models.Notice.findAll();
  return {
    ...tips.GET_INFO_SUCCESS,
    data: notice.map(item => item.dataValues),
  };
}

/**
 * 查询指定公告信息
 * @param nid 公告id
 */
async function findOne (nid) {
  const notice = await models.Notice.findOne({
    where: {
      nid,
    },
  });
  return notice.dataValues;
}

module.exports = {
  findAll,
  findOne,
};
