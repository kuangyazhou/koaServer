const router = require("koa-router")();
const User = require("../api/user");

router.prefix("/api/users");

router.get("/", function(ctx, next) {
    ctx.body = "this is a users response!";
});

router.post("/bar", function(ctx, next) {
    ctx.body = "this is a users/bar response";
});

router.post("/login", User.login);

router.get("/login", User.login);

module.exports = router;
