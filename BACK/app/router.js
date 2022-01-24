const {Router} = require ('express');

const userController = require('./controllers/userController');
// const dashboardController = require('./controllers/dashboardController');

const authentification = require ('./jsonWebToken'); 

const router = Router();


router.post('/login', authentification, userController.validLogin);
router.post('/signup', userController.validSignup);

router.get('/user/:id', userController.getUserInfos);
router.patch('/user/:id/save', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

// router.get('/dashboard/:pseudo', dashboardController.getAllItems);
// router.post('/dashboard', dashboardController.addOneItem);
// router.delete('/dashboard/:type/:id', dashboardController.deleteOneItem);



module.exports = router; 