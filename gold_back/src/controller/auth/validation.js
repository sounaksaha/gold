import Joi from 'joi'

 const registerValidation = Joi.object({
    userName:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
})


export {registerValidation};
