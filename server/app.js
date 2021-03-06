const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
var cors = require("koa-cors");

const index = require("./routes/index");
const users = require("./routes/users");
const article = require("./routes/article");
const mock = require("./routes/mock");

// error handler
onerror(app);

// middlewares
// app.use(bodyparser({
//   enableTypes:['json', 'form', 'text']
// }))
app.use(
    bodyparser({
        formLimit: "1mb"
    })
);
// app.use(
//     cors({
//         origin: ctx => {
//             if (ctx.url === "/test") {
//                 return "*";
//             } else {
//                 return "http://localhost:3001";
//             }
//         },
//         exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
//         maxAge: 5,
//         credentials: true,
//         allowMethods: ["GET", "POST", "DELETE"],
//         allowHeaders: ["Content-Type", "Authorization", "Accept"]
//     })
// );

// app.use(jwt({ secret: "token" }.unless({ path: [/^api\login/] })));
app.use(cors());

// app.use(jwt({ secret: "token" }).unless({ path: [/^api\users\login/] }));
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
    views(__dirname + "/views", {
        extension: "pug"
    })
);

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    // console.log(
    //     ctx.req.url,
    //     ctx.request.originalUrl,
    //     ctx.request.href,
    //     ctx.request.path,
    //     ctx.request.host
    // );
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(article.routes(), article.allowedMethods());
app.use(mock.routes(), mock.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
