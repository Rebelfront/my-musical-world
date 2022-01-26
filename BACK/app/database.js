const {Pool} = require('pg');

const config = {
    connectionString:process.env.DATABASE_URL
}

if (process.env.NODE_ENV === 'production') {
    // Je dois adapter ma config car je suis sur l'env heroku
    config.ssl = {
        rejectUnauthorized : false
    }
}

const pool = new Pool(config);

console.log('Connected on Heroku Musical World database');

module.exports = pool;