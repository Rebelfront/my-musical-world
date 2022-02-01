require('dotenv').config();
const JWT = require('jsonwebtoken');


module.exports = {
    makeToken: userId => {
        try {
           return JWT.sign(
                {
                    data: userId
                },
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '20s'
                }
            );
        } catch(error) {
            console.log(error);
            throw new Error('maketoken error jwt');
        }
    },

    validateToken: token => {
        try {
            const truc = JWT.verify(
                token,
                process.env.JWT_SECRET,
                {
                    algorithms: ['HS256']
                }
            );
            console.log('truc', truc);
            return truc;
        } catch(error) {
            console.log(error);
            throw error;
            // throw new Error('validate error jwt, session expirée');
        }
    }
}