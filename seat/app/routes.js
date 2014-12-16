var seat = require('./ctrl/seat');

module.exports = function router (app) {
  app.get('/', seat.get);
};