const { url_service_course } = require("../../../config/env");
const callAPI = require("../../../services/apiAdapter");

module.exports = async (req, res, next) => {
  try {
    const { role } = req.user.data;

    if (role !== "admin")
      return res.status(403).json({ error: 1, message: "Unauthorized" });

    const course = await callAPI({
      method: "POST",
      url: url_service_course,
      path: `/courses`,
      data: req.body,
    });

    return res.status(200).json(course.data);
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
