const Tips = require("../config/Tips");
const jwt = require("jsonwebtoken");
const PRIVATEKEY = require("../config/key");
const models = require("../models/index.js");

const Op = models.Sequelize.Op;

/**
 * 学生登录
 * @param sidOrSphone sid或手机号码
 * @param userpwd 密码
 * @param role  角色
 */
async function stuLogin (sidOrSphone, userpwd, role = "student") {
  if (role !== "student") {
    return {};
  }

  let res = await models.Student.findOne({
    attributes: ["sid", "sname", "sphone"],
    where: {
      [Op.or]: [{ sid: sidOrSphone }, { sphone: sidOrSphone }],
      spwd: userpwd,
    },
  });

  // 登录失败
  if (res === null) {
    return Tips.LOGIN_ERROR;
  }

  const dataValue = res.dataValues;
  // 查询学生报名进度
  let resProcess = await models.Process.findOne({
    attributes: ["sid", "apply", "pay", "check", "addgrade", "offer"],
    where: {
      sid: dataValue.sid,
    },
  });
  const payload = {
    id: dataValue.sid,
    username: dataValue.sname,
    role: role,
    phone: dataValue.sphone,
    process: resProcess[0],
  };

  const token = jwt.sign(payload, PRIVATEKEY, {
    expiresIn: "24h",
  });
  return {
    ...Tips.LOGIN_SUCCESS,
    token,
    payload,
  };
}

/**
 * 管理员登录
 * @param {string} username 用户名
 * @param {string} userpwd 密码
 */
async function adminLogin (username, userpwd) {
  let res = await models.Admin.findOne({
    attributes: ["aid", "aname"],
    where: {
      aname: username,
      apwd: userpwd,
    },
  });

  // 登录失败
  if (res === null) {
    return Tips.LOGIN_ERROR;
  }

  res = res.dataValues;
  const payload = {
    id: res.aid,
    username: res.aname,
    role: "admin",
  };
  const token = jwt.sign(payload, PRIVATEKEY, {
    expiresIn: "30d",
  });
  return {
    ...Tips.LOGIN_SUCCESS,
    payload,
    token: token,
  };
}

/**
 * 学生注册
 * @param newUserInfo 学生注册信息
 * @returns {Promise<{code: number, message: string}>}
 */
async function stuSignUp (newUserInfo) {
  const res = await models.Student.create({
    Sphone: newUserInfo.sphone,
    Spwd: newUserInfo.userpwd,
  }, {
    isNewRecord: true,
  });
  const dataValues = res && res.dataValues;
  if (dataValues) {
    return {
      code: 1,
      message: "注册成功",
    };
  }
  return {
    code: 1,
    message: "注册失败，请联系管理员",
  };
}

/**
 * 验证token是否有效
 * @param {string} token 用户唯一标识
 */
function verfiy (token) {
  try {
    const result = jwt.verify(token, PRIVATEKEY);
    if (!result) {
      return Tips.TOKEN_ERROR;
    }
    return {
      ...Tips.TOKEN_CORRECT,
      ...result,
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return Tips.TOKEN_EXPIRED;
    }
    if (error.name === "JsonWebTokenError") {
      return Tips.TOKEN_ERROR;
    }
    return Tips.TOKEN_ERROR;
  }
}

module.exports = {
  StuLoginController: stuLogin,
  AdminLoginController: adminLogin,
  VerifyController: verfiy,
  StuSignUpController: stuSignUp,
};
