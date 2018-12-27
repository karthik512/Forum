let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

let MongooseSchema = mongoose.Schema;

module.exports = {mongoose, MongooseSchema}