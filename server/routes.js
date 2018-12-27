let express = require('express');
let userController = require(process.cwd() + '/server/controllers/UserController');
let postsController = require(process.cwd() + '/server/controllers/PostsController');

const { sessionChecker, nonSessionChecker } = require(process.cwd() + '/server/middleware/SessionChecker');

let router = express.Router();

router.route('/').get(nonSessionChecker, userController.showLogin);
router.route('/login').get(nonSessionChecker, userController.showLogin);
router.route('/register').get(nonSessionChecker, userController.showRegister);

//Users
router.route('/user').post(nonSessionChecker, userController.addNewUser);
router.route('/user/login').post(nonSessionChecker, userController.authenticate);

//Posts - Threads
router.route('/posts').get(sessionChecker, postsController.showPosts);

module.exports = router;