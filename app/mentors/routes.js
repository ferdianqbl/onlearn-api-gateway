const express = require("express");
const { getAll, get, create } = require("./controller");
const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", create);

module.exports = router;
