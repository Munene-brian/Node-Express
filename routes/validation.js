const Joi = require('@hapi/joi');

const registerUserValidation = (data)=>{
    const schemaJoi =Joi.object({
        name: Joi.string().required().min(6),
        email: Joi.string().required().min(6).email(),
        password: Joi.string().min(6).required()
    });

   return schemaJoi.validate(data)
}


const loginUserValidation = (data) =>{
    const schemaJoi =Joi.object({
        email: Joi.string().required().min(6).email(),
        password: Joi.string().min(6).required()
    });
    return schemaJoi.validate(data)
}
module.exports.registerUserValidation = registerUserValidation;
module.exports.loginUserValidation = loginUserValidation;