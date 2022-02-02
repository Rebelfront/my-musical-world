const client = require('../database');

class Music {

    static async getMusic(pseudo) {
        try {

            const music = await client.query('SELECT * FROM user_music WHERE pseudo=$1', [pseudo]);
            //   console.log('music', music);
            console.log('musicrows', music.rows[0].artists);

            // return rows.map(row => new Music(row));
            return music.rows[0];

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }
    }





};


module.exports = Music;