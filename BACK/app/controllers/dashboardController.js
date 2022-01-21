// const Artist = require('../models/Artist');
// const Album = require('../models/Album');
// const Track = require('../models/Track');



module.exports = {


    getAllItems: async (_, response) => {
        const tracks = await Track.findAll();
        const albums = await Album.findAll();
        const artists = await Artist.findAll();
        const items = {tracks, albums, artists};
        //je ne sais pas si c'est possible de renvoyer la réponse comme ça
        response.json(items);
    },

    findOne: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const type = request.params.type;
        if (type == artist) {
            const artist = await Artist.findOne(id);
        response.json(artist);
        } else if (type == album){

        }
        
    },

    addOneItem: async (request, response) => {
        try {
            const instance = new Item(request.body).save();
            if (phrase) {
                //si la phrase existe on fait un insert, on créé une nouvelle phrase
                return response.status(201).json(phrase);
            }
            //sinon on update la phrase existante
            response.status(204).json('phrase ajoutée')

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },

    deleteOneItem: async (request, response) => {
        try {
            const id = parseInt(request.params.id, 10);
            const type = request.params.type;
            await Item.delete(+request.params.id);
            response.status(204).json('item supprimé');
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}