const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');
import bluebird from 'bluebird';

mongoose.connect(config.db, { useMongoClient: true });
mongoose.Promise = bluebird;
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
const app = require('./config/express')(express(), config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

module.exports = app; // for testing
