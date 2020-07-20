const models = require("../../models");
const tips = require("../../config/Tips");

/**
 * 学生提交个人信息
 * @param userData 学生个人信息[sid, sname, sbirth, spolitics, sidcard, sschool, smajor]
 * @returns {Promise<{code: number, message: string}>}
 */
async function submitApply (userData) {
  // 更改学生相关信息
  const attrs = ["Sname", "Sbirth", "Spolitics", "Sidcard", "Sschool", "Smajor"];
  const student = await models.Student.findOne({
    where: {
      sid: userData.Sid,
    },
  });
  Object.keys(userData).forEach(key => {
    if (attrs.includes(key))
      student[key] = userData[key];
  });
  if (student.changed().length <= 0) {
    return tips.OPERATE_FAILED;
  }
  await student.save();

  // 更改进度
  const process = await models.Process.findOne({
    where: {
      sid: userData.Sid,
    },
  });
  process.apply = 1;
  await process.save();
  return tips.OPERATE_SUCCESS;
}

// 支付操作
async function payMoney (sid) {
  const process = await models.Process.findOne({
    where: {
      sid,
    },
  });
  process.set("pay", 1);
  await process.save();
  // 支付失败
  if (process.get("pay") !== 1) return tips.PAY_ERROR;
  // 支付成功
  return tips.PAY_SUCCESS;
}

// 获取所有专业信息
async function findAllMajor () {
  const course = await models.Course.findAll();
  return {
    code: 1,
    data: course.map(item => item.dataValues),
  };
}

module.exports = {
  submitApply,
  payMoney,
  findAllMajor,
};
