const jwt = require("jsonwebtoken");
const {
  jsonWebToken: { secret },
  url_service_user,
} = require("../config/env");
const callAPI = require("../services/apiAdapter");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const data = jwt.verify(token, secret);
    const user = await callAPI({
      method: "GET",
      url: url_service_user,
      path: `/users/${data.data.id}`,
    });

    if (!user) throw new Error("User not found");

    req.user = user.data;
    req.token = token;

    next();
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
