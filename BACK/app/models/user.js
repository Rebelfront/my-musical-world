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
            // Vérification : existe-t-il un user qui a ce mail ?
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


    // TODO : vérification mail non existant
    // enregistrer un user en bdd
    async addUser(mail, password) {

        try {

            const checkUser = await client.query(`SELECT * FROM "USER" WHERE mail=$1`, [mail]);
            // console.log('checkUser', checkUser.rows);

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
            // De quelle erreur peut-il s'agir ? 
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

    // async addUser() {
    //     try {
    //             const {rows} = await client.query('SELECT * FROM add_user($1)', [this])
    //             this.id = rows[0].id;
    //             console.log('model user', this);
    //             return this;

    //     } catch (error) {
    //         if (error.detail) {
    //             throw new Error(error.detail);
    //         }
    //         throw error;
    //     }
    // }

    async updateUser() {
        try {
           await client.query('SELECT * FROM update_user($1)', [this]);
            delete this.password;
            console.log('model this', this)
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
        // Y a-t-il besoin de rajouter une condition if avec message d'erreur si l'id demandé n'existe pas ?
        try {

            const { rows } = await client.query(`SELECT FROM "USER" WHERE id=$1`, [id]);
            // Vérification : existe-t-il un user qui a ce mail ?
            // console.log(rows[0]);


            if (rows[0] === undefined) {
                throw new Error(`il n'existe aucun compte avec cet id`);

            } else {

                await client.query('DELETE FROM "USER" WHERE id=$1', [id]);


                // if (password !== rows[0].password) {
                //     console.log('password not the same');
                //     throw new Error('password not the same')
                //     // return null;
                // }
                // else {
                //     // delete user.password 
                //     await client.query('DELETE FROM "USER" WHERE id=$1', [id]);

                // }
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