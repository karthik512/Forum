const _ = require('lodash');

const Logger = require(process.cwd() + '/common/log');
const { User } = require(process.cwd() + '/server/db/models/user/User');

module.exports = {
    showLogin: function(req, res) {
        res.render(process.cwd() + '/client/views/login.hbs');
    },

    showRegister: function(req, res) {
        res.render(process.cwd() + '/client/views/register.hbs');
    },

    authenticate: function(req, res) {
        let body = _.pick(req.body, ['email', 'password']);

        User.findByCredentials(body.email, body.password).then((user) => {
            Logger.info(` User Authentication Success :: ${JSON.stringify(user.toJSON())}`);
            req.session.user = user.toJSON();
            res.redirect('/posts');
        }).catch((e) => {
            Logger.error(` User Authentication Failed :: ${JSON.stringify(e)}`);
            res.render(process.cwd() + '/client/views/login.hbs', e);
        });
    },

    addNewUser: function(req, res) {
        let body = _.pick(req.body, ['email', 'password']);
        let user = new User(body);

        user.save().then(() => {
            Logger.info(` User Created Successfully :: ${user}`);
            res.render(process.cwd() + '/client/views/common/status.hbs',{
                heading: 'Success',
                message: `Successfully registered ${user.email}`
            });
        }).catch((e) => {
            Logger.info(` User Creation Failed :: ${e}`);
            res.render(process.cwd() + '/client/views/common/status.hbs', {
                heading: 'Failure',
                message: `Failed to register ${user.email}.`
            })
        });
    }
}