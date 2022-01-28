const client = require('../database');

class Artist {

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
                const checkUserLikesArtist = await client.query(`SELECT * FROM USER_LIKES_ARTIST WHERE (artist_id, user_id)=($1, $2);`, [this.id, userId]);

                if(checkUserLikesArtist.rows[0]) {
                    // console.log('artiste deja liké');
                    throw new Error('artiste déjà liké');
                } 
                                  
            } else {

                const { rows } = await client.query('INSERT INTO ARTIST(name, url_image, api_id) VALUES($1, $2, $3) RETURNING id', [this.name,this.urlImage, this.apiId]);

                this.id = rows[0].id;
                itemId = this.apiId;

            }

            // console.log('this', this);

            await client.query('INSERT INTO USER_LIKES_ARTIST (artist_id, user_id) VALUES ($1, $2)', [this.id, userId]);
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

    async delete() {
        try {
            await db.query('DELETE FROM artist WHERE id=', [this.id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Artist;