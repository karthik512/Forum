require(process.cwd() + '/server/config/config');

const express = require('express');
const Logger = require(process.cwd() + '/common/log');

let app = new express();

app.listen(process.env.PORT, () => {
    Logger.info(`Server started successfully on Port :: ${process.env.PORT}`);
});