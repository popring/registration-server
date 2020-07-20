module.exports = {
  // 操作成功
  OPERATE_SUCCESS: { code: 1, message: "操作成功" },
  // 操作失败
  OPERATE_FAILED: { code: -1, message: "操作失败" },
  // 获取信息成功
  GET_INFO_SUCCESS: { code: 1, message: "success" },
  // 获取信息失败
  GET_INFO_FAILED: { code: -1, message: "failed" },
  // 信息不完整
  INFO_INCOMPLETE: { code: 0, message: "信息不完整，请输入完整后重试" },
  // 信息有误
  INFO_ERROR: { code: -1, message: "信息有误，请检查" },
  // 登陆成功
  LOGIN_SUCCESS: { code: 1, message: "登录成功，欢迎回来", token: "" },
  // 登陆失败
  LOGIN_ERROR: { code: -1, message: "登陆失败，账号和密码不匹配" },
  // token 有效
  TOKEN_CORRECT: { code: 1, message: "token验证成功" },
  // token 失效
  TOKEN_EXPIRED: { code: 0, message: "token已过期，请重新登陆" },
  // token 有误
  TOKEN_ERROR: { code: -1, message: "token错误" },
  // 支付成功
  PAY_SUCCESS: { code: 1, message: "支付成功" },
  // 支付失败
  PAY_ERROR: { code: 0, message: "支付失败，请重试" },
  // 学生成绩信息为空
  SCORE_NULL: { code: 1, message: "当前学生暂时没有成绩，请等待管理员录入信息", data: null },
};
