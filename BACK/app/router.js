const { Router } = require('express');
const userController = require('./controllers/userController');
const dashboardController = require('./controllers/dashboardController');
const authentification = require('./middlewares/jsonWebToken');

const userSchema = require('./schemas/userSchema');
const { validateBody } = require('./middlewares/Validation');
const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('./models/user');

const router = Router();




/**
 * Expected json object in request.body for signup
 * @typedef {object} SignUpPostJson
 * @property {string} mail
 * @property {string} lastname
 * @property {string} firstname
 * @property {string} pseudo
 * @property {string} password
 */

/**
 * POST /signup
 * @summary Responds with the newly created User object
 * @route POST /signup
 * @tags User
 * @param {SignUpPostJson} request.body.required Post infos to add in database
 * @param {JWT}
 * @returns {object} 201 - creation response - application/json
 * @returns {string} 500 - Internal Server Error 
 */
 router.post('/signup', validateBody(userSchema), userController.validSignup);

/**
 * Expected json object in request.body for login
 * @typedef {object} LoginPostJson
 * @property {string} mail
 * @property {string} password
 */

/**
 * POST /login
 * @summary Responds with the user token in the header
 * @route POST /login
 * @tags User
 * @param {LoginPostJson} request.body.required Post infos to add in database
 * @returns {object} 200 - success response - application/json
 * @returns {string} 500 - Internal Server Error 
 */
router.post('/login', userController.validLogin);




/**
 * GET /user
 * @summary Responds with one User from the database
 * @route GET /user
 * @tags User
 * @security BearerAuth
 * @returns {object} 200 - success response - application/json
 * @returns {error} 500 - Internal Server Error 
 */
router.get('/user', authentification, userController.getUserInfos);

/**
 * PATCH /user
 * @summary Responds
 * @route PATCH /user
 * @tags User
 * @security BearerAuth 
 * @returns {object} 200 - success response - application/json
 * @returns {error} 500 - Internal Server Error  
 */
router.patch('/user', authentification, validateBody(userSchema), userController.updateUser);


/**
 * DELETE /user
 * @summary Delete a user in the database
 * @route DELETE /user
 * @tags User
 * @security BearerAuth
 * @returns {object} 200 - success response - application/json
 * @returns {string} 500 - Internal Server Error 
 */
router.delete('/user', authentification, userController.deleteUser);


/**
 * GET dashboard/{pseudo}
 * @summary Get a user's shared dashboard 
 * @route GET /dashboard/{pseudo}
 * @tags Dashboard
 * @param {string} pseudo.path.required The user's pseudo of the items to fetch
 * @returns {object} 200 - success response - application/json
 * @returns {string} 500 - Internal Server Error 
 */
router.get('/dashboard/:pseudo', dashboardController.getUserItems);




/**
 * Expected json object in request.body for post type = album
 * @typedef {object} postAlbum
 * @property {string} name
 * @property {string} genre
 * @property {string} artist
 * @property {number} year
 * @property {string} urlImage - can be empty
 * @property {number} apiId
 */

/**
 * Expected json object in request.body for for post type = artist
 * @typedef {object} postArtist
 * @property {string} name (Beatles)
 * @property {string} urlImage - can be empty
 * @property {number} apiId 
 */

/**
 * Expected json object in request.body for for post type = track
 * @typedef {object} postTrack
 * @property {string} mail
 * @property {string} lastname
 * @property {string} firstname
 * @property {string} pseudo
 * @property {string} password
 */

/**
 * GET /dashboard
 * @summary Get a connected user's dashboard content
 * @route GET /dashboard
 * @tags Dashboard
 * @security BearerAuth
 * @returns {object} 200 - success response - application/json
 * @returns {string} 500 - Internal Server Error 
 */
router.get('/dashboard', authentification, dashboardController.getUserItems);

/**
 * POST /dashboard/{type}
 * @summary Post a new item in the user's dashboard
 * @route POST /dashboard/{type}
 * @tags Dashboard
 * @param {string} request.params.type - le type d'item  
 * @param {object} request.body - l'objet à ajouter au format json
 * @example request.body - [{
        "name": "Abbey Road (Remastered)",
        "genre": "rock",
        "artist": "The Beatles",
        "year": "2015",
        "urlImage": "https://e-cdns-images.dzcdn.net/images/cover/aa94ab293730bb7845d2aa8c672b2c29/1000x1000-000000-80-0-0.jpg",
        "apiId": 12047952
    }]
 * @security BearerAuth
 * @returns {object} 200 - success response - application/json
 * @returns {string} 500 - Internal Server Error 
 */
router.post('/dashboard/:type', authentification, dashboardController.addOneItem);

/**
 * DELETE /dashboard/{type}
 * @summary Delete items from the user's librairy 
 * @route DELETE /dashboard/{type}
 * @tags Dashboard
 * @param {string} request.params.type - le type d'item 
 * @param {number} request.body.apiId - l'id de l'item à supprimer
 * @security BearerAuth
 * @returns {object} 200 - success response - application/json
 * @returns {string} 500 - Internal Server Error 
 */
router.delete('/dashboard/:type', authentification, dashboardController.deleteOneItem);

module.exports = router;