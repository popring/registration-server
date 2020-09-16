const express = require("express");
const { adminAuth } = require("../middleware/AuthMiddleware");
const ControllerStudent = require("../controller/admin/student");
const ControllerProcess = require("../controller/student/process");
const ControllerAudit = require("../controller/admin/audit");
const ControllerScore = require("../controller/admin/score");
const ControllerNotice = require("../controller/admin/notice");
const router = express.Router();

router.use(adminAuth);

router.get("/process", async function(req, res) {
  const data = await ControllerProcess.findOne(202002);
  res.json({ data: data });
});

// 查询学生
router.get("/student", async function(req, res) {
  const data = await ControllerStudent.findAllStudent(req.query);
  res.send(data);
});

// 查询学生信息
router.get("/student/:sid", async function(req, res) {
  const data = await ControllerStudent.findOneStudent(req.params.sid);
  res.send(data);
});

// 修改学生信息
router.put("/student", async function(req, res) {
  const data = await ControllerStudent.updateStudent(req.body);
  res.send(data);
});

// 删除学生
router.delete("/student/:sid", async function(req, res) {
  const data = await ControllerStudent.deleteStudent(req.params.sid);
  res.send(data);
});

// 查询所有待审核信息
router.get("/audit", async function(req, res) {
  const data = await ControllerAudit.findAllAudit(req.query);
  res.send(data);
});

// 审核 通过/不通过
router.put("/audit/", async function(req, res) {
  const check = Number.parseInt(req.body.check) || 2;
  const sid = req.body.Sid;
  let data;
  if (check === 1) {
    data = await ControllerAudit.auditPassed(sid);
  } else {
    data = await ControllerAudit.auditNotPassed(sid);
  }
  res.send(data);
});

// 查询学生成绩
router.get("/score", async function(req, res) {
  const data = await ControllerScore.findAllScore(req.query);
  res.send(data);
});

// 查询某一学生、成绩信息
router.get("/score/:sid", async function(req, res) {
  const data = await ControllerScore.findStuInfoScore(req.params.sid, req.query.type);
  res.send(data);
});

// 添加学生成绩
router.post("/score", async function(req, res) {
  const data = await ControllerScore.createScore(req.body);
  res.send(data);
});

// 修改学生成绩
router.put("/score", async function(req, res) {
  const data = await ControllerScore.updateScore(req.body);
  res.send(data);
});

// 查询公告列表
router.get("/notice", async function(req, res) {
  const data = await ControllerNotice.findAllNotice(req.query);
  res.send(data);
});

// 查询公告详情
router.get("/notice/:nid", async function(req, res) {
  const data = await ControllerNotice.findOneNotice(req.params.nid);
  res.send(data);
});

// 添加公告
router.post("/notice", async function(req, res) {
  const data = await ControllerNotice.createNotice({
    Aid: req.tokenInfo.id,
    ...req.body,
  });
  res.send(data);
});

// 删除公告
router.delete("/notice/:nid", async function(req, res) {
  const data = await ControllerNotice.deleteNotice(req.params.nid);
  res.send(data);
});

// 录取学生
router.get("/offer", async function(req, res) {
  const data = await ControllerScore.offerScore();
  res.send(data);
});

module.exports = router;
