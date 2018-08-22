const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        id: Number,
        time: Date,
        title: String, //标题
        desc: String, //描述
        author: String, //作者,
        authorId: String, //作者id
        content: String, //内容
        view: Number, //浏览次数
        collect: Number, //收藏次数
        collectUser: Array, //收藏的用户
        like: Number, //点赞数，
        likeUser: Array, //点赞的用户
        url: String,
        comments: [
            {
                author: String, //作者
                content: String, //内容
                time: Date //时间
            }
        ]
    },
    { collection: "article", versionKey: false }
);

module.exports = mongoose.model("articleSchema", articleSchema);
