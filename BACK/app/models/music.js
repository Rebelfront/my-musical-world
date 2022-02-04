const client = require('../database');

class Music {

    static async getMusic(pseudo) {
        try {

            const music = await client.query('SELECT * FROM user_music WHERE pseudo=$1', [pseudo]);
            //   console.log('music', music);
            const rows = music.rows[0];
            const row1 = rows[0];
            delete rows.pseudo;




            // Object.entries(rows).forEach(entry => {
            //     let [key, value] = entry;
            //     console.log(value);
            //     if (value == [null]) {
            //         value = [];

            //     }

            // });

            // for (let row in rows) {
            //     if (row = [null]) {
            //         row = [];

            //     }

            //     console.log(typeof row)
            // };

            console.log(rows);

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