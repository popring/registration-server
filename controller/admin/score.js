const models = require("../../models");
const tips = require("../../config/Tips");
// const { tableResponse } = require("../../utils/tableResponse");

const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;

/**
 * 查询所有学生成绩
 * @returns {Promise<{code: number, tableData: {}, message: string}>}
 */
async function findAllScore(opt) {
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
  //   offset: 10,
  // });
  // return score;
  // ------------------以下为临时代码-----------------------
  opt.search = `%${opt.search || ""}%`;
  opt.offset = Number.parseInt(opt.offset) || 0;
  opt.limit = Number.parseInt(opt.limit) || 10;
  let data = {};
  data.offset = opt.offset;
  data.limit = opt.limit;
  data.count = await models.Score.count({
    distinct: true,
    col: "sid",
    where: {
      Sid: {
        [Op.like]: `%${opt.search}%`,
      },
    },
  });
  const score = await sequelize.query("SELECT s1.Sid, s1.Sname, s1.Smajor, s2.total_score FROM student as s1,\n" +
    "(SELECT `Score`.`Sid`,sum(`grade`) AS `total_score` FROM `grade` AS `Score` GROUP BY `Sid`) as s2\n" +
    "WHERE s1.Sid = s2.Sid AND s1.Sid LIKE ? ORDER BY Sid DESC LIMIT ?, ?", {
    replacements: [opt.search, opt.offset, opt.limit],
  });

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
  const sid = userScoreInfo.Sid;
  const scores = userScoreInfo.scores;
  console.log(sid, scores);
  return sequelize.transaction(async function(t) {
    const courses = [];
    for (const score of scores) {
      const jsonCourseScore = {
        sid,
        cid: score.cid,
        grade: parseFloat(score.score),
      };
      const course = await models.Score.create(jsonCourseScore, { transaction: t });
      courses.push(course);
    }
    return courses;
  }).then(async () => {
    const process = await models.Process.findOne({
      where: {
        sid,
      },
    });
    process.set("addgrade", 1);
    await process.save();
    return tips.OPERATE_SUCCESS;
  }).catch((e) => {
    console.log(e);
    return {
      ...tips.OPERATE_FAILED,
      message: "请勿重复添加学生成绩，添加失败",
    };
  });
}

/**
 * 修改已存在的学生成绩信息
 * @param userScoreInfo  学生成绩信息 example: {sid: 202021, 1: 98, 2: 89, cid: score}
 * @returns {Promise<{code: number, message: string} | {code: number, message: string}>}
 */
function updateScore(userScoreInfo) {
  const sid = userScoreInfo.Sid;
  const scores = userScoreInfo.scores;
  return sequelize.transaction(async t => {
    const courses = [];
    for (const score of scores) {
      const course = await models.Score.findOne({
        where: {
          sid: sid,
          cid: score.cid,
        },
        transaction: t,
      });
      course.set("grade", parseFloat(score.score));
      await course.save();
      courses.push(course);
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

/**
 * 获取学生信息及科目分数
 * @param sid
 * @param type 可选 add, edit
 * @returns {Promise<{code: number, message: string}|{code: number, data: {stuInfo: ({Major}|*), couInfo: (*|Uint8Array|BigInt64Array|*[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array)}, message: string}>}
 */
async function findStuInfoScore(sid, type = "add") {
  const stuRes = await models.Student.findOne({
    attributes: ["Sid", "Sname", "Sidcard"],
    where: {
      sid,
    },
    include: [
      { model: models.Major },
    ],
  });
  if (stuRes === null) return { ...tips.GET_INFO_FAILED, message: "获取学生信息失败" };
  let cids = (stuRes.Major && stuRes.Major.get("cids")) || "";
  // 考试科目信息
  cids = cids.split(",").filter(v => v.length !== 0);
  if (cids.length === 0) return { ...tips.GET_INFO_FAILED, message: "获取学生考试科目信息失败" };
  let couInfo = await models.Course.findAll({
    where: {
      cid: {
        [Op.or]: cids,
      },
    },
    raw: true,
  });
  let hasScore = await models.Score.findAll({
    where: {
      Sid: sid,
      cid: {
        [Op.or]: cids,
      },
    },
  });
  if (hasScore.length !== 0 && type !== "edit") {
    return { ...tips.GET_INFO_FAILED, message: "该生成绩已录入，请勿重复录入" };
  }
  if (type === "edit") {
    couInfo = couInfo.map((item) => {
      const index = hasScore.findIndex((v) => v.cid === item.cid);
      item.score = hasScore[index].grade;
      return item;
    });
  }
  return {
    ...tips.GET_INFO_SUCCESS,
    data: {
      stuInfo: stuRes,
      couInfo: couInfo,
    },
  };
}

/**
 * 批量录取学生
 * @returns {Promise<{code: number, message: string}>}
 */
async function offerScore() {
  let res = await sequelize.query("SELECT s1.Sid,s1.Sname,s1.Smajor,s2.total_score FROM student AS s1,(\n" +
    "SELECT `Score`.`Sid`,sum(`grade`) AS `total_score` FROM `grade` AS `Score` GROUP BY `Sid`) AS s2 WHERE s1.Sid=s2.Sid AND s2.total_score>=?  ORDER BY total_score DESC", {
    replacements: [200],
  });
  res = res[0];
  let offerStu = await models.Process.findAll({
    where: {
      Sid: {
        [Op.or]: res.map(v => v.Sid),
      },
    },
  });
  for (const offerStuElement of offerStu) {
    offerStuElement.set("offer", 1);
    await offerStuElement.save();
  }
  res = await sequelize.query("SELECT s1.Sid,s1.Sname,s1.Smajor,s2.total_score FROM student AS s1,(\n" +
    "SELECT `Score`.`Sid`,sum(`grade`) AS `total_score` FROM `grade` AS `Score` GROUP BY `Sid`) AS s2 WHERE s1.Sid=s2.Sid AND s2.total_score<?  ORDER BY total_score DESC", {
    replacements: [200],
  });
  res = res[0];
  let noOfferStu = await models.Process.findAll({
    where: {
      Sid: {
        [Op.or]: res.map(v => v.Sid),
      },
    },
  });
  for (const offerStuElement of noOfferStu) {
    offerStuElement.set("offer", 2);
    await offerStuElement.save();
  }
  return { ...tips.OPERATE_SUCCESS, message: "操作成功" };
}

module.exports = {
  findAllScore,
  createScore,
  updateScore,
  findStuInfoScore,
  offerScore,
};