const data = require("../utils/chair.json");

exports.chair = async (ctx, next) => {
  // let data=data;
  ctx.body = data;
};
