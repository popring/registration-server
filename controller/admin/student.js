const models = require("../../models");
const tips = require("../../config/Tips");
const { tableResponse } = require("../../utils/tableResponse");

/**
 * 查询指定学生信息
 * @param sid 学生id
 * @returns {Promise<{code: number, data: *, message: string}>}
 */
async function findOneStudent(sid) {
  if (!sid)
    return { ...tips.GET_INFO_FAILED, message: "sid值错误" };
  const student = await models.Student.findOne({
    include: ["Major"],
    where: {
      sid,
    },
  });
  let data = student && student.dataValues;
  return { ...tips.GET_INFO_SUCCESS, data };
}

/**
 * 查询学生列表
 * @param opt 可选查询参数 包括limit,offset
 * @returns {Promise<{code: number, data: *, message: string}>}
 */
async function findAllStudent(opt = {}) {
  let where = {};
  if (opt.Smajor) where.Smajor = opt.Smajor;
  return tableResponse("Student", {
    attributes: ["Sid", "Sname", "Sphone", "Sschool"],
    include: [
      { model: "Major", required: true },
    ],
    where,
    ...opt,
  });
}

/**
 * 修改学生信息
 * @param userInfo 学生信息
 * @returns {Promise<{code: number, message: string}>}
 */
async function updateStudent(userInfo) {
  if (!userInfo.Sid)
    return { ...tips.OPERATE_FAILED, message: "sid值错误" };

  const stu = await models.Student.findOne({
    where: {
      sid: userInfo.Sid,
    },
  });
  for (const userInfoKey in userInfo) {
    if (userInfo.hasOwnProperty(userInfoKey)) {
      stu.set(userInfoKey, userInfo[userInfoKey]);
    }
  }
  const res = await stu.save();
  if (res instanceof models.Sequelize.ValidationError) {
    return tips.OPERATE_FAILED;
  }
  return tips.OPERATE_SUCCESS;
}

/**
 * 删除学生
 * @param sid 学生id
 * @returns {Promise<{code: number, message: string}>}
 */
async function deleteStudent(sid) {
  const res = await models.Student.destroy({
    where: {
      sid: sid,
    },
    force: true,
  });
  if (res === 0) {
    return { ...tips.OPERATE_FAILED, message: "删除失败，sid无效" };
  }
  return tips.OPERATE_SUCCESS;
}

module.exports = {
  findOneStudent,
  findAllStudent,
  updateStudent,
  deleteStudent,
};
