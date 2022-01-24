require('dotenv').config();
const JWT = require('jsonwebtoken');


module.exports = {
    makeToken: user => {
        try {
           return JWT.sign(
                {
                    data: user
                },
                process.env.JWT_SECRET,
                {
                    algorithm: 'HS256',
                    expiresIn: '360m'
                }
            );
        } catch(error) {
            console.log(error);
            throw error;
        }
    },

    validateToken: token => {
        try {
            return JWT.verify(
                token,
                process.env.JWT_SECRET,
                {
                    algorithms: ['HS256']
                }
            );
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}