const { response } = require('express');
const client = require('../database.js');
const bcrypt = require('bcrypt');

/**
 * An entity representing a user of the website
 * @typedef {Object} User
 * @property {Number} id
 * @property {String} mail
 * @property {String} lastname
 * @property {String} firstname
 * @property {String} pseudo
 * @property {String} password
 */

/**
 * A model representing a user of the website
 * @class User
 */
class User {

    /**
    * The User constructor
    * @param {Object} obj a litteral object with properties copied into the instance
    */

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    /**
     * Fetches a single user with the given id from the database, used to get the connected user profile infos
     * @param {number} id 
     * @returns {Object<User>} User
     * @throws {Error} a potential SQL error, or if no user with the given id is found in the database
     * @static
     * @async
     */
    static async findOne(id) {
        const { rows } = await client.query(`SELECT * FROM "USER" WHERE id=$1`, [id]);

        // Vérification : existe-t-il un user qui a cet id ?
        if (rows[0]) {
            const user = new User(rows[0]);
            delete user.password;
            return user;
        } else {
            console.log(`No user found for id ${id}`);
            return null;
        }

    }

    /**
     * Fetches a single user with the given mail and password from the database, used to log in a user
     * @param {String} mail 
     * @param {String} password 
     * @returns {Object} User
     * @throws {Error} a potential SQL error, if the password does not match the mail or if no user with the given mail is found in the database
     * @static
     * @async
     */
    static async findByMail(mail, password) {

        try {
            const { rows } = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);

            if (rows[0]) {
                const isPwdValid = await bcrypt.compare(password, rows[0].password);

                if (isPwdValid === false) {

                    console.log('password not good');
                    throw new Error('password not good');

                } else {
                    const user = new User(rows[0]);
                    delete user.password
                    console.log('model validMail', user);
                    return user;
                }
            } else {
                console.log(`No user found for mail ${mail}`);
                throw new Error(`No user found for mail ${mail}`);


            }
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }


    }

    /**
     * Add a User to the database, use to sign up a new user
     * @param {String} mail 
     * @param {String} password 
     * @returns {Object} the newly created user
     * @throws {Error} a potential SQL error, as if a user with the given mail already exists in the database
     * @static
     * @async
     */
    async addUser(mail, password) {

        try {

            const checkUser = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);

            if (!checkUser.rows[0]) {
                const hashedPwd = await bcrypt.hash(password, 10);

                const { rows } = await client.query('INSERT INTO "USER"(mail, lastname, firstname, pseudo, "password") VALUES($1, $2, $3, $4, $5) RETURNING id',
                    [this.mail,
                    this.lastname,
                    this.firstname,
                    this.pseudo,
                        hashedPwd]);

                this.id = rows[0].id;
                delete this.password;
                return this;
            } else {
                console.log('checkUser exist')
                throw new Error('user already exists');
            }


        } catch (error) {

            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

    /**
     * Update the User infos with the given token, hash the new password if a password is filled-out
     * @param {String} password 
     * @returns {Object} the user with the updated infos
     * @throws {Error} a potential SQL error
     * @async
     */
    async updateUser(password) {
        try {
            if (password) {
                const hashedPwd = await bcrypt.hash(password, 10);
                this.password = hashedPwd;

            }

            await client.query('SELECT * FROM update_user($1)', [this]);
            delete this.password;
            return this;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }

    }

    /**
     * remove the user with the given id in the database
     * @param {Number} id 
     * @throws {Error} a potential SQL error
     * @static
     * @async
     */
    static async delete(id) {

        try {

            const { rows } = await client.query(`SELECT FROM "USER" WHERE id=$1`, [id]);

            if (rows[0] === undefined) {
                throw new Error(`il n'existe aucun compte avec cet id`);

            } else {

                await client.query('DELETE FROM "USER" WHERE id=$1', [id]);

            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

}

module.exports = User;