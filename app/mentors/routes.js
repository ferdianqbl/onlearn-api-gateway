const express = require("express");
const router = express.Router();
const { getAll, get, create, update } = require("./controller");
const auth = require("../../middleware/auth");

router.get("/", getAll);
router.get("/:id", get);
router.post("/", auth, create);
router.put("/:id", auth, update);

module.exports = router;
