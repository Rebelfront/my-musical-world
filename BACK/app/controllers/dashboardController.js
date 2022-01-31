const Artist = require('../models/artist');
const Album = require('../models/album');
const Track = require('../models/track');

// const CoreModel = require('../models/coreModels'); 



module.exports = {

     // ajouter un album/artiste/chanson au dashboard
    addOneItem: async (request, response) => {

        try {
            // Je reçois la requête du front :
            const itemId = request.body.apiId; // vérifier quel identifiant unique on peut récupérer du body 
            const itemType = request.params.type; // le nom d la table à cibler : album, track ou artist
            // J'identifie le user qui veut ajouter l'item dans son dashboard 
            const userId = request.userId;
            // const userId = request.params.id;
            // Je vérifie si l'item existe en BDD  = à faire dans les models


            if (itemType === 'album') {

                // console.log('yolo');
                console.log('dans album du controller');
                const instance = new Album(request.body);
                // console.log('instanceAlbum', instance);
                const album = await instance.addAlbum(userId, itemId);
                console.log('Album controller', album);
                return response.json('Album ajouté');

            } else if (itemType === 'artist') {
                // console.log('yolo');
                console.log('dans artist du controller');
                const instance = new Artist(request.body);
                const artist = await instance.addArtist(userId, itemId);
                //    console.log('Artist controller', artist);
                return response.json(`Artiste ${artist.name} ajouté`);

            } else if (itemType === 'track') {
                const instance = new Track(request.body);

                const track = await instance.addTrack(userId, itemId);
                return response.json(`Chanson ${track.name} ajouté`);


            }

        } catch (error) {
            console.log('error du controller');
            response.status(500).json(error.message);

        }

    },

    //afficher/get toute la bibliotheque de l'user
    getUserItems: async (request, response) => {
        
        try {
            const id = request.userId;
            const user = await User.findOne(id);
        

            
            response.json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },


    getAllItems: async (_, response) => {
        const userId = request.userId;
        const tracks = await Track.findAllByUser(userId);
        const albums = await Album.findAllByUser(userId);
        const artists = await Artist.findAllByUser(userId);
        const items = { tracks, albums, artists };
        //je ne sais pas si c'est possible de renvoyer la réponse comme ça
        response.json(items);
    },

    findOne: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const type = request.params.type;
        if (type == artist) {
            const artist = await Artist.findOne(id);
            response.json(artist);
        } else if (type == album) {

        }

    },

    deleteOneItem: async (request, response) => {
        try {
            const itemId = request.body.apiId;
            const itemType = request.params.type;
            const userId = request.userId;

            if (itemType === 'album') {
              


               const album = await Album.delete(userId, itemId);

                response.json(`l'album ${album} a été supprimé de votre discothèque`);
                // response.json(`l'album est supprmé`);

            } else if (itemType === 'artist') {

                const artist = await Artist.delete(userId, itemId);
                response.json(`l'artiste ${artist} a été supprimé de votre discothèque`);

            } else if (itemType === 'track') {

                const track = await Track.delete(userId, itemId);
                response.json(`la chanson ${track} a été supprimé de votre discothèque`);

            }

        } catch (error) {
            console.log('error du controller');
            response.status(500).json(error.message);
        }

    },

}