require(process.cwd() + '/server/config/config');

const express = require('express');
const fs = require('fs');
const mime = require('mime');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const routes = require('./routes');
const Logger = require(process.cwd() + '/common/log');

let app = new express();

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

app.use((req, res, next) => {
    if(req.cookies.ForumSessionCookie && !req.session.user) {
        res.clearCookie('ForumSessionCookie');
    }
    next();
});

app.get('*.(js|css)', (req, res) => {
    let pathName = req.path;
    let script = fs.readFileSync(process.cwd() + '/' + pathName, 'utf-8');
    res.setHeader("Content-Type", mime.getType(process.cwd() + '/' + pathName));
    res.send(script);
});

app.use('/', routes);

app.listen(process.env.PORT, () => {
    Logger.info(`Server started successfully on Port :: ${process.env.PORT}`);
});