const client = require('../database');

class Music {

<<<<<<< HEAD
    static async getMusic(pseudo) {
        try {

            const music = await client.query('SELECT * FROM user_music WHERE pseudo=$1', [pseudo]);

=======

    static async getMusic(pseudo) {
        try {

            const music = await client.query('SELECT * FROM user_music WHERE pseudo=$1', [pseudo]);



>>>>>>> develop
            if (music.rows[0].artists[0] === null) {
                music.rows[0].artists = [];
            }

            if (music.rows[0].tracks[0] === null) {
                music.rows[0].tracks = [];
            }

            if (music.rows[0].albums[0] === null) {
                music.rows[0].albums = [];
            }

            return music.rows[0];

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }
    }





<<<<<<< HEAD
=======

>>>>>>> develop
};


module.exports = Music;