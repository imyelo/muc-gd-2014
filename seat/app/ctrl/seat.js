var seats = require('../dao/seat');

exports.entry = function *() {
  yield this.render('main');
};

exports.take = function *() {
  var seat;
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
    };
  };
};