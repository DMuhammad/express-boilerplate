const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const httpStatus = require("http-status");
const config = require("./config");
const routes = require("./routes");
const {
  errorConverter,
  errorHandler,
} = require("./middlewares/error.middleware");
const { morganSuccessHandler, morganErrorHandler } = require("./utils/logger");
const ApiError = require("./utils/ApiError");
const passport = require("passport");
const { jwtStrategy, googleStrategy } = require("./config/passport");

const app = express();

// Set security http headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable cors
app.use(cors());
app.options("*", cors());

// Morgan for logging HTTP requests
app.use(morganSuccessHandler);
app.use(morganErrorHandler);

// JWT & Google authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
passport.use("google", googleStrategy);

app.use("/api/v1", routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Convert error to ApiError
app.use(errorConverter);

// Handle error
app.use(errorHandler);

module.exports = app;
