const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports = function(app) {
    
    //Use body-parser to parse parameters from req object...
    app.use(bodyParser.urlencoded());

    //Use cookie-parser to access the cookies stored in the browser...
    app.use(cookieParser());

    //Initialize the express session...
    app.use(session({
        key: 'ForumSessionCookie',
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }));

    //When session is destroyed
    app.use((req, res, next) => {
        if(req.cookies.ForumSessionCookie && !req.session.user) {
            res.clearCookie('ForumSessionCookie');
        }
        next();    
    });

    app.use((req, res, next) => {
        if(req.session.user) {
            let user = req.session.user;

            res.locals = {
                userName: user.email.split('@')[0],
                points: user.points
            }
        }
        next();
    });
}