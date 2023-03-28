const axios = require("axios");
const { axios_timeout } = require("../config/env");

module.exports = (baseUrl) => {
  return axios.create({
    baseUrl,
    timeout: axios_timeout,
  });
};
