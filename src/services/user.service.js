const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

const createUser = async (userBody) => {
  if (
    userBody.email &&
    (await User.findOne({ where: { email: userBody.email } }))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return User.create(userBody);
};

const queryUsers = async (filter, options) => {
  const { limit, page, sortBy } = options;
  const offset = (page - 1) * limit;
  const order = sortBy ? [sortBy.split(":")] : [];

  const { count, rows } = await User.findAndCountAll({
    where: filter,
    limit,
    offset,
    order,
  });

  return { results: rows, totalResults: count, page, limit };
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

const getUserByGoogleId = async (googleId) => {
  return User.findOne({ where: { googleId } });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (
    updateBody.email &&
    (await User.findOne({
      where: {
        email: updateBody.email,
        id: { [require("sequelize").Op.ne]: userId },
      },
    }))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.destroy();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByGoogleId,
  updateUserById,
  deleteUserById,
};
