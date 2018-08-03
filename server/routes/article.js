const router = require("koa-router")();
const article = require("../api/article");

router.prefix("/api/article");

// router.get("/", ctx => {
//     ctx.body = "article list";
// });
router.get("/", article.artList);

router.get("/add", article.artAdd);

router.get("/artInfo", article.artById);

router.get("/artDel", article.artDel);

router.get("/comment", article.comment);
