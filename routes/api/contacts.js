const express = require("express");

const cntrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewars");
const { schemas } = require("../../models/contactSchema");

const router = express.Router();

router.get("/", cntrl.getAll);

router.get("/:contactId", isValidId, cntrl.getById);

router.post("/", validateBody(schemas.addSchema), cntrl.add);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  cntrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  cntrl.updateFavorite
);

router.delete("/:contactId", isValidId, cntrl.deleteById);

module.exports = router;
