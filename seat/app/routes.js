var seat = require('./ctrl/seat');

module.exports = function router (app) {
  app.get('/', function *() {
    this.redirect('/entry/a');
  });

  app.get('/entry/:group', seat.entry);
  app.post('/entry/:group', seat.take);

  app.get('/all', seat.all);
  app.post('/reload', seat.reload);

  app.get('/ticket/:id', seat.one);
};