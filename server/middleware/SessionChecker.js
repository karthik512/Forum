const Logger = require(process.cwd() + '/common/log');

//Continues with the current req if user has session or redirects to login...
var sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.ForumSessionCookie) {
        Logger.info('User is Logged in');
        next();
    } else {
        Logger.error('User is not logged in');
        res.redirect('/login');
    }
}

//Continues with current req if user does not have session or redirects to posts...
var nonSessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.ForumSessionCookie) {
        Logger.info('User is logged in');
        res.redirect('/posts');
    } else {
        Logger.error(' User is not logged in');
        next();
    }
}

module.exports = { sessionChecker, nonSessionChecker };