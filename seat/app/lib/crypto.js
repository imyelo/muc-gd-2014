var DIGIT = 35;
var RATIO = 3;

exports.encrypt = function (str) {
  var result = [];

  str.split('').forEach(function (s) {
    result.push((s.charCodeAt(0) * RATIO).toString(DIGIT));
  });

  return result.join('-');
};

exports.decrypt = function (str) {
  var result = [];

  str.split('-').forEach(function (s) {
    result.push(String.fromCharCode(parseInt(s, DIGIT) / RATIO));
  });

  return result.join('');
};