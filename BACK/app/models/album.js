const db = require('../database');

class Album {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        try {
            const { rows } = await db.query('SELECT * FROM album');
            return rows.map(row => new Album(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    static async findOne(id) {
        try {
            const { rows } = await db.query('SELECT * FROM album WHERE id=$1', [id]);
            if (rows[0]) {
                return new Album(rows[0]);
            }
            return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

  

    async addAlbum(userId, itemId) {

        try {
            const checkAlbum = await client.query(`SELECT * FROM "ALBUM" WHERE api_id=$1`, [itemId]);

            if (!checkAlbum.rows[0]) { 

                const { rows } = await client.query('INSERT INTO "ALBUM"(name, genre, artist, year, url_image, api_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', [this.name, this.genre, this.artist, this.year, this.url_image, this.api_id]);
 
                 this.id = rows[0].id;
                 itemId = this.api_id; 
                 return this;
            
            }

            await client.query('INSERT INTO "USER_LIKES_ALBUM" (album_id, user_id) VALUES ($1, $2)', [this.id, userId]);
            return response.json('album model ok');


        } catch (error) {
    
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }

    }


    static async findAllByUser(id) {
        try {
            const { rows } = await db.query('SELECT tracks, artists, albums FROM userTracksAlbumsArtists WHERE id=$1');
            return rows.map(row => new Track(row));
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
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

module.exports = Album;
