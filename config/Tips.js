module.exports = {
  // 操作成功
  OPERATE_SUCCESS: { code: 1, message: "success" },
  // 信息不完整
  INFO_INCOMPLETE: { code: -1, message: "信息不完整，请输入完整后重试" },
  // 信息有误
  INFO_ERROR: { code: -1, message: "信息有误，请检查" },
  // 登陆成功
  LOGIN_SUCCESS: { code: 1, message: "登录成功", token: "" },
  // 登陆失败
  LOGIN_ERROR: { code: -1, message: "登陆失败" },
  // token 有效
  TOKEN_CORRECT: { code: 1, message: "token验证成功" },
  // token 失效
  TOKEN_EXPIRED: { code: 0, message: "token已过期，请重新登陆" },
  // token 有误
  TOKEN_ERROR: { code: -1, message: "token错误" },
};
