const tips = require("../config/Tips");
const models = require("../models");

const Sequelize = models.Sequelize;
const Op = Sequelize.Op;
/**
 * 通用表格查询返回
 * @param model string
 * @param options {limit: '', offset: ''}
 * @returns {{code: number, tableData: {[p: string]: *}, message: string}}
 */
exports.tableResponse = async (model, opt = {}) => {
  let options = {};

  if (typeof model === "string") model = models[model];

  // 查询数量
  options.limit = Number.parseInt(opt.limit) >= 0 ? Number.parseInt(opt.limit) : 10;
  // 查询偏移量
  options.offset = Number.parseInt(opt.offset) >= 0 ? Number.parseInt(opt.offset) : 0;
  // 默认使用排序为倒序
  options.order = opt.order || [["sid", "DESC"]];
  // where 条件
  options.where = opt.where || {};
  // 子查询
  options.include = (opt.include && opt.include.map(item => {
    if (typeof item !== "object") return item;
    if (typeof item.model === "string") item.model = models[item.model];
    return item;
  })) || [];
  options.group = opt.group || [];
  options.attributes = opt.attributes || [];

  const result = await model.findAndCountAll(options);
  return {
    ...tips.GET_INFO_SUCCESS,
    tableData: {
      limit: options.limit,
      offset: options.offset,
      ...result,
    },
  };
};