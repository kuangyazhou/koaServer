const router = require("koa-router")();

const auth = require("../middleware");
const article = require("../api/article");

router.prefix("/api/article");

//路由鉴权
router.use(auth);

router.get("/", article.artList);

router.get("/add", article.artAdd);

router.get("/artInfo", article.artById);

router.get("/artUpdate", article.arcUpdate);

router.get("/artDel", article.artDel);

router.get("/comment", article.comment);

router.get("/like", article.likeoperate);

router.get("/collect", article.collectoperate);

router.get("/nums", article.nums);

router.get("/view", article.view);

module.exports = router;
