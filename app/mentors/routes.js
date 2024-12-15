const express = require("express");
const router = express.Router();
const { getAll, get, create, update, destroy } = require("./controller");

router.get("/", getAll);
router.get("/:id", get);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
