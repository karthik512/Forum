const _ = require('lodash');

const Logger = require(process.cwd() + '/common/log');
const { Thread } = require(process.cwd() + '/server/db/models/posts/Thread');
const { Reply } = require(process.cwd() + '/server/db/models/posts/Replies');

module.exports = {
    showPosts: function(req, res) {
        Logger.info(' Show Posts Called ');
        let user = req.session.user;
        let userName = user.email.split('@')[0];
        Logger.info(` User :: ${JSON.stringify(user)} - UserName :: ${userName}`);
        res.render(process.cwd() + '/client/views/home.hbs', { 
            userName,
            points: user.points,
            mainPage: 'posts/viewposts'
        });
    },

    newPost: function(req, res) {
        Logger.info(' newPost Called ');
        let user = req.session.user;
        let userName = user.email.split('@')[0];
        res.render(process.cwd() + '/client/views/home.hbs', {
            userName,
            points: user.points,
            mainPage: 'posts/newpost'
        })
    }
}