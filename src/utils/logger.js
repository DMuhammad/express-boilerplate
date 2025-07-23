const winston = require("winston");
const config = require("../config");
const morgan = require("morgan");

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"],
    }),
  ],
});

// Morgan stream for success logs
const morganSuccessHandler = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
  }
);

// Morgan stream for error logs
const morganErrorHandler = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) },
  }
);

module.exports = { logger, morganSuccessHandler, morganErrorHandler };
