const { url_service_user } = require("../../../config/env");
const callAPI = require("../../../services/apiAdapter");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.user.data;
    console.log(id);

    const updatedUser = await callAPI(
      "PUT",
      url_service_user,
      `/users/${id}`,
      req.body
    );

    return res.status(200).json({
      status: 1,
      message: "User updated",
      data: updatedUser.data,
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED" || error.code === "ECONNRESET") {
      return res
        .status(500)
        .json({ status: 1, message: "Service unavailable" });
    }

    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }

    return res.status(500).json({ status: 1, message: error.message });
  }
};
