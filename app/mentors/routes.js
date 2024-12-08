const express = require("express");
const getAll = require("./handler/getAll");
const get = require("./handler/get");
const router = express.Router();

router.get("/", getAll);
router.get("/:id", get);

module.exports = router;
