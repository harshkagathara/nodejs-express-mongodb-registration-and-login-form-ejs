var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var index = require('./App/Routes/routes');

require('./App/DB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(__dirname + '/views'));
app.use('/', index);
app.use(function(req, res, next) {
	var err = new Error('File Not Found');
	err.status = 404;
	next(err);
});
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
	console.log('Server is started on http://127.0.0.1:' + PORT);
});