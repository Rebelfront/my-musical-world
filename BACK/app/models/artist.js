const client = require('../database');
/**
 * An entity representing a music album
 * @typedef {object} Artist
 * @property {number} id
 * @property {string} name
 * @property {string} url_image
 * @property {number} api_id
 */

/**
 * A model representing an Artist
 * @class Artist
 */
class Artist {

    /**
    * The Album constructor
    * @param {object} obj a litteral object with properties copied into the instance
    */
    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    async addArtist(userId, itemId) {

        try {

            const checkArtist = await client.query(`SELECT * FROM ARTIST WHERE api_id=$1`, [itemId]);
            console.log(checkArtist.rows[0]);

            if (checkArtist.rows[0]) {
                this.id = checkArtist.rows[0].id;
                console.log(checkArtist.rows[0].id);
                const checkUserLikesArtist = await client.query(`SELECT * FROM USER_LIKES_ARTIST WHERE (api_id, user_id)=($1, $2);`, [itemId, userId]);

                if (checkUserLikesArtist.rows[0]) {
                    // console.log('artiste deja liké');
                    throw new Error('artiste déjà liké');
                }

            } else {

                const { rows } = await client.query('INSERT INTO ARTIST(name, url_image, api_id) VALUES($1, $2, $3) RETURNING id', [this.name, this.urlImage, itemId]);
                // this.id = rows[0].id;
                itemId = this.apiId;

            }

            // console.log('this', this);

            await client.query('INSERT INTO USER_LIKES_ARTIST (api_id, user_id) VALUES ($1, $2)', [itemId, userId]);
            console.log('artiste ajouté à votre bibliotheque')
            return this;


        } catch (error) {

            console.log('error du model');
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

    static async delete(userId, itemId) {

        try {
            await client.query('DELETE FROM USER_LIKES_ARTIST WHERE (api_id, user_id)=($1, $2)', [itemId, userId]);

            const artist = await client.query('SELECT * FROM ARTIST WHERE api_id=$1', [itemId]);
            const artistName = artist.rows[0].name;
            return artistName;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Artist;