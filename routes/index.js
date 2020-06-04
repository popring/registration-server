var express = require("express");
var router = express.Router();

const commonRouter = require("./common");
const studentRouter = require("./student");
const adminRouter = require("./admin");

module.exports = (app) => {
  app.use("/", commonRouter);
  app.use("/v1/stu", studentRouter);
  app.use("/v1/admin", adminRouter);
};
