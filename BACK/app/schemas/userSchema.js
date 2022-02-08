const Joi = require('joi');

const schema = Joi.object({
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required(),
    lastname: Joi.string().required(), 
    firstname: Joi.string().required(),
    pseudo: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')).error(new Error ('Les mots de passe ne sont pas identiques.'))

});

module.exports = schema;