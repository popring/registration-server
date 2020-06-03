const express = require("express");
const ControllerProcess = require("../controller/student/process");
const router = express.Router();

router.get("/process", async function (req, res, next) {
  const data = await ControllerProcess.findAll();
  res.json({data: data});
});

module.exports = router;
