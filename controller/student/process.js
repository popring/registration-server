const pool = require("../../config/db");

async function findOne(sid) {
  const data = await pool.pquery("select apply, pay, `check`, addgrade, offer from process where sid=? ", [sid]);
  return data[0];
}

module.exports = {
  findOne: findOne,
};
