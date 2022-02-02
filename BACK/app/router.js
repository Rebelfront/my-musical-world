const { Router } = require('express');
const userController = require('./controllers/userController');
const dashboardController = require('./controllers/dashboardController');
const authentification = require('./middlewares/jsonWebToken');

const userSchema = require('./schemas/userSchema');
const { validateBody } = require('./middlewares/Validation');

const router = Router();

/**
 * POST /login
 * @summary Responds with the user token in the header
 * @route POST /login
 * @tags Login
 * @returns {object} 200 - success response - application/json
 * @returns {String} 500 - Internal Server Error 
 */
router.post('/login', userController.validLogin);

/**
 * POST /signup
 * @summary Responds with the newly created User object
 * @route POST /signup
 * @tags SignUp
 * @returns {object} 201 - creation response - application/json
 * @returns {String} 500 - Internal Server Error 
 */
router.post('/signup', validateBody(userSchema), userController.validSignup);

/**
 * GET /user
 * @summary Responds with one User from the database
 * @route GET /user
 * @tags User
 * @security JWT middleware
 * @returns {object} 200 - success response - application/json
 * @returns {String} 500 - Internal Server Error 
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
 * @returns {String} 500 - Internal Server Error 
 */
router.delete('/user', authentification, userController.deleteUser);

router.get('/dashboard/:pseudo', dashboardController.getUserItems);
router.get('/dashboard', authentification, dashboardController.getUserItems);
router.post('/dashboard/:type', authentification, dashboardController.addOneItem);
router.delete('/dashboard/:type', authentification, dashboardController.deleteOneItem);

module.exports = router;