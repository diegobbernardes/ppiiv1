const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/anapps', { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;