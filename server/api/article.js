const ARTICLESCHEMA = require("../models/article");

exports.artAdd = async (ctx, next) => {
    const { id, title, desc, author, content } = ctx.query;
    const time = new Date();
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
    const list = await ARTICLESCHEMA.find({ _id: id });
    console.log(id, list);
    ctx.body = {
        status: "0",
        data: list,
        msg: ""
    };
};

exports.arcUpdate = async (ctx, next) => {
    const { id, title, desc, content } = ctx.query;
    const res = await ARTICLESCHEMA.findByIdAndUpdate(
        { _id: id },
        {
            $set: {
                title: title,
                desc: desc,
                content: content
            }
        }
    );
    ctx.body = {
        status: "0",
        data: res,
        msg: "修改成功"
    };
};

exports.artDel = async (ctx, next) => {
    const { id } = ctx.query;
    const res = await ARTICLESCHEMA.deleteOne({ _id: id });
    // .catch(err =>
    //     ctx.throw(500, "服务器内部错误")
    // );
    console.log(res);
    if (res) {
        ctx.body = {
            status: "0",
            data: res,
            msg: "删除成功"
        };
    }
};

exports.comment = async (ctx, next) => {
    const { id, author, content } = ctx.query;
    const time = new Date();
    const result = await ARTICLESCHEMA.update(
        { _id: id },
        {
            $push: {
                comments: [
                    {
                        author: author,
                        content: content,
                        time: time
                    }
                ]
            }
        }
    );
    // res.......
    console.log(result);
    if (result.n == 1) {
        ctx.body = {
            status: "0",
            data: [],
            msg: "评论成功"
        };
    }
};

exports.likeoperate = async (ctx, next) => {
    const { id, num } = ctx.query;
    //mongonse 修改器
    const res = await ARTICLESCHEMA.update(
        { _id: id },
        { $inc: { like: num } }
    );
    console.log(res);
    if (num > 0) {
        ctx.body = {
            status: "0",
            data: res,
            msg: "点赞成功"
        };
    } else {
        ctx.body = {
            status: "0",
            data: res,
            msg: "取消点赞"
        };
    }
};

exports.collectoperate = async (ctx, next) => {
    const { id, num } = ctx.query;
    const res = await ARTICLESCHEMA.update(
        { _id: id },
        { $inc: { collect: num } }
    );
    if (num > 0) {
        ctx.body = {
            status: "0",
            data: res,
            msg: "收藏成功"
        };
    } else {
        ctx.body = {
            status: "0",
            data: res,
            msg: "取消收藏"
        };
    }
};
