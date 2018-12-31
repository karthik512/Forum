const _ = require('lodash');

const Logger = require(process.cwd() + '/common/log');
const { Thread } = require(process.cwd() + '/server/db/models/posts/Thread');
const { Reply } = require(process.cwd() + '/server/db/models/posts/Replies');

module.exports = {
    showPosts: function(req, res) {
        Logger.info(' Show Posts Called ');
        res.render(process.cwd() + '/client/views/home.hbs', { 
            mainPage: 'posts/viewposts'
        });
    },

    newPost: function(req, res) {
        Logger.info(' newPost Called ');
        res.render(process.cwd() + '/client/views/home.hbs', {
            mainPage: 'posts/thread',
            showTitle: true
        })
    },

    addNewThread: function(req, res) {
        let body = _.pick(req.body, ['title', 'description']);
        let newThread = new Thread({
            "user_id": req.session.user._id,
            "subject": body.title,
            "content": body.description,
            "meta.upvotes": 0
        });
        Logger.info(` NewThread :: ${newThread}`);

        newThread.save().then(() => {
            Logger.info(` Successfully added new thread :: ${newThread}`);
            res.render(process.cwd() + '/client/views/home.hbs', {
                mainPage: 'posts/thread',
                showTitle: true
            });
        }).catch(e => {
            Logger.error(` Error while adding new thread :: ${e}`);
            res.render(process.cwd() + '/client/views/home.hbs', {
                mainPage: 'posts/thread',
                showTitle: true,
                title: body.title,
                description: body.description,
                error: e
            });
        })
    }
}