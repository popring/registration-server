const models = require("../../models");
const tips = require("../../config/Tips");

const Op = models.Sequelize.Op;

/**
 * 查询带审核的学生
 * @returns {Promise<{code: number, tableData: any, message: string}>}
 */
async function findAllAudit() {
  const process = await models.Process.findAndCountAll({
    include: [{
      model: models.Student,
      attributes: ["Sid", "Sname", "Sidcard", "Sschool", "Sphone"],
    }],
    where: {
      apply: 1,
      pay: 1,
      check: {
        [Op.ne]: 1,
      },
    },
  });
  return {
    ...tips.GET_INFO_SUCCESS,
    tableData: process,
  };
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
    return tips.OPERATE_FAILED;
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
  if (process === null) {
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