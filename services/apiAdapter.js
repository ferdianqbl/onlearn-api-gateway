const axios = require("axios");
const { axios_timeout } = require("../config/env");

const callAPI = (method, url, path, data) => {
  return axios({
    method,
    url: `${url}${path}`,
    data,
    timeout: axios_timeout,
  });
};

module.exports = callAPI;
