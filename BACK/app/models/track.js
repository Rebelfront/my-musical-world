const db = require('../database');

class Track {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    async addTrack(userId, itemId) {

        try {
            const checkTrack = await client.query ('SELECT * FROM "TRACK" WHERE id = $1', [itemId]);
            if (!checkTrack) {
                const {rows} = await client.query('INSERT INTO "TRACK" (name, genre, artist, year, album, url_image, api_id, url_sample) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
                [this.name, this.genre, this.artist, this.year, this.album, this.url_image, this.api_id, this.url_sample]);
                this.id = rows[0].id;
                return this;
            }
            // J'associe le track au user
             const usersTrack = await client.query ('INSERT INTO USER_LIKES_TRACK (track_id, user_id) RETURNING id VALUES ($1, $2)', [itemId, userId])
            return usersTrack;
            
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


module.exports = Track;