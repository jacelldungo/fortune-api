const Joi = require('@hapi/joi');
const schema = Joi.object({
    fortune: Joi.string()
        .min(10)
        .max(200)
        .required(),

    _id: Joi.string()
        .min(10)
        .max(50)
        .required(),
});

module.exports = class fortuneValidations {
    validateForm(form, callback){
        callback(schema.validate(form));
    }
}