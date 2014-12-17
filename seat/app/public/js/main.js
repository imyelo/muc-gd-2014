$(function () {

  var $box = $('.box');
  var $ticket = $('.ticket');
  var $seat = $('.seat');
  var $button = $('.button');
  var $fingerprint = $('.fingerprint');
  var $stamp = $('<img class="stamp half animated signing" src="/public/image/stamp-x2.png">');

  var MSG = {
    DEFAULT_ERROR: '服务器遇到了一个未知的错误，请由工作人员代理安排座位',
    SERVER_ERROR: '服务器状态不稳定，请由工作人员代理安排座位',
    NETWORK_ERROR: '请求异常咯, 请检查网络状态',
    NO_MORE: '系统预设门票已被领完，请由工作人员代理安排座位'
  };

  var lock = false;

  var all = {
    tables: 'ABCDEFGHIJKLMNOPQRSTUVXWYZ',
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
    var $clone = $ticket.clone().appendTo($box);
    // 优化动画
    setTimeout(function () {
      $clone.addClass('animated taking');
    }, 0);
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
    $fingerprint.removeClass('animated infinite breathing');
    lock = true;

    NProgress.start();
    reload();

    function end (msg) {
      NProgress.done();
      $ticket.prepend($stamp.clone());
      setTimeout(function () {
        $fingerprint.addClass('animated infinite breathing');
        lock = false;
      }, 1600);
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
          return end(MSG.SERVER_ERROR);
        }
        if (res.status === -2) {
          return end(MSG.NO_MORE);
        }
        if (res.status < 0 || !res.data || !res.data.seat) {
          return end(res.message || MSG.DEFAULT_ERROR);
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
        end(MSG.NETWORK_ERROR);
      }
    });

  });

});