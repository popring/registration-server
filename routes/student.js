const express = require("express");
const router = express.Router();
const ControllerProcess = require("../controller/student/process");
const ControllerNotice = require("../controller/student/notice");
const ControllerApply = require("../controller/student/apply");
const ControllerScore = require("../controller/student/score");
const { stuAuth } = require("../middleware/AuthMiddleware");

router.use("/", stuAuth);

// 学生报名进度查询
router.get("/process", async function (req, res) {
  const data = await ControllerProcess.findOne(res.userinfo.id);
  res.send({ code: 1, data });
});

// test 接口
router.get("/test", function (req, res) {
  res.send({ a: 1, b: [123] });
});

// 查询公告
router.get("/notice", async function (req, res) {
  const data = await ControllerNotice.findAll();
  res.send({ code: 1, data });
});

// 查询具体某一条公告
router.get("/notice/:nid", async function (req, res) {
  const data = await ControllerNotice.findOne(req.param("nid"));
  res.send({ code: 1, data });
});

// 提交学生信息
router.post("/apply", async function (req, res) {
  const data = await ControllerApply.submitApply(req.body);
  res.send(data);
});

router.get('/pay', async function(req, res) {
  const data = await ControllerApply.payMoney(res.userinfo.id);
  res.send(data);
})

// 查询考试成绩
router.get("/score", async function (req, res) {
  const data = await ControllerScore.findScore(res.userinfo.id);
  res.send(data);
});

module.exports = router;
