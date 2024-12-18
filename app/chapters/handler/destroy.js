const { url_service_course } = require("../../../config/env");
const callAPI = require("../../../services/apiAdapter");

module.exports = async (req, res, next) => {
  try {
    const { role } = req.user.data;

    if (role !== "admin")
      return res.status(403).json({ error: 1, message: "Unauthorized" });

    const { id } = req.params;

    const chapter = await callAPI({
      method: "DELETE",
      url: url_service_course,
      path: `/chapter/${id}`,
    });

    return res.status(200).json(chapter.data);
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
