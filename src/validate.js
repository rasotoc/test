//validation
const Joi = require('@hapi/joi');

const registryValidation=(data)=>{
    const schema  = Joi.object({ name: Joi.string() .min(3) .required(),
    email: Joi.string() .min(6) .required() .email(),
    password: Joi.string() .min(6) .required() });
    return Joi.object(data,schema)
}
    
const loginValidation =(data)=>{
    const schema  = Joi.object({ 
    email: Joi.string() .min(6) .required() .email(),
    password: Joi.string() .min(6) .required() });
    return Joi.object(data,schema)
}

module.exports.registryValidation = registryValidation
module.exports.loginValidation = loginValidation
