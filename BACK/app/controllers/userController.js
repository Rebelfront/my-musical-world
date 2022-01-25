const User = require('../models/user');
const jwt = require('../services/jwt');

module.exports = {


    // Méthode pour se créer un compte : ajouter un user en bdd
    // Intégrer la méthode makeToken 
    validSignup: async (request, response) => {
        try {
            const instance = new User(request.body);
            const user = await instance.addUser();
            console.log('userconstroller', user);

            const token = jwt.makeToken(user.id);
            // const token2 = jwt.makeToken(user);
            // console.log('token', token);
            // console.log('token2', token2);

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

            const token = jwt.makeToken(user);

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
            const id = request.user.id;
            const user = await User.findOne(id);
            response.json(user);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }


    },

    // mise à jour d'un enregistrement dans la table USER
    updateUser: async (request, response) => {
        try {
            const instance = new User(request.body);
            instance.id = request.user.id;
            const user = await instance.updateUser();

            return response.status(201).json(user);

        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },



    // Supprimer un user 
    deleteUser: async (request, response) => {

        try {
            const id = request.user.id;
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

/**
validLogin: async (request, response) => {
    try {
        //checker si un user existe bien en BDD avec l'email qui a été saisi
        const user = await User.findOne({
            where: {
                email: request.body.email
            }
        });
        //si non, on engueule l'utilisateur en lui disant de vérifier sa saisie
        if (!user) { // if (user === undefined || user === null || user === 0 || user ===false || user === '')
            //on n'a trouvé aucun user enregistré avec cet email
            //on affiche une erreur et les champs saisis
            return response.render('login', {error: 'Vérifiez votre saisie', fields: request.body})
        }



        //si oui
        //on va checker que le mot de passe en clair dans le formulaire matche avec la version chiffrée stockée en BDD
        const isPwdValid = await bcrypt.compare(request.body.password, user.password)
        //si ça matche pas, on engueule l'utilisateur en lui disant de vérifier sa saisie
        if (isPwdValid === false) { // if (user === undefined || user === null || user === 0 || user ===false || user === '')
            //on n'a trouvé aucun user enregistré avec cet email
            return response.render('login', {error: 'Vérifiez votre saisie', fields: request.body})
        }
        //si ça matche, on continue
        //mise en place de la session de ce user pour faire persister le fait qu'il est connecté
        request.session.user = {
            name: user.fullname,
            email: user.email,
            role: user.role
        }

        //si remember a été coché, on donne une durée de vie de 1h à la session
        if (request.body.remember) {
            // l'utilisateur a coché la case 'se souvenir de moi'
            //on ajoute une durée de validité d'une heure à la session
            //il peut ainsi quitter son navigateur et revenir plus tard sur la page, les infos en session auront été conservées
            request.session.cookie.maxAge = 60 * 60 * 1000;
        }

        //c'est fini, on peut rediriger l'utilisateur sur la page d'accueil
        response.redirect('/');

    } catch (error) {
        response.status(500).send(error.message);
    }
},
*/