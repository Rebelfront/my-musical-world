const User = require('../models/user');

module.exports = {



    validSignup: async (request, response) => {
       
    },

    displayLogin: async () => {

    },

    getUserInfos: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const user = await User.findOne(id);
        response.json(user);

    },

    updateUserInfos: async () => {

    },

    deleteUser: async () => {

    }

}