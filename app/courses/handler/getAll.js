const { url_service_course, url_api_gateway } = require("../../../config/env");
const callAPI = require("../../../services/apiAdapter");

module.exports = async (req, res, next) => {
  try {
    const courses = await callAPI({
      method: "GET",
      url: url_service_course,
      path: "/courses",
      params: { ...req.query },
    });

    const coursesData = courses.data.data;

    const firstPage = coursesData.first_page_url.split("?").pop();
    const lastPage = coursesData.last_page_url.split("?").pop();
    const nextPage = coursesData.next_page_url
      ? coursesData.next_page_url.split("?").pop()
      : null;
    const prevPage = coursesData.prev_page_url
      ? coursesData.prev_page_url.split("?").pop()
      : null;
    const links = coursesData.links.map((link) => {
      const url = link.url ? link.url.split("?").pop() : null;
      return { ...link, url: url ? `${url_api_gateway}/courses?${url}` : null };
    });

    courses.data.data = {
      ...coursesData,
      first_page_url: `${url_api_gateway}/courses?${firstPage}`,
      last_page_url: `${url_api_gateway}/courses?${lastPage}`,
      next_page_url: nextPage ? `${url_api_gateway}/courses?${nextPage}` : null,
      prev_page_url: prevPage ? `${url_api_gateway}/courses?${prevPage}` : null,
      links,
      path: `${url_api_gateway}/courses`,
    };

    return res.status(200).json(courses.data);
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
