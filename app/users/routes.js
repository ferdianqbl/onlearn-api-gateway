const express = require("express");
const { register, login, update, getUser } = require("./controller");
const auth = require("../../middleware/auth");
const router = express.Router();

router.get("/", auth, getUser);
router.post("/register", register);
router.post("/login", login);
router.put("/", auth, update);

module.exports = router;
