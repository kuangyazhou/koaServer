const router = require("koa-router")();
const mongoose = require("mongoose");
const User = require("../api/user");

//连接MongoDB数据库
mongoose.connect("mongodb://localhost:27017/admin");

mongoose.connection.on("connected", function() {
    console.log("MongoDB connected success.");
});

mongoose.connection.on("error", function() {
    console.log("MongoDB connected fail.");
});

mongoose.connection.on("disconnected", function() {
    console.log("MongoDB connected disconnected.");
});

router.get("/", async (ctx, next) => {
    await ctx.render("index", {
        title: "Hello Koa 2!"
    });
});

router.get("/string", async (ctx, next) => {
    ctx.body = "koa2 string aaaaaaaaa";
});

router.get("/json", async (ctx, next) => {
    ctx.body = {
        title: "koa2 json"
    };
});

router.get("/api", User.user);

router.get("/api/db/:type", User.userDB);

router.get("/api/mysql", User.mysql);

router.get("/api/insert", User.insert);

router.get("/api/del", User.del);

module.exports = router;
