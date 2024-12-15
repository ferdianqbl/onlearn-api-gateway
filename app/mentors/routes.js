const express = require("express");
const router = express.Router();
const { getAll, get, create, update, destroy } = require("./controller");
const auth = require("../../middleware/auth");

router.get("/", getAll);
router.get("/:id", get);
router.post("/", auth, create);
router.put("/:id", auth, update);
router.delete("/:id", auth, destroy);

module.exports = router;
