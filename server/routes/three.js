const router = require("koa-router")();

const three = require("../api/three");

router.get("/api/chair", three.chair);
module.exports = router;
