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
    const { refreshToken, email } = req.body;

    if (!refreshToken || !email)
      return res.status(400).json({ status: 1, message: "Invalid Token" });

    await callAPI(
      "GET",
      url_service_user,
      `/tokens/?refreshToken=${refreshToken}`
    );

    jwt.verify(refreshToken, secret_refresh_token, (err, decoded) => {
      if (err)
        return res.status(403).json({
          status: 1,
          message: err.message,
        });

      /** decoded value
       * "data": {
            "id": 6,
            "name": "Alex Virraman",
            "email": "alex@gmail.com",
            "role": "student",
            "username": "alxwrmn",
            "profession": "IOS Developer",
            "avatar": null
        },
        "iat": 1681536280,
        "exp": 1681622680
       */

      if (email !== decoded.data.email)
        return res.status(400).json({
          status: 1,
          message: "Email is not valid",
        });

      const newToken = jwt.sign({ data: decoded.data }, secret, {
        expiresIn: access_token_expired,
      });

      return res.status(200).json({
        status: 0,
        message: "Token refreshed",
        data: { token: newToken },
      });
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

// token.data
/** 
 {
     "status": 0,
     "message": "Token refreshed",
     "data": {
         "token": {
             "error": 0,
             "message": "Token found",
             "token": {
                 "id": 7,
                 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo2LCJuYW1lIjoiQWxleCBWaXJyYW1hbiIsImVtYWlsIjoiYWxleEBnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiYWx4d3JtbiIsInByb2Zlc3Npb24iOiJJT1MgRGV2ZWxvcGVyIiwiYXZhdGFyIjpudWxsfSwiaWF0IjoxNjgxNTM2MjgwLCJleHAiOjE2ODE2MjI2ODB9.ZMH5RS7x1DGBSC21Y1COj2jPMm_X_O9hH0pIgVyutgw",
                 "user_id": 6,
                 "createdAt": "2023-04-15T05:24:40.000Z",
                 "updatedAt": "2023-04-15T05:24:40.000Z"
             }
         }
     }
 }
 */
