const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { User, Token } = require("../models");
const userService = require("./user.service");
const tokenService = require("./token.service");

const { tokenTypes } = require("../config/tokens");

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    where: {
      token: refreshToken,
      type: tokenTypes.REFRESH,
      blacklisted: false,
    },
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  await refreshTokenDoc.destroy();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await User.findByPk(refreshTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.destroy();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

const loginWithGoogle = async (googleProfile) => {
  const { id: googleId, displayName: name, emails } = googleProfile;
  const email = emails[0].value;

  let user = await userService.getUserByGoogleId(googleId);
  if (user) {
    return user;
  }

  // Jika pengguna dengan email yang sama sudah ada (mungkin daftar via email), tautkan akun
  user = await userService.getUserByEmail(email);
  if (user) {
    user.googleId = googleId;
    user.isEmailVerified = true;
    await user.save();
    return user;
  }

  // Jika tidak, buat pengguna baru
  const newUser = await userService.createUser({
    googleId,
    name,
    email,
    isEmailVerified: true,
    role: "user",
    // Password tidak diperlukan
  });
  return newUser;
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  loginWithGoogle, // BARU
};
