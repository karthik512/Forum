const _ = require('lodash');

const Logger = require(process.cwd() + '/common/log');
const {User} = require(process.cwd() + '/server/db/models/user/User');

module.exports = {
    login: function(req, res) {
        res.render(process.cwd() + '/client/views/login.hbs');
    },

    register: function(req, res) {
        res.render(process.cwd() + '/client/views/register.hbs');
    },

    addNewUser: function(req, res) {
        let body = _.pick(req.body, ['email', 'password']);
        let user = new User(body);

        user.save().then(() => {
            Logger.info(` User Created Successfully :: ${user}`);
        }).catch((e) => {
            Logger.info(` User Creation Failed :: ${e}`);
        });
    }
}