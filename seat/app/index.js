var koa = require('koa');
var co = require('co');
var middlewares = require('koa-middlewares');
var view = require('koa-views');
var routes = require('./routes');
var path = require('path');
var ejs = require('ejs');

var app = koa();

co(function *() {

  app.use(middlewares.favicon(path.join(__dirname, './public/favicon.ico')));

  app.use(view(path.join(__dirname, './view'), {
    map: {
      html: 'ejs'
    }
  }));

  app.use(middlewares.router(app));

  routes(app);

  app.listen(8080);

  console.log('server ready');

}).catch(function (e) {
  console.err(e.stack);
});
