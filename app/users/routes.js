const express = require("express");
const { register, login, update } = require("./controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/", auth, update);

module.exports = router;
