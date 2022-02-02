const User = require('../models/user');
const jwt = require('../services/jwt');


module.exports = {


    // Méthode pour se créer un compte : ajouter un user en bdd
    // Intégrer la méthode makeToken 
    validSignup: async (request, response) => {
        try {
            const mail = request.body.mail;
            const password = request.body.password;
            const pseudo = request.body.pseudo;
           
                const instance = new User(request.body);
                const user = await instance.addUser(mail, pseudo, password);
                console.log('userconstroller', user.id);

                const token = jwt.makeToken(user.id);

                return response.setHeader('Authorization', 'Bearer ' + token).status(201).json(user);
       

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }

    },

    // Pour se connecter : retrouver un user enregistré en bdd à partir de son mail
    // TODO : intégrer la méthode makeToken 
    validLogin: async (request, response) => {
        try {
            const mail = request.body.mail;
            const password = request.body.password;
            const user = await User.findByMail(mail, password);

            const token = jwt.makeToken(user.id);

            return response.setHeader('Authorization', 'Bearer ' + token).status(200).json(user);

            //    return response.status(200).json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }


    },

    // récupérer un user en bdd 
    getUserInfos: async (request, response) => {
        try {
            const id = request.userId;
            console.log('request', id);
            const user = await User.findOne(id);
            console.log('user', user);
            response.json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }


    },

    // mise à jour d'un enregistrement dans la table USER
    updateUser: async (request, response) => {
        try {
            const newPwd = request.body.password;
            const instance = new User(request.body);
            // la fonction SQl update_user selectionne le user par son id :
            instance.id = request.userId;
            const user = await instance.updateUser(newPwd);
            return response.status(201).json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

    // Supprimer un user 
    deleteUser: async (request, response) => {

        try {
            const id = request.userId;
            await User.delete(id);

            response.json(`user with id ${id} is deleted`);


            // const password = request.body.password;
            // console.log(password);
            // if (password === undefined) {
            //     console.log('This password doesn\'t exists');
            // } else {
            //     const id = request.user.id;
            //     await User.delete(id, password);

            //     response.json(`user with id ${id} is deleted`);
            // }
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }


    }

}



