const app = require("./app");
const config = require("./config");
const { sequelize } = require("./models");
const { logger } = require("./utils/logger");

let server;

sequelize
  .authenticate()
  .then(() => {
    logger.info("Database connection has been established successfully.");
    // Jalankan server setelah koneksi berhasil
    // CATATAN: Pastikan Anda telah menjalankan migrasi `npm run db:migrate` sebelum memulai server
    server = app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
