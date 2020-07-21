const models = require("../../models");
const tips = require("../../config/Tips");

async function findScore (sid) {
  const score = await models.Score.findAll({
    where: {
      sid,
    },
    include: ["Course"],
  });
  if (score === null) {
    return tips.SCORE_NULL;
  }
  let data = score.map(item => item.dataValues);
  data = data.map(item => {
    const course = item.Course.dataValues;
    delete item.Course;
    delete item.sid;
    return {
      ...item,
      ...course,
    };
  });
  return {
    ...tips.GET_INFO_SUCCESS,
    data,
  };
}

module.exports = {
  findScore,
};
