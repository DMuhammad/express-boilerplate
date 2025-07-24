const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters.");
  }

  if (!value.match(/[A-Z]/)) {
    return helpers.message("password must contain at least one uppercase.");
  }

  if (!value.match(/\d/)) {
    return helpers.message("password must contain at least one number.");
  }

  if (!value.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    return helpers.message(
      'password must contain at least one symbol (!@#$%^&*(),.?":{}|<>).'
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
