const express = require("express");
const router = express.Router();
const ControllerProcess = require("../controller/student/process");
const { stuAuth } = require("../middleware/AuthMiddleware");

router.use(stuAuth);

router.get("/process", async function (req, res, next) {
  const data = await ControllerProcess.findOne(202002);
  res.json({ data: data });
});

router.get("/test", function (req, res, next) {
  res.send({ a: 1, b: [123] });
});

module.exports = router;
