var express = require("express");
const { getAll, create, destroy } = require("./handler");
var router = express.Router();

router.get("/", getAll);
router.post("/", create);
router.delete("/:id", destroy);

module.exports = router;
