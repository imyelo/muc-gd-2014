var seats = require('../dao/seat');

exports.get = function *() {
  var seat;
  if (seats.length <= 0) {
    return this.body = 'no more';
  }
  seat = seats.pop();
  console.log(seat);
  yield this.render('main', {
    seat: seat
  });
};