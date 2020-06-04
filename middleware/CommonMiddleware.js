const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");

module.exports = (app) => {
  // 输出访问路由日志
  app.use(logger("dev"));
  // 将请求数据解析为 json
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // 将 cookie 挂在到 req.cookie
  app.use(cookieParser());
  // 托管静态文件
  app.use(express.static(path.join(__dirname, "public")));
  // 解决跨域
  app.use(cors());
};
