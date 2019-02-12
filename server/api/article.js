const ARTICLESCHEMA = require("../models/article");
const USERSCHEMA = require("../models/userschema");

const { handleErr, handleSuccess } = require("../utils/handle");

exports.artAdd = async (ctx, next) => {
  const { id, title, desc, author, content } = ctx.query;
  const time = new Date();
  const result = await ARTICLESCHEMA.create({
    id: id,
    time: time,
    title: title,
    desc: desc,
    author: author,
    authorId: id,
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
  const { page = 1, size = 10 } = ctx.query;
  // const { token } = ctx.header;
  if (page < 1 || size < 1) {
    // ctx.body = {
    //     status: "-1",
    //     data: [],
    //     msg: "参数错误"
    // };
    handleErr({ msg: "参数错误" });
  } else {
    const total = await ARTICLESCHEMA.countDocuments();
    const list = await ARTICLESCHEMA.find()
      .skip((page - 1) * Number(size))
      .limit(Number(size))
      .exec();
    console.log(page, size, total);
    ctx.body = {
      status: "0",
      data: list,
      msg: "",
      total: total
    };
    // { data: list, ctx: ctx }
    // handleSuccess({ data: list, ctx: ctx, total: total });
  }
  // let decode = null;
  // jwt.verify(token, "token", async (err, decode) => {
  //     if (err) {
  //         ctx.body = {
  //             status: "-1",
  //             data: [],
  //             msg: "token失效"
  //         };
  //         await next();
  //     } else {
  //         if (decode.exp > Math.floor(Date.now() / 1000)) {
  //             if (page < 1 || size < 1) {
  //                 ctx.body = {
  //                     status: "-1",
  //                     data: [],
  //                     msg: "参数错误"
  //                 };
  //             } else {
  //                 const total = await ARTICLESCHEMA.countDocuments();
  //                 const list = await ARTICLESCHEMA.find()
  //                     .skip((page - 1) * Number(size))
  //                     .limit(Number(size))
  //                     .exec();
  //                 console.log(page, size, total, decode);
  //                 await next();
  //                 ctx.body = {
  //                     status: "0",
  //                     data: list,
  //                     msg: "",
  //                     total: total
  //                 };
  //             }
  //         } else {
  //             ctx.body = {
  //                 status: "-1",
  //                 data: [],
  //                 msg: "token过期"
  //             };
  //         }
  //     }
  // });
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
  console.log(id, num);
  //mongonse 修改器
  const res = await ARTICLESCHEMA.update({ _id: id }, { $inc: { like: num } });
  console.log(res);
  if (num > 0) {
    const list = await ARTICLESCHEMA.update(
      { _id: id },
      { $push: { likeUser: id } }
    );
    ctx.body = {
      status: "0",
      data: res,
      msg: "点赞成功"
    };
  } else {
    const list = await ARTICLESCHEMA.update(
      { _id: id },
      { $pull: { likeUser: id } }
    );
    console.log(list);
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

exports.nums = async (ctx, next) => {
  const { id } = ctx.query;
  const auth = await USERSCHEMA.find({ _id: id });
  const art = await ARTICLESCHEMA.find({ auth: "kyz" });
  // console.log(art);
  let like = 0;
  art.forEach(item => {
    // console.log(item.content, item.like);
    item.like ? (like += item.like) : "";
  });
  ctx.body = {
    status: "0",
    data: {
      fans: 100,
      art: art.length,
      words: 0,
      like: like
    },
    msg: ""
  };
};

exports.view = async (ctx, next) => {
  const { id } = ctx.query;
  const res = await ARTICLESCHEMA.update(
    {
      _id: id
    },
    {
      $inc: { view: 1 }
    }
  );
  if (res.n === 1) {
    ctx.body = {
      status: "0",
      data: [],
      msg: ""
    };
  }
};
