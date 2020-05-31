const Joi = require('@hapi/joi');
const schema = Joi.object({
    name: Joi.string()
    .min(2)
    .max(50)
    .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    
});

module.exports = class AuthForm {
    validateForms(form, callback){
        callback(schema.validate(form));
    }
}