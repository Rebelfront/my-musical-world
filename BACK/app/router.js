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
 * @security JWT middleware
 * @param {security} userId.path.requested
 * @returns {User} 200 - success response - application/json
 * @returns {error} 500 - Internal Server Error 
 */
router.get('/user', authentification, userController.getUserInfos);

/**
 * PATCH /user
 * @summary Responds
 * @route PATCH /user
 * @tags User
 * @security JWT middleware
 */
router.patch('/user', authentification, validateBody(userSchema), userController.updateUser);


/**
 * DELETE /user
 * @summary Delete a user in the database
 * @route DELETE /user
 * @tags User
 * @security JWT middleware
 * @returns {object} 200 - success response - application/json
 * @returns {string} 500 - Internal Server Error 
 */
router.delete('/user', authentification, userController.deleteUser);


/**
 * GET dashboard/{pseudo}
 * @route GET /dashboard/{pseudo}
 * @tags Dashboard
 * @param {string} pseudo.path.required The user's pseudo of the albumms, artists and tracks to fetch
 * 
 */
router.get('/dashboard/:pseudo', dashboardController.getUserItems);




router.get('/dashboard', authentification, dashboardController.getUserItems);
router.post('/dashboard/:type', authentification, dashboardController.addOneItem);
router.delete('/dashboard/:type', authentification, dashboardController.deleteOneItem);

module.exports = router;