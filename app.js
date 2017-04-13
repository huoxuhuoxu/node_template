var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = require('./routes');

var CleanCache = require('./tools/updateModulePro').CleanCache;

var handlebars = require("express3-handlebars").create({
	 defaultLayout: "main"
	,extname: '.handlebars'
});

var app = express();
app.engine("handlebars", handlebars.engine);
app.set("view engine", 'handlebars');

// 日志输出格式配置,日志存储由pm2负责
logger.token("from", function(req, res){
	return req.query.from || '-';
});
logger.format('magician', '[magician] :method :url :status :from');

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('magician'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态资源代理,之后交给nginx
app.use(express.static(path.join(__dirname, 'public')));

// 正常路由处理
app.use(function(req, res, next){
  if(req.url == '/favicon.ico'){
    res.end();
  }else{
    router(req, res, next); 
  };
});
// 监听总路由/接口文件 发生变化,清除缓存重载模块
fs.watch(require.resolve('./routes'), function(){
  CleanCache(require.resolve('./routes'));
  try{
      router = require("./routes");
  }catch(err){
      console.error("routes update failed");
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {status: err.status, title:"出错咯"});
});

module.exports = app;


