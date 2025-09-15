const { body } = require("express-validator");

const addressShape = () => [
  body("address")
    .optional()
    .isObject()
    .withMessage("address must be an object"),
  body("address.city")
    .optional()
    .isString()
    .withMessage("city must be a string"),
  body("address.zipcode")
    .optional()
    .isString()
    .withMessage("zipcode must be a string"),
  body("address.geo")
    .optional()
    .isObject()
    .withMessage("geo must be an object"),
  body("address.geo.lat")
    .optional()
    .isFloat()
    .withMessage("lat must be a number"),
  body("address.geo.lng")
    .optional()
    .isFloat()
    .withMessage("lng must be a number"),
];

const createUserValidators = [
  body("name").exists({ checkFalsy: true }).withMessage("name is required"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("phone")
    .optional()
    .isString()
    .isLength({ min: 7 })
    .withMessage("phone must be at least 7 chars"),
  ...addressShape(),
];

const updateUserValidators = [
  body("name").optional().isString(),
  body("email").optional().isEmail().withMessage("invalid email"),
  body("phone").optional().isString().isLength({ min: 7 }),
  ...addressShape(),
];

module.exports = {
  createUserValidators,
  updateUserValidators,
};
