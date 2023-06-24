const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/index");

const dateRegexp = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: dateRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(15)
    .messages({
      "any.required": `missing required name field`,
    })
    .required(),
  email: Joi.string()
    .email()
    .messages({
      "any.required": `missing required email field`,
    })
    .required(),
  phone: Joi.string()
    .min(5)
    .max(15)
    .regex(dateRegexp)
    .messages({
      "any.required": `missing required phone field`,
    })
    .required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .messages({
      "any.required": `missing field favorite`,
    })
    .required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
