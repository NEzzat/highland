var express = require('express');
//var db = require('./model/db');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require('client-sessions')
var fs = require('fs');
var routes = require('./routes/index');
var contact = require('./routes/contact');
var item = require('./routes/item');
var sales = require('./routes/sales');
var banks = require('./routes/banks');
var payment = require('./routes/payment');
var users = require('./routes/users');
var connection = require("express-myconnection");
var mysql = require('mysql');
var path = require('path');
var FileStreamRotator = require('file-stream-rotator');
//var datefromat = require('dateformat')
var app = express();

var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
    
    connection(mysql,{
        
        host: '127.0.0.1',
        user: 'root',
        password : 'root',
        port : 3306, //port mysql
        database:'highland',
        dateStrings: 'date'

    },'pool') //or single

);

// setup the logger
app.use(morgan('short', {stream: accessLogStream}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
  cookieName : "session",
  secret : "asnjngfgfkgfgfkfasfkagsfkgfakskgfkfaskf",
  duration : 30 * 60 * 1000,
  activeDuration : 5 * 60 * 1000,
}));
app.get('/', routes);

//Login post
app.get('/login' , function(req, res) { res.render('login') });
app.post('/login' , users.user_login);

//
app.get('/logout' , function(req, res) { 
  req.session.reset();
  res.render('login') 
});

//Users routs;
 app.get('/users/', users.list_users);


//app.get('/customers', customers.index);
 app.get('/contact/', contact.list);
 app.post('/contact/', contact.save);

// Item Group 
app.get('/item/', item.list_item);
app.post('/item/', item.save_item);

// Sales 
app.get('/sales/', sales.showheader);
app.post('/sales/', sales.savehead);

// Banks

app.get('/banks/', banks.list_banks);
app.post('/banks/', banks.save_banks);

// payment

app.get('/supplier/', payment.supplierpayment);
app.post('/supplier/', payment.savpay);

//customer Collection
app.get('/collection/', payment.showcollection);
app.post('/collection/', payment.savepay);

app.get('/searching', sales.search);
app.get('/findSupplierPayment', payment.findsupplierpayment);
app.get('/findcollection', payment.findcollection);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Sales app listening at http://%s:%s', host, port);
});

module.exports = app;
