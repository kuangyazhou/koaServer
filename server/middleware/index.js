const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
    // console.log(ctx.url);
    const { token } = ctx.header;
    // console.log(ctx.header);
    console.log(token);
    if (token) {
        await jwt.verify(token, "token", (err, decode) => {
            console.log(err, decode);
            if (err) {
                ctx.body = {
                    status: "-1",
                    msg: "登录失效"
                };
                console.log(err);
                return;
            }
            if (decode.exp <= Math.floor(Date.now / 1000)) {
                ctx.body = {
                    status: "-1",
                    msg: "token过期"
                };
                return;
            } else {
                return next();
            }
        });
    } else {
        ctx.body = {
            status: "-1",
            msg: "登录失效"
        };
    }
};
