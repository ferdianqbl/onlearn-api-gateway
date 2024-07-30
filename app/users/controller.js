const getUser = require("./handler/getUser");
const login = require("./handler/login");
const logout = require("./handler/logout");
const register = require("./handler/register");
const update = require("./handler/update");
const deleteUser = require("./handler/delete");
module.exports = {
  register,
  login,
  update,
  getUser,
  logout,
  deleteUser,
};
