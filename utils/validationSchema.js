const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi
    .object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8) // minimum length of 8 characters
        .max(30) // maximum length of 30 characters
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%&()*+,-./:;<=>?@[\\]^_`{|}~])"
          )
        )
        .required() // password is required
        .messages({
          "string.min": "Password must be at least {{#limit}} characters long",
          "string.max": "Password must be at most {{#limit}} characters long",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
          "any.required": "Password is required",
        }),
    })
    .unknown(true);
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi
    .object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8) // minimum length of 8 characters
        .max(30) // maximum length of 30 characters
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%&()*+,-./:;<=>?@[\\]^_`{|}~])"
          )
        )
        .required() // password is required
        .messages({
          "string.min": "Password must be at least {{#limit}} characters long",
          "string.max": "Password must be at most {{#limit}} characters long",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
          "any.required": "Password is required",
        }),
    })
    .unknown(true);
  return schema.validate(data);
};

module.exports = {
  registerValidation: registerValidation,
  loginValidation: loginValidation,
};
