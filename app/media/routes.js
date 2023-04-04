var express = require("express");
const { getAll, create } = require("./handler");
var router = express.Router();

router.get("/", getAll);
router.post("/", create);

module.exports = router;
