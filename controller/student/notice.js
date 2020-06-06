const pool = require("../../config/db");

// 查询所有
async function findAll() {
  const data = await pool.pquery(
    "SELECT n.Nid, a.Aname, n.title, n.time, n.content FROM notice n, admin a where a.aid=n.aid"
  );
  return data;
}

// 查询单个公告
async function findOne(nid) {
  const data = await pool.pquery(
    "SELECT n.Nid, a.Aname, n.title, n.time, n.content FROM notice n, admin a where a.aid=n.aid and n.nid=?",
    [nid]
  );
  return data[0];
}

module.exports = {
  findAll,
  findOne
};
