const models = require("../../models");
const tips = require("../../config/Tips");
const { tableResponse } = require("../../utils/tableResponse");

const Op = models.Sequelize.Op;

/**
 * 查询带审核的学生列表
 * @param opt
 * @returns
 */
function findAllAudit(opt) {
  let check = {}
  if(opt.check === '') {
    check = {
      [Op.ne]: 1,
    }
  } else {
    check = opt.check
  }
  return tableResponse("Process", {
    attributes: ["Sid", "apply", "pay", "check"],
    include: [
      { model: "Student", attributes: ["Sid", "Sname", "Sidcard", "Sschool", "Sphone"] },
    ],
    where: {
      apply: 1,
      pay: 1,
      check: check,
    },
    order: [["updatedAt", "ASC"]],
    ...opt,
  });
}

/**
 * 审核通过
 * @param sid
 * @returns {Promise<{code: number, message: string}>}
 */
async function auditPassed(sid) {
  const process = await models.Process.findOne({
    where: {
      sid,
    },
  });
  if (process === null) {
    return tips.OPERATE_FAILED;
  }
  process.set("check", 1);
  const res = await process.save();
  if (res instanceof models.Sequelize.ValidationError) {
    return { ...tips.OPERATE_FAILED, message: res.message };
  }
  return tips.OPERATE_SUCCESS;
}

/**
 * 审核不通过
 * @param sid
 * @returns {Promise<{code: number, message: string}>}
 */
async function auditNotPassed(sid) {
  const process = await models.Process.findOne({
    where: {
      sid,
    },
  });
  if (process === null || process.check === 1) {
    return tips.OPERATE_FAILED;
  }
  process.set("check", 2);
  const res = await process.save();
  if (res instanceof models.Sequelize.ValidationError) {
    return tips.OPERATE_FAILED;
  }
  return tips.OPERATE_SUCCESS;
}

module.exports = {
  findAllAudit,
  auditPassed,
  auditNotPassed,
};
