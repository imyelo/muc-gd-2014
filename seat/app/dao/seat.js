var _ = require('underscore');

var seats;

function seatGenerator(tables, numbers) {
  var seats = [];
  tables.forEach(function (table) {
    numbers.forEach(function (number) {
      seats.push(table + '-' + number);
    });
  });

  return _.shuffle(seats);
}

function reload() {
  seats = {
    a: seatGenerator('ABC'.split(''), '123456789'.split('')),
    b: seatGenerator('DEFGHIJKLMNOPQR'.split(''), '123456789'.split(''))
  };
}

reload();

exports.reload = reload;
exports.getSeats = function () {
  return seats;
};
