var express = require("express");
var router = express.Router();

const commonRouter = require("./common");
const studentRouter = require("./student");
const adminRouter = require("./admin");
const { tableResponse } = require("../utils/tableResponse");

module.exports = (app) => {
  app.use("/v1", commonRouter);
  app.use("/v1/stu", studentRouter);
  app.use("/v1/admin", adminRouter);
};
