const express = require("express");
const router = express.Router();
const { getAll, get, create } = require("./controller");
const auth = require("../../middleware/auth");

router.get("/", getAll);
router.get("/:id", get);
router.post("/", auth, create);

module.exports = router;
