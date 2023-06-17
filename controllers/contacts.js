const { Contact } = require("../models/contactSchema");

const { HttpError, cntrlWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const result = await Contact.find();

  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const results = await Contact.create(req.body);

  res.status(201).json(results);
};

const updateById = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = {
  getAll: cntrlWrapper(getAll),
  getById: cntrlWrapper(getById),
  add: cntrlWrapper(add),
  updateById: cntrlWrapper(updateById),
  updateFavorite: cntrlWrapper(updateFavorite),
  deleteById: cntrlWrapper(deleteById),
};
