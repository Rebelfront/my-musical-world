const client = require('../database');

class Track {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    async addTrack (userId, itemId) {

        try {

            const checkTrack = await client.query(`SELECT * FROM TRACK WHERE api_id=$1`, [itemId]);
            //console.log(checkTrack.rows[0]);

            if (checkTrack.rows[0]) {
                this.id = checkTrack.rows[0].id;
                //console.log(checkTrack.rows[0].id);
                const checkUserLikesTrack = await client.query(`SELECT * FROM USER_LIKES_TRACK WHERE (track_id, user_id)=($1, $2);`, [this.id, userId]);

                if(checkUserLikesTrack.rows[0]) {
                    console.log('chanson deja likée');
                    throw new Error('chanson déjà likée');
                } 
                                  
            } else {

                const { rows } = await client.query(
                    'INSERT INTO TRACK(name, genre, artist, year, album, url_image, api_id, url_sample) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', 
                    [this.name, 
                        this.genre, 
                        this.artist, 
                        this.year, 
                        this.album, 
                        this.urlImage, 
                        this.apiId, 
                        this.urlSample]);

                this.id = rows[0].id;
                itemId = this.apiId;

            }

            // console.log('this', this);

            await client.query('INSERT INTO USER_LIKES_TRACK (track_id, user_id) VALUES ($1, $2)', [this.id, userId]);
            console.log('Chanson ajoutée à votre bibliotheque')
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
            await db.query('DELETE FROM album WHERE id=$1', [this.id]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}


module.exports = Track;