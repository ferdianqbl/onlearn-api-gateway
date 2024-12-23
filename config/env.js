require("dotenv").config();

module.exports = {
  app_name: process.env.APP_NAME,
  axios_timeout: process.env.AXIOS_TIMEOUT,
  url_api_gateway: process.env.URL_API_GATEWAY || "localhost:4000",
  url_service_media: process.env.URL_SERVICE_MEDIA || "localhost:8080",
  url_service_user: process.env.URL_SERVICE_USER || "localhost:5000",
  url_service_course: process.env.URL_SERVICE_COURSE || "localhost:8000",
  jsonWebToken: {
    secret: process.env.JWT_SECRET,
    secret_refresh_token: process.env.JWT_SECRET_REFRESH_TOKEN,
    access_token_expired: process.env.JWT_ACCESS_TOKEN_EXPIRED,
    refresh_token_expired: process.env.JWT_REFRESH_TOKEN_EXPIRED,
  },
};
