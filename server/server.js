require(process.cwd() + '/server/config/config');

const express = require('express');
let app = new express();

const fs = require('fs');
const mime = require('mime');
const hbs = require('hbs');

const routes = require('./routes');
const Logger = require(process.cwd() + '/common/log');
require(process.cwd() + '/server/middleware/Middleware')(app);

hbs.registerPartials(process.cwd() + '/client/views/partials');

hbs.registerHelper('equals', (a, b) => {
    if(a == b) {
        return true;
    }
    return false;
});

hbs.registerHelper('isSelected', (pagePath, tabName) => {
    if(pagePath == 'posts/viewposts' && tabName == 'home') {
        return 'selected';
    } else if(pagePath == 'posts/thread' && tabName == 'newThread') {
        return 'selected';
    }
    return '';
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