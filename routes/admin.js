const express = require("express");
const { adminAuth } = require("../middleware/AuthMiddleware");
const ControllerStudent = require("../controller/admin/student");
const ControllerProcess = require("../controller/student/process");
const router = express.Router();

router.use(adminAuth);

router.get("/process", async function (req, res) {
  const data = await ControllerProcess.findOne(202002);
  res.json({data: data});
});

// 查询学生
router.get("/student", async function(req, res) {
  const data = await ControllerStudent.findStudent();
  res.send(data);
});

// 查询学生
router.get("/student/:sid", async function(req, res) {
  const data = await ControllerStudent.findStudent(req.params.sid);
  res.send(data);
});

module.exports = router;
