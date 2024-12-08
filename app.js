const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// routes
const coursesRouter = require("./app/courses/routes");
const mentorsRouter = require("./app/mentors/routes");
const mediaRouter = require("./app/media/routes");
const ordersRouter = require("./app/orders/routes");
const paymentsRouter = require("./app/payments/routes");
const usersRouter = require("./app/users/routes");
const refreshTokensRouter = require("./app/refreshTokens/routes");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// auth
const auth = require("./middleware/auth");

// url routes
app.use("/users", usersRouter);
app.use("/courses", auth, coursesRouter);
app.use("/mentors", mentorsRouter);
app.use("/media", mediaRouter);
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);
app.use("/tokens", refreshTokensRouter);

module.exports = app;
