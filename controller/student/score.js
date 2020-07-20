const models = require("../../models");
const tips = require("../../config/Tips");

async function findScore (sid) {
  const score = await models.Score.findAll({
    where: {
      sid,
    },
  });
  if (score === null) {
    return tips.SCORE_NULL;
  }
  return {
    ...tips.GET_INFO_SUCCESS,
    data: score.map(item => item.dataValues),
  };
}

module.exports = {
  findScore,
};
