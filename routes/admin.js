const express = require("express");
const { adminAuth } = require("../middleware/AuthMiddleware");
const ControllerStudent = require("../controller/admin/student");
const ControllerProcess = require("../controller/student/process");
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

module.exports = router;
