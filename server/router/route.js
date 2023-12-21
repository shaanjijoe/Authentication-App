const { Router } = require('express')
const router = Router();
const controller = require('../controllers/appController');


// POST Method
router.route('/register').post(controller.register)
// router.route('/registermail').post();
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(controller.login);

// GET Method
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);


// PUT method
router.route('/updateuser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);










module.exports = router;