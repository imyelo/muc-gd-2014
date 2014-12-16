var koa = require('koa');
var middlewares = require('koa-middlewares');

var app = koa();

app.use(middlewares.router(app));

app.get('/', function *() {
  this.body = '123';
});

app.listen(8080);