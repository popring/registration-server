const pool = require("../config/db");
const Tips = require("../config/Tips");
const jwt = require("jsonwebtoken");
const PRIVATEKEY = require("../config/key");
const Student = require("../models/student");
const Process = require("../models/process");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/**
 * 学生登录
 * @param {string}} username 用户名
 * @param {string} userpwd 密码
 */
async function stuLogin(sidOrSphone, userpwd, role = "student") {
  if (role !== "student") {
    return {};
  }

  let res = await Student.findOne({
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
  let resProcess = await Process.findOne({
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
async function adminLogin(username, userpwd) {
  let res = await pool.pquery(
    "select aid,aname from admin where aname=? and apwd=?",
    [username, userpwd]
  );

  // 登录失败
  if (res.length !== 1) {
    return Tips.LOGIN_ERROR;
  }
  res = res[0];
  const payload = {
    id: res.aid,
    username: res.aname,
    role: "admin",
  };

  const token = jwt.sign(payload, PRIVATEKEY, {
    expiresIn: "24h",
  });
  return {
    ...Tips.LOGIN_SUCCESS,
    payload,
    token: token,
  };
}

async function stuSignUp(newUserInfo) {
  // 手机号，密码
  const data = await pool.pquery(
    `INSERT INTO student (Sphone, Spwd) VALUE(?, ?)`,
    [newUserInfo.sphone, newUserInfo.userpwd]
  );
  console.log(data);
  if (data.affectedRows === 1) {
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
function verfiy(token) {
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
