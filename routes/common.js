const express = require("express");
const router = express.Router();
const {
  StuLoginController,
  VerifyController,
  AdminLoginController: AdminLogin,
} = require("../controller/Account");
const Tips = require("../config/Tips");

// test index
router.get("/", function (req, res, next) {
  res.send(Tips.OPERATE_SUCCESS);
});

/**
 * 管理员与学生通用登录接口
 * userinfo 包含以下字段
 *    username    用户名
 *    userpwd     密码
 *    role        角色 < admin, student >
 */
router.post("/login", async function (req, res) {
  const userinfo = req.body;

  // 数据不完全，不进行登录
  if (!userinfo.username || !userinfo.userpwd) {
    return res.send(Tips.INFO_INCOMPLETE);
  }

  if (!userinfo.username.trim() || !userinfo.userpwd.trim()) {
    return res.send(Tips.INFO_INCOMPLETE);
  }

  // 缺少 role 字段，默认为学生
  if (!userinfo.role) {
    userinfo.role = "student";
  }

  let result = null;
  switch (userinfo.role) {
    case "student":
      result = await StuLoginController(userinfo.username, userinfo.userpwd);
      break;
    case "admin":
      result = await AdminLogin(userinfo.username, userinfo.userpwd);
      break;
    default:
      result = Tips.INFO_ERROR;
  }

  res.send(result);
});

// test valid token
router.post("/ttoken", function (req, res) {
  // 从http信息头获取token
  const token = req.get("token");
  const result = VerifyController(token);
  res.json(result);
});

module.exports = router;
