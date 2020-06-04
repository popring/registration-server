const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../PrivateKey.key");

const PRIVATEKEY =
  fs.readFileSync(filePath).toString() || "zsb_https://github.com/popring";

module.exports = PRIVATEKEY;
