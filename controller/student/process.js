const pool = require("../../config/db");

async function findOne() {
  const data = await pool.pquery("select * from process where sid=? ", [
    "202002",
  ]);
  return data;
}

module.exports = {
  findOne: findOne,
};
