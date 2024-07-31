const {
  url_service_user,
  jsonWebToken: {
    access_token_expired,
    refresh_token_expired,
    secret,
    secret_refresh_token,
  },
} = require("../../../config/env");
const callAPI = require("../../../services/apiAdapter");

const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const user = await callAPI(
      "POST",
      url_service_user,
      "/users/login",
      req.body
    );

    const { data } = user.data;
    const token = jwt.sign({ data }, secret, {
      expiresIn: access_token_expired,
    });
    const refresh_token = jwt.sign({ data }, secret_refresh_token, {
      expiresIn: refresh_token_expired,
    });

    await callAPI("POST", url_service_user, "/tokens", {
      user_id: data.id,
      token: refresh_token,
    });

    return res.status(200).json({
      error: 0,
      message: "Login success",
      data: {
        token,
        refresh_token,
      },
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED" || error.code === "ECONNRESET") {
      return res.status(500).json({ error: 1, message: "Service unavailable" });
    }

    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }

    return res.status(500).json({ error: 1, message: error.message });
  }
};
