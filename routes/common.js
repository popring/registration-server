const express = require("express");
const router = express.Router();

// test index page
router.get("/", function (req, res, next) {
  res.send("这是首页");
});

module.exports = router