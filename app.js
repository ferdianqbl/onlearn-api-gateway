const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// routes
const coursesRouter = require("./app/courses/routes");
const mediaRouter = require("./app/media/routes");
const ordersRouter = require("./app/orders/routes");
const paymentsRouter = require("./app/payments/routes");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// url routes
app.use("/courses", coursesRouter);
app.use("/media", mediaRouter);
app.use("/orders", ordersRouter);
app.use("/payments", paymentsRouter);

module.exports = app;
