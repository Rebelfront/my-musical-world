const User = require('../models/user');

module.exports = {



    validSignup: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const user = await User.findOne(id);
        response.json(user);
    },

    displayLogin: async () => {

    },

    getUserInfos: async () => {

    },

    updateUserInfos: async () => {

    },

    deleteUser: async () => {

    }

}