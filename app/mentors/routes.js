const express = require("express");
const getAll = require("./handler/getAll");
const router = express.Router();

router.get("/", getAll);

module.exports = router;
