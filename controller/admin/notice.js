const models = require("../../models");
const tips = require("../../config/Tips");
const { tableResponse } = require("../../utils/tableResponse");
const ControllerNotice = require("../student/notice");

/**
 * 管理 - 查看公告列表
 * @param opt
 * @returns {Promise<{code: number, tableData: awaited <{rows: M[]; count: number}>&{offset: *, limit: *}, message: string}>}
 */
async function findAllNotice(opt) {
  return tableResponse("Notice", {
    order: [["nid", "DESC"]],
    include: [
      { model: "Admin", attributes: ["Aid", "Aname"], required: true },
    ],
    ...opt,
  });
}

/**
 * 查询公告详情
 * @param nid
 * @returns {Promise<{code: number, data: *, message: string}|{code: number, data: *, message: string}>}
 */
async function findOneNotice(nid) {
  return ControllerNotice.findNotice(nid);
}

/**
 * 添加公告 { Aid, title, content, time}
 * @param opt
 * @returns {Promise<T | {code: number, message: string}>}
 */
async function createNotice(opt) {
  let options = {
    Aid: opt.Aid,
    title: opt.title,
    content: opt.content,
    time: new Date(),
  };
  return models.Notice.create(options)
    .then(() => {
      return tips.OPERATE_SUCCESS;
    })
    .catch(err => {
      return {
        ...tips.OPERATE_FAILED,
        message: "添加失败，原因" + err.message,
      };
    });
}

async function deleteNotice(nid) {
  const res = await models.Notice.destroy({
    where: {
      Nid: Number.parseInt(nid),
    },
  });
  if (res === 1)
    return tips.OPERATE_SUCCESS;
  else
    return tips.OPERATE_FAILED;

}

module.exports = {
  findAllNotice,
  createNotice,
  findOneNotice,
  deleteNotice,
};