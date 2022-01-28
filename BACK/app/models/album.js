const client = require('../database');

class Album {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }


    async addAlbum(userId, itemId) {

        try {

            const checkAlbum = await client.query(`SELECT * FROM ALBUM WHERE api_id=$1`, [itemId]);
            console.log(checkAlbum.rows[0]);

            if (checkAlbum.rows[0]) {
                this.id = checkAlbum.rows[0].id;
                console.log(checkAlbum.rows[0].id);
                const checkUserLikesAlbum = await client.query(`SELECT * FROM USER_LIKES_ALBUM WHERE (album_id, user_id)=($1, $2);`, [this.id, userId]);

                if(checkUserLikesAlbum.rows[0]) {
                    console.log('album deja liké');
                    throw new Error('album déjà liké');
                } 
                                  
            } else {

                const { rows } = await client.query('INSERT INTO ALBUM(name, genre, artist, year, url_image, api_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', [this.name, this.genre, this.artist, this.year, this.urlImage, this.apiId]);

                //this.id = rows[0].id;
                itemId = this.apiId;

            }

            console.log('this', this);

            await client.query('INSERT INTO USER_LIKES_ALBUM (api_id, user_id) VALUES ($1, $2)', [this.apiId, userId]);
            console.log('album ajouté à votre bibliotheque')
            return this;


        } catch (error) {

            console.log('error du model');
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }

    // static async findAllByUser(id) {
    //     try {
    //         const { rows } = await db.query('SELECT tracks, artists, albums FROM userTracksAlbumsArtists WHERE id=$1');
    //         return rows.map(row => new Track(row));
    //     } catch (error) {
    //         if (error.detail) {
    //             throw new Error(error.detail);
    //         }
    //         throw error;
    //     }
    // }

    async delete(userId, itemId) {
        try {
            await client.query('DELETE FROM USER_LIKES_ALBUM WHERE (api_id, user_id)=($1, $2)', [itemId, userId]);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }
}

module.exports = Album;
