import Joi from "joi";

const priceValidation = Joi.object({
  productType: Joi.string().valid("gold", "silver").required(),
  date: Joi.date().required(),
  time: Joi.date().required(),
  price: Joi.string().required(),
});

export {priceValidation};