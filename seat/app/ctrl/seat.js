var getSeats = require('../dao/seat').getSeats;
var reload = require('../dao/seat').reload;

exports.entry = function *() {
  yield this.render('main');
};

exports.take = function *() {
  var seat;
  var seats = getSeats();
  if (seats.length <= 0) {
    return this.body = {
      status: -2,
      message: 'no more',
      data: {}
    };
  }
  seat = seats.pop();
  this.body = {
    status: 0,
    message: 'ok',
    data: {
      seat: seat
    }
  };
};

exports.all = function *() {
  yield this.render('all', {seats: getSeats()});
};

exports.reload = function *() {
  reload();
  this.body = {
    status: 0,
    message: 'ok'
  };
};