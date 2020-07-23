const { VerifyController } = require("../controller/Account");

module.exports = {
  // 学生是否登录验证
  stuAuth: function(req, res, next) {
    console.log(req.baseUrl, "接口被访问");
    const token = req.get("token");
    const verifyResult = VerifyController(token) || {};
    if (verifyResult.code === 1 && verifyResult.role === "student") {
      res.userinfo = verifyResult;
      next();
    } else {
      verifyResult.code === 1 ? res.send(tips.ROLE_FORBIDEN) : res.send(verifyResult);
    }
  },
  // 管理员是否登录验证
  adminAuth: function(req, res, next) {
    console.log(req.baseUrl, "接口被访问");
    const token = req.get("token");
    const verifyResult = VerifyController(token) || {};
    if (verifyResult.code === 1 && verifyResult.role === "admin") {
      res.userinfo = verifyResult;
    } else {
      verifyResult.code === 1 ? res.send(tips.ROLE_FORBIDEN) : res.send(verifyResult);
    }
    next();
  },
};
