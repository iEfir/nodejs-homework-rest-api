const { validateBody } = require("./validateBody");
const { validateFavorite } = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

module.exports = {
  validateBody,
  isValidId,
  validateFavorite,
  authenticate,
};
