const User = require('../models/user');

module.exports = {


    // Méthode pour se créer un compte : ajouter un user en bdd
    validSignup: async (request, response) => {
        try {
            const instance = new User(request.body);
            const user = await instance.addUser();
          console.log('userconstroller', user);
            return response.status(201).json(user);
       
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
       
    },

    // Pour se connecter : retrouver un user enregistré en bdd
    // TODO 
    displayLogin: async () => {

    },

    // récupérer un user en bdd 
    getUserInfos: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const user = await User.findOne(id);
        response.json(user);

    },

    // mise à jour d'un enregistrement dans la table USER
    updateUser: async (request, response) => {
        try {
            const instance = new User(request.body);
            const user = await instance.updateUser();
          
            return response.status(201).json(user);
       
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

    

    // Supprimer un user 
    deleteUser: async () => {

    }

}