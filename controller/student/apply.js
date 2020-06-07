const pool = require("../../config/db");

// 学生提交个人信息
async function submitApply(userData) {
  const data = await pool.pquery(
    `UPDATE student SET Sname=? Sbirth=?, Spolitics=?, Sidcard=?, Sschool=?, Smajor=?  WHERE sid= ?`,
    [
      userData.sname,
      userData.sbirth,
      userData.spolitics,
      userData.sidcard,
      userData.sschool,
      userData.smajor,
      userData.sid,
    ]
  );
  if (data.changedRows === 1) {
    const afterData = await pool.pquery("UPDATE process SET apply=1 where Sid=?", [
      userData.sid,
    ]);
    if (afterData.changedRows === 1) {
      return {
        code: 1,
        message: "提交信息成功",
      };
    }
  }
  return {
    code: 0,
    message: "提交信息失败，请稍后重试",
  };
}

// 支付操作
async function payMoney(id) {
  const data = await pool.pquery('UPDATE process SET pay=1 WHERE sid=?', [id])
  if(data.changedRows === 1) {
    return {
      code: 1,
      message: "支付成功",
    };
  }
  return {
    code: 0,
    message: "支付失败，请重试",
  };
}

module.exports = {
  submitApply,
  payMoney
};
