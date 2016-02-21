var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var semiStatic = require('semi-static');
var serveStatic = require('serve-static');
var app = express();
var api = require('./api/words');

var HTTP_PORT = 3000;

// a little helper for fixing paths for various environments
var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};


// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(fixPath('public')));



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet.xssFilter());
app.use(helmet.nosniff());

app.set('view engine', 'jade');
app.set('views', fixPath('templates'));

app.get('/query/romanian/:query', api.queryRom);
app.get('/query/english/:query', api.queryEng);

app.get('*', function (req, res) {
  res.render("index");
});


// listen for incoming http requests on the port as specified in our config
app.listen(HTTP_PORT);
console.log('Limba is running at: http://localhost:' + HTTP_PORT + ' Yep. That\'s pretty awesome.');
