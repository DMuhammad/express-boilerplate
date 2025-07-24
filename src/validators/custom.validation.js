const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }

  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least one letter and one number"
    );
  }

  return value;
};

const objectId = (value, helpers) => {
  return value;
};

module.exports = {
  password,
  objectId,
};
