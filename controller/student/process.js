const models = require("../../models");
const tips = require("../../config/Tips");

async function findOne (sid) {
  const process = await models.Process.findOne({
    where: {
      sid,
    },
  });
  return {
    ...tips.GET_INFO_SUCCESS,
    data: process.dataValues,
  };
}

module.exports = {
  findOne,
};
