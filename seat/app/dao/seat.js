var _ = require('underscore');

var seats = (function seatGenerator() {
  var tables = 'ABCDEFGH'.split('');
  var numbers = '12345678'.split('');

  var seats = [];
  tables.forEach(function (table) {
    numbers.forEach(function (number) {
      seats.push(table + number);
    });
  });

  return seats;
})();

seats = _.shuffle(seats);

module.exports = seats;