const jwt = require("jsonwebtoken");

exports.auth = (ctx, next) => {
    // const { ctx } = arg;
    const { token } = ctx.header;
    if (token) {
        jwt.verify(token, "token", (err, decode) => {
            if (err) {
                ctx.body = {
                    status: "-1",
                    data: [],
                    msg: "token错误"
                };
                return;
            } else {
                if (decode.exp > Math.floor(Date.now() / 1000)) {
                    next();
                }
            }
        });
    } else {
        next();
    }
};
