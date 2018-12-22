let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MOGODB_URI);

module.exports = {mongoose}