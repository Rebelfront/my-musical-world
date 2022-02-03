const { response } = require('express');
const client = require('../database.js');
const bcrypt = require('bcrypt');


class User {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    // Récupérer tous les users : pas besoin d'une méthode findAll pour la table user pour l'instant

    // Récupérer un user par son id 
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

    //TODO : récupérer un user par son email 
    static async findByMail(mail, password) {

        try {
            const { rows } = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);

            if (rows[0]) {
                const isPwdValid = await bcrypt.compare(password, rows[0].password);

                if (isPwdValid === false) {

                    console.log('Mot de passe incorrect.');
                    throw new Error('Mot de passe incorrect.');

                } else {
                    const user = new User(rows[0]);
                    delete user.password
                    console.log('model validMail', user);
                    return user;
                }
            } else {
                console.log(`Aucun utilisateur enregistré avec cet email.`);
                throw new Error(`Aucun utilisateur enregistré avec cet email.`);


            }
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }


    }

    // enregistrer un user en bdd
    async addUser(mail, pseudo, password) {

        try {

            const checkMail = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);
            // console.log('userPseudo',checkUser.rows[0].pseudo)

            if (!checkMail.rows[0]) {
                const checkPseudo = await client.query(`SELECT * FROM "USER" WHERE pseudo=$1`, [pseudo]);

                if (!checkPseudo.rows[0]) {

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
                    console.log('Ce pseudo est déjà pris.')
                    throw new Error('Ce pseudo est déjà pris.');
                }



            } else {
                console.log('Un utilisateur avec cet email existe déjà.')
                throw new Error('Un utilisateur avec cet email existe déjà.');
            }


        } catch (error) {

            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

    // TODO : const {rows} = await client.query('SELECT * FROM add_user($1)', [this])

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


    // supprimer un user de la bdd
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