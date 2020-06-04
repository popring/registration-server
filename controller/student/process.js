const pool = require("../../config/db");

async function findOne(sid) {
  const data = await pool.pquery("select * from process where sid=? ", [sid]);
  return data;
}

module.exports = {
  findOne: findOne,
};
