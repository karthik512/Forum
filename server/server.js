require(process.cwd() + '/server/config/config');

const express = require('express');
const hbs = require('hbs');

const Logger = require(process.cwd() + '/common/log');

let app = new express();

app.set('view-engine', 'hbs');
app.use('*/css', express.static(process.cwd() + '/client/css'));
app.use('*/js', express.static(process.cwd() + '/client/js'));


app.get('/', (req, res) => {
    return res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render(process.cwd() + '/client/views/login.hbs');
});

app.listen(process.env.PORT, () => {
    Logger.info(`Server started successfully on Port :: ${process.env.PORT}`);
});