const router = require("koa-router")();
const mock = require("../api/mock");

router.prefix("/api/mock");

router.get("/", mock.data1);

router.get("/data2", mock.data2);

module.exports = router;
