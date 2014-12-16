$(function () {

  var $box = $('.box');
  var $ticket = $('.ticket');
  var $seat = $('.seat');
  var $button = $('.button');
  var $fingerprint = $('.fingerprint');
  var $stamp = $('<img class="stamp animated fadeIn" src="/public/image/stamp.png">');

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
    return getRandomString(all.tables) + '-' + getRandomString(all.numbers);
  };

  var reload = window.reload = function () {
    var $clone = $ticket.clone().appendTo($box).addClass('animated fadeOutRight');
    $ticket.find('.stamp').remove();
    $seat.text('X-0');
    setTimeout(function () {
      $clone.remove();
    }, 2000);
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
    $seat.text('X-0');
    $fingerprint.removeClass('animated infinite breath');
    lock = true;

    NProgress.start();
    reload();

    function end (msg) {
      NProgress.done();
      $ticket.prepend($stamp.clone());
      setTimeout(function () {
        $fingerprint.addClass('animated infinite breath');
        lock = false;
      }, 1200);
      if (msg) {
        alert(msg);
      }
    };

    $.ajax({
      url: '/',
      type: 'post',
      complete: function () {
      },
      success: function (res) {
        if (!res) {
          return end('network error');
        }
        if (res.status < 0 || !res.data || !res.data.seat) {
          return end(res.message || 'error');
        }
        repeat(function () {
          $seat.text(getRandomSeat());
          NProgress.inc(0.01);
        }, 50, 30, function () {
          $seat.text(res.data.seat);
          end();
        });
      },
      error: function () {
        end('network error');
      }
    });

  });

});