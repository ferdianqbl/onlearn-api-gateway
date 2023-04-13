require("dotenv").config();

module.exports = {
  app_name: process.env.APP_NAME,
  axios_timeout: process.env.AXIOS_TIMEOUT,
  url_service_media: process.env.URL_SERVICE_MEDIA || "localhost:8080",
  url_service_user: process.env.URL_SERVICE_USER || "localhost:5000",
};
