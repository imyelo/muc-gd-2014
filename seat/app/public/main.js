$(function () {

  var $h = $('h1');
  var $button = $('button');

  var lock = false;

  var all = {
    tables: 'ABCDEFGH',
    numbers: '1234567890'
  };

  var random = function (max) {
    return Math.floor(Math.random() * max);
  };

  var getRandomString = function (str) {
    return str[random(str.length)];
  };

  var getRandomSeat = function () {
    return getRandomString(all.tables) + getRandomString(all.numbers);
  };

  var repeat = function (func, duration, times, callback) {
    var now = 0;
    var play = function () {
      setTimeout(function () {
        func();
        if (++now < times) {
          play();
        } else {
          callback();
        }
      }, duration);
    };
    play();
  };

  $button.on('click', function () {
    if (lock) {
      return;
    }
    $h.text('--');
    $button.attr('disabled', 'disabled');
    lock = true;

    NProgress.start();

    function end (msg) {
      NProgress.done();
      $button.attr('disabled', null);
      if (msg) {
        alert(msg);
      }
    };

    $.ajax({
      url: '/',
      type: 'post',
      complete: function () {
        setTimeout(function () {
          lock = false;
        }, 200);
      },
      success: function (res) {
        if (!res) {
          return end('network error');
        }
        if (res.status < 0 || !res.data || !res.data.seat) {
          return end(res.message || 'error');
        }
        repeat(function () {
          $h.text(getRandomSeat());
          NProgress.inc(0.01);
        }, 50, 30, function () {
          $h.text(res.data.seat);
          end();
        });
      },
      error: function () {
        end('network error');
      }
    });

  });

});