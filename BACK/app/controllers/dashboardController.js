const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Track = require('../models/Track');
const CoreModel = require('../models/coreModels'); 



module.exports = {

    AddOneItem : async (request, response) => {
// ajouter un album/artiste/chanson au dashboard
        try {
            // Je reçois la requête du front :
            const itemId = request.body.id; // vérifier quel identifiant unique on peut récupérer du body 
            const itemType = request.body.type; // le nom d la table à cibler : album, track ou artist
            // J'identifie le user qui veut ajouter l'item dans son dashboard 
            const userId = request.userId;
            // Je vérifie si l'item existe en BDD  = à faire dans les models

            if (itemType === 'album') {
                const instance = new Album (request.body);

                const album = await instance.addAlbum(userId, itemId);
             
                return response.json('Element ajouté', album);

            } else if (itemType === 'artist') {
                const instance = new Artist (request.body);

                const artist = await instance.addArtist(userId, itemId);
            
                return response.json('artiste ajouté', artist);
              

            } else if (itemType === 'track') {
                const instance = new Track (request.body);

                const track = await instance.addTrack(userId, itemId);
            
                return response.json('chanson ajoutée', track);
            }
            
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
            
        }
        
    },

    getUserItems : async (request, response) => {
//afficher/get toute la bibliotheque de l'user

    },
    
    deleteItem : async (request, response) => {
// supprimer l'association d'un item au user 

    },


    getAllItems: async (_, response) => {
        const userId=request.userId;
        const tracks = await Track.findAllByUser(userId);
        const albums = await Album.findAllByUser(userId);
        const artists = await Artist.findAllByUser(userId);
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