const { Router } = require('express')
const router = Router();
const controller = require('../controllers/appController');
const middleware = require('../middleware/auth')


// POST Method
router.route('/register').post(controller.register)
// router.route('/registermail').post();
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(controller.verifyUser,controller.login);

// GET Method
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser, middleware.localVariables,controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);


// PUT method
router.route('/updateuser').put(middleware.Auth, controller.updateUser);
router.route('/resetPassword').put(controller.verifyUser,controller.resetPassword);










module.exports = router;