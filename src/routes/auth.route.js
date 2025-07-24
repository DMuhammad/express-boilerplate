const express = require("express");
const passport = require("passport");
const validate = require("../middlewares/validate");
const authValidation = require("../validators/auth.validator");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Rute callback yang akan dituju Google setelah pengguna login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }), // session: false karena kita pakai JWT
  authController.googleAuthCallback
);

module.exports = router;
