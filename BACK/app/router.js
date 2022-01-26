const {Router} = require ('express');

const userController = require('./controllers/userController');
// const dashboardController = require('./controllers/dashboardController');

const authentification = require ('./middlewares/jsonWebToken'); 

const userSchema = require('./schemas/userSchema');
const {validateBody} = require('./middlewares/Validation');

const router = Router();

router.post('/login', userController.validLogin);
router.post('/signup', validateBody(userSchema), userController.validSignup);


// TODO : Mettre en place verifyToken sur le MW, et supprimer le ":id" des routes (car plus besoin), modifier en conséquence le model
router.get('/user', authentification, userController.getUserInfos);
router.patch('/user',authentification, validateBody(userSchema), userController.updateUser);
router.delete('/user',authentification, userController.deleteUser);

// router.get('/dashboard/:pseudo', dashboardController.getAllItems);
// router.post('/dashboard', dashboardController.addOneItem);
// router.delete('/dashboard/:type/:id', dashboardController.deleteOneItem);

module.exports = router; 