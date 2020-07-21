const fs = require("fs");
const path = require("path");
const { keyPath } = require("./defaultSet");

const filePath = path.resolve(__dirname, keyPath);

let PRIVATEKEY;

// 如果文件不存在，则使用默认值替代
try {
  PRIVATEKEY = fs.readFileSync(filePath, { encoding: "utf-8" });
} catch (error) {
  PRIVATEKEY = "zsb_https://github.com/popring";
}

module.exports = PRIVATEKEY;
