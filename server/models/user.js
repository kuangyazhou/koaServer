var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        _id: Number,
        title: String,
        description: String,
        by: String,
        url: String,
        tags: Array,
        likes: Number
    },
    { collection: "admin" }
);

module.exports = mongoose.model("USER", userSchema);
