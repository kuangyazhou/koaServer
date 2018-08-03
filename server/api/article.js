const ARTICLESCHEMA = require("../models/article");

exports.artAdd = async (ctx, next) => {
    const { id, time, title, desc, author, content } = ctx.query;
    const result = await ARTICLESCHEMA.create({
        id: id,
        time: time,
        title: title,
        desc: desc,
        author: author,
        content: content
    });
    console.log(result);
    ctx.body = {
        status: "0",
        data: result,
        msg: "创建成功"
    };
};

exports.artList = async (ctx, next) => {
    const list = await ARTICLESCHEMA.find().exec();
    ctx.body = {
        status: "0",
        data: list,
        msg: ""
    };
};

exports.artById = async (ctx, next) => {
    const { id } = ctx.query;
    const list = await ARTICLESCHEMA.findById(id);
    ctx.body = {
        status: "0",
        data: list,
        msg: ""
    };
};

exports.artDel = async (ctx, next) => {
    const { id } = ctx.query;
    const res = await ARTICLESCHEMA.deleteOne(id);
    ctx.body = {
        status: "0",
        data: res,
        msg: "删除成功"
    };
};

exports.comment = async (ctx, next) => {
    const { id, author, content } = ctx.query;
    const art = await ARTICLESCHEMA.find({ id: id });
    const res = await art.comments.add({
        author: author,
        content: content
    });
    // res.......
    ctx.body={
      status:'0',
      data:[],
      msg:'评论成功'
    }
};
