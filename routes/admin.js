const express = require("express");
const ControllerProcess = require("../controller/student/process");
const { adminAuth } = require("../middleware/AuthMiddleware");
const router = express.Router();

router.use(adminAuth)

router.get("/process", async function (req, res, next) {
  const data = await ControllerProcess.findOne(202002);
  res.json({data: data});
});

module.exports = router;
