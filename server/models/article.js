const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        id: Number,
        time: Date,
        title: String, //标题
        desc: String, //描述
        author: String, //作者
        content: String, //内容
        view: Number, //浏览次数
        like: Number, //点赞数
        comments: [
            {
                author: String, //作者
                content: String //内容
            }
        ]
    },
    { collation: "article", versionKey: false }
);

module.exports = mongoose.model("articleSchema", articleSchema);
