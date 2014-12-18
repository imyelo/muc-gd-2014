WeixinApi.ready(function (api) {
  var data = {
    "appId": "",
    "imgUrl": "http://muc2014.lab4310.com/public/image/icon.png",
    "link": window.location.href,
    "desc": "MUC GD 2014",
    "title": "我正在参加 MUC-2014-广东校友会"
  };

  var callbacks = {
  };

  api.shareToFriend(data, callbacks);
  api.shareToTimeLine(data, callbacks);
  api.shareToWeibo(data, callbacks);
});