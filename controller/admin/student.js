const models = require("../../models");
const tips = require("../../config/Tips");

/**
 * 查询学生列表
 * @param sid 学生id
 * @returns {Promise<{code: number, data: *, message: string}>}
 */
async function findStudent (sid) {
  let data;
  if (!sid) {
    // 查询所有学生
    // TODO 分页功能
    const student = await models.Student.findAll({
      attributes: ["Sid", "Sname", "Sphone", "Sschool"],
      include: ["Major"],
    });
    data = student && student.map(item => item.dataValues);
  } else {
    // 查询指定学生信息
    const student = await models.Student.findOne({
      include: ["Major"],
      where: {
        sid,
      },
    });
    data = student && student.dataValues;
  }
  return { ...tips.GET_INFO_SUCCESS, data };
}

module.exports = {
  findStudent,
};
