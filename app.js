const createError = require("http-errors");
const express = require("express");

const app = express();

// 引入常规中间件
require("./middleware/CommonMiddleware")(app);

// 路由
require("./routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
