const { url_service_user } = require("../../../config/env");
const callAPI = require("../../../services/apiAdapter");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user.data;
    const updatedUser = await callAPI({
      method: "PUT",
      url: url_service_user,
      path: `/users/${id}`,
      data: req.body,
    });

    return res.status(200).json(updatedUser.data);
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
