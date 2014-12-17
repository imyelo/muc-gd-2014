var seat = require('./ctrl/seat');

module.exports = function router (app) {
  app.get('/', seat.entry);
  app.post('/', seat.take);

  app.get('/all', seat.all);
  app.post('/reload', seat.reload);
};