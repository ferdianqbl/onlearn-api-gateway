const { url_service_media } = require("../../../config/env");
const callAPI = require("../../../services/apiAdapter");

module.exports = async (req, res, next) => {
  try {
    const media = await callAPI("POST", url_service_media, "/media", req.body);

    return res.status(200).json(media.data);
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
