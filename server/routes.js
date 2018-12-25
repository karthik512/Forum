let express = require('express');
let userController = require(process.cwd() + '/server/controllers/UserController');

let router = express.Router();

router.route('/').get(userController.showLogin);
router.route('/login').get(userController.showLogin);
router.route('/register').get(userController.showRegister);

//Users
router.route('/user').post(userController.addNewUser);
router.route('/user/login').post(userController.authenticate);

module.exports = router;