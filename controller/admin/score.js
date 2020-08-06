const models = require("../../models");
const tips = require("../../config/Tips");

const Sequelize = models.Sequelize;
const sequelize = models.sequelize;

/**
 * 查询所有学生成绩
 * @returns {Promise<{code: number, tableData: {}, message: string}>}
 */
async function getAllScore() {
  let data = {};
  data.count = await models.Score.count({
    distinct: true,
    col: "sid",
  });
  // 原始 sql
  // SELECT s1.Sid, s1.Sname, s1.Smajor, s2.total_score FROM student as s1,
  // (SELECT `Score`.`Sid`,sum(`grade`) AS `total_score` FROM `grade` AS `Score` GROUP BY `Sid`) as s2
  // WHERE s1.Sid = s2.Sid
  // TODO sequelize 方式，添加连接学生表
  // const score = await models.Score.findAll({
  //   attributes: [
  //     "Sid",
  //     [Sequelize.fn("sum", Sequelize.col("grade")), "total_score"],
  //   ],
  //   group: ["Sid"],
  //   limit: 2,
  //   offset: 10
  // });
  const score = await sequelize.query("SELECT s1.Sid, s1.Sname, s1.Smajor, s2.total_score FROM student as s1,\n" +
    "(SELECT `Score`.`Sid`,sum(`grade`) AS `total_score` FROM `grade` AS `Score` GROUP BY `Sid`) as s2\n" +
    "WHERE s1.Sid = s2.Sid");

  data.rows = score[0];
  return {
    ...tips.GET_INFO_SUCCESS,
    tableData: data,
  };
}

/**
 * 添加学生成绩
 * @param userScoreInfo 学生成绩信息 example: {sid: 202021, 1: 98, 2: 89, cid: score}
 * @returns {Promise<{code: number, message: string} | {code: number, message: string}>}
 */
function createScore(userScoreInfo) {
  const sid = userScoreInfo.sid;
  delete userScoreInfo.sid;
  return sequelize.transaction(async function(t) {
    const courses = [];
    for (const cou in userScoreInfo) {
      const jsonCourseScore = {
        sid,
        cid: cou,
        grade: userScoreInfo[cou],
      };
      const score = await models.Score.create(jsonCourseScore, { transaction: t });
      courses.push(score);
    }
    return courses;
  }).then(() => {
    return tips.OPERATE_SUCCESS;
  }).catch(() => {
    return {
      ...tips.OPERATE_FAILED,
      message: "请勿重复添加学生成绩，添加失败",
    };
  });
}

/**
 * /**
 * 修改已存在的学生成绩信息
 * @param sid 学生id
 * @param userScoreInfo  学生成绩信息 example: {sid: 202021, 1: 98, 2: 89, cid: score}
 * @returns {Promise<{code: number, message: string} | {code: number, message: string}>}
 */
function updateScore(sid, userScoreInfo) {
  return sequelize.transaction(async t => {
    const courses = [];
    for (const cid in userScoreInfo) {
      const grade = userScoreInfo[cid];
      let score = await models.Score.findOne({
        where: {
          sid,
          cid,
        },
        transaction: t,
      });
      score.set("grade", grade);
      await score.save();
      courses.push(score);
    }
    return courses;
  }).then(() => {
    return tips.OPERATE_SUCCESS;
  }).catch(() => {
    return {
      ...tips.OPERATE_FAILED,
      message: "修改失败，可能没有当前课程分数",
    };
  });
}

module.exports = {
  getAllScore,
  createScore,
  updateScore,
};