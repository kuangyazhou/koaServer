const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        password: String,
        tel: Number
    },
    {
        collection: "user",
        versionKey: false
    }
);

module.exports = mongoose.model("UserSchema", userSchema);
