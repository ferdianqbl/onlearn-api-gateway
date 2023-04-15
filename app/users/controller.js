const getUser = require("./handler/getUser");
const login = require("./handler/login");
const register = require("./handler/register");
const update = require("./handler/update");
module.exports = {
  register,
  login,
  update,
  getUser,
};
