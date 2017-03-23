var express = require('express');
var routes = require('./routes');

var port = process.env.PORT || 8088;

var app = express();

// set template engine.
app.set('view engine', 'ejs');

// set routes and static file
app.use('/', routes);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build'));

// start
app.listen(port, function() {
  console.log('ready on port ' + port);
});
