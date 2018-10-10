const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
var cors = require("koa-cors");
const IO = require("koa-socket");

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

//cors
app.use(cors());
// ctx.set("Access-Control-Allow-Credentials", true);
// app.use(async function(ctx, next) {
//   ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
//   ctx.set("Access-Control-Allow-Credentials", true);
//   ctx.set("Access-Control-Max-Age", 86400000);
//   ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
//   ctx.set(
//     "Access-Control-Allow-Headers",
//     "x-requested-with, accept, origin, content-type"
//   );
//   await next();
// });

app.use(async (ctx, next) => {
  // if (ctx.method == "options") {
  //   ctx.set("Access-Control-Allow-Credentials", true);
  // }
  console.log(ctx.method);
  await next();
});
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

// app.use(jwt({ secret: "token" }).unless({ path: [/^api\users\login/] }));
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// socket.io
const io = new IO({
  ioOptions: {
    pingTimeout: 10000,
    pingInterval: 5000
  }
});
// 注入应用
io.attach(app);
// io.set("transports", [
//   "websocket",
//   "xhr-polling",
//   "jsonp-polling",
//   "htmlfile",
//   "flashsocket"
// ]);
// io.set("origins", "*:*");
// io.use(route(app.io, app._io, {}));

app.io.on("connection", async ctx => {
  console.log(
    `  <<<< connection ${ctx.socket.id} ${
      ctx.socket.request.connection.remoteAddress
    }`
  );
  // await Socket.create({
  //   id: ctx.socket.id,
  //   ip: ctx.socket.request.connection.remoteAddress
  // });
});
app.io.on("disconnect", async ctx => {
  console.log(`  >>>> disconnect ${ctx.socket.id}`);
  // await Socket.remove({
  //   id: ctx.socket.id
  // });
});

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
