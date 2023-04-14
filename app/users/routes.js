var express = require("express");
const { register, login } = require("./controller");
var router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
