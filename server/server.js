require(process.cwd() + '/server/config/config');

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const mime = require('mime');
const bodyParser = require('body-parser');

const routes = require('./routes');
const Logger = require(process.cwd() + '/common/log');

let app = new express();

app.use(bodyParser.urlencoded());

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