const koa = require("koa");

// const ctx = koa.BaseContext;

exports.handleSuccess = arg => {
    const {
        ctx = koa.context,
        status = "0",
        data = [],
        msg = "请求成功"
    } = arg;
    ctx.body = {
        status: status,
        data: data,
        msg: msg
    };
};

exports.handleErr = arg => {
    // console.log(ctx, status, data, msg);
    const {
        ctx = koa.context,
        status = "-1",
        data = [],
        msg = "请求失败"
    } = arg;
    ctx.response.body = {
        status: status,
        data: data,
        msg: msg
    };
};
