const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  role: Joi.string().required().valid("user", "admin"),
});

const getUsers = Joi.object().keys({
  name: Joi.string(),
  role: Joi.string(),
  sortBy: Joi.string(),
  limit: Joi.number().integer(),
  page: Joi.number().integer(),
});

const getUser = Joi.object().keys({
  userId: Joi.string().custom(objectId), // Menggunakan custom objectId untuk validasi UUID
});

const updateUser = Joi.object().keys({
  userId: Joi.string().custom(objectId).required(),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string().valid("user", "admin"),
    })
    .min(1),
});

const deleteUser = Joi.object().keys({
  userId: Joi.string().custom(objectId),
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
