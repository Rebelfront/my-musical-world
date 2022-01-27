const Joi = require('joi');

// TODO : demander pour repeat_password
const schema = Joi.object({
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required(),
    lastname: Joi.string().required(),
    firstname: Joi.string().required(),
    pseudo: Joi.string().required(),
    password: Joi.string().min(5).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    // repeat_password: Joi.ref('password')
});

module.exports = schema;