const create = require("./handler/create");
const get = require("./handler/get");
const getAll = require("./handler/getAll");
const update = require("./handler/update");

module.exports = {
  create,
  getAll,
  get,
  update,
  // destroy,
};
