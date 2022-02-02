const Joi = require('joi');


const schema = Joi.object({
    mail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }).required(),//.error(new Error ('Message d'erreur our le front'));
    lastname: Joi.string().required(), //.error(new Error ('Message d'erreur our le front'));
    firstname: Joi.string().required(),//.error(new Error ('Message d'erreur our le front'));
    pseudo: Joi.string().required(),//.error(new Error ('Message d'erreur our le front'));
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')).error(new Error ('Votre mot de passe doit contenir 5 caractères au minimum.')),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')).error(new Error ('Les mots de passe ne sont pas identiques.'))
});

module.exports = schema;