const { VerifyController } = require("../controller/Account");

module.exports = {
  // 学生是否登录验证
  stuAuth: function (req, res, next) {
    console.log(req.baseUrl, "接口被访问");
    const token = req.get("token");
    const verifyResult = VerifyController(token) || {};
    if (verifyResult.code === 1) {
      res.userinfo = verifyResult;
      next();
    } else {
      res.send(verifyResult)
    }
  },
  // 管理员是否登录验证
  adminAuth: function (req, res, next) {
    console.log(req.baseUrl, "接口被访问");
    if (req.query.a) {
      console.log("已经登陆用户");
    } else {
      console.log("没有登陆");
      return res.send({ data: "未登录，请登陆后重试" });
    }
    next();
  },
};
