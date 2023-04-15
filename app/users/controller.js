const getUser = require("./handler/getUser");
const login = require("./handler/login");
const logout = require("./handler/logout");
const register = require("./handler/register");
const update = require("./handler/update");
module.exports = {
  register,
  login,
  update,
  getUser,
  logout,
};
