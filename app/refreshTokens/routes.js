const express = require("express");
const { refresh } = require("./controller");
const router = express.Router();

router.post("/", refresh);

module.exports = router;
