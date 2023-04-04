var express = require("express");
const create = require("./handler/create");
var router = express.Router();

// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });
router.post("/", create);

module.exports = router;
