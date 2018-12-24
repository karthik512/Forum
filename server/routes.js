let express = require('express');
let userController = require(process.cwd() + '/server/controllers/UserController');

let router = express.Router();

router.route('/').get(userController.login);
router.route('/login').get(userController.login);
router.route('/register').get(userController.register);

//Users
router.route('/user').post(userController.addNewUser);

module.exports = router;