WeixinApi.ready(function (Api) {
  var data = {
    "appId": "",
    "imgUrl": "http://muc.lab4310.com/public/image/icon.png",
    "link": window.location.href,
    "desc": "MUC GD 2014",
    "title": "我正在参加 MUC-2014-广东校友会"
  };

  var callbacks = {
  };

  APi.shareToFriend(data, callbacks);
  APi.shareToTimeLine(data, callbacks);
  APi.shareToWeibo(data, callbacks);
});