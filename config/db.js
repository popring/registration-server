const mysql = require("mysql");

const dbConfig = {
  // 地址
  host: "localhost",
  // 账号
  user: "root",
  // 密码
  password: "root",
  // 数据库名
  database: "bmxt",
  // 端口
  port: 3306,
  connectionLimit: 10,
};

const pool = mysql.createPool(dbConfig);

/**
 * 使用 Promise 封装 query 方法
 */
pool.pquery = function (sql, values = "") {
  if (!sql) return {};
  return new Promise(function (resolve, reject) {
    pool.query(sql, values, function (error, results) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = pool;
