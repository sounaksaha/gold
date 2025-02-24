import joi from "joi";

const quantityValidation = joi.object({
    productType:joi.string().valid('gold','silver').required(),
    quantity:joi.number().required()
})
export {quantityValidation};