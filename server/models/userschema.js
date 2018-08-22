const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        password: String,
        tel: Number,
        time: Date,
        arts: Array //文章id
    },
    {
        collection: "user",
        versionKey: false
    }
);

module.exports = mongoose.model("UserSchema", userSchema);
