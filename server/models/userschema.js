const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        password: String
    },
    {
        collection: "user"
    }
);

module.exports = mongoose.model("UserSchema", userSchema);
