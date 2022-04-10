//VALIDATION

const Joi = require('@hapi/joi')

const registerValidation = (data) => {
const schema = {
    first: Joi.string().required(),
    last: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
    };
    
    return Joi.validate(data, schema)

}

const loginValidation = (data) => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
        };
        
        return Joi.validate(data, schema)
    
    }

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
