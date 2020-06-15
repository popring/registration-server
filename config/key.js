const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "../PrivateKey.key");

let PRIVATEKEY;

try {
  PRIVATEKEY = fs.readFileSync(filePath, { encoding: "utf-8" });
} catch (error) {
  PRIVATEKEY = "zsb_https://github.com/popring";
}

module.exports = PRIVATEKEY;
