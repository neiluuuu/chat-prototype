var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var faker = require('faker');

var app = express();
var http = require('http').createServer( app );

var io = require('socket.io')(http);

http.listen(3000);

// Make sure to include the JSX transpiler
require("node-jsx").install({extension: '.jsx'});

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// Set up Routes for the application
require('./app/routes/core-routes')(app);
//Route not found -- Set 404
app.get('*', function(req, res) {
    res.json({
        "route": "Sorry this page does not exist!"
    });
});

io.on('connection', function(socket) {
	var username = faker.internet.userName();
	var color = faker.internet.color();
	socket.on('chat message', function(msg){
		io.emit('chat message', {msg: msg, username: username, color: color});
	});
});
