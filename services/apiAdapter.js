const axios = require("axios");
const { axios_timeout } = require("../config/env");

const callAPI = ({ method, url, path, data = null, params = null }) => {
  return axios({
    method,
    url: `${url}${path}`,
    params,
    data,
    timeout: axios_timeout,
  });
};

module.exports = callAPI;
