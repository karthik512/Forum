const _ = require('lodash');

const Logger = require(process.cwd() + '/common/log');
const { Thread } = require(process.cwd() + '/server/db/models/posts/Thread');
const { Reply } = require(process.cwd() + '/server/db/models/posts/Replies');

module.exports = {
    showPosts: function(req, res) {
        Logger.info(' Show Posts Called ');
        res.render(process.cwd() + '/client/views/common/status.hbs', {
            heading: 'Success',
            message: 'You have logged in successfully'
        })
    }
}