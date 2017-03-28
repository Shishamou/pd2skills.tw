var express = require('express');
var app = express();
var router = express.Router();

var port = process.env.PORT || 8080;

// =============================================================================
// = Route
// =============================================================================

router.get('/', function(req, res) {
  res.sendfile('../public/index.js');
});

router.get('/app.js', function(req, res) {
  res.sendfile('./build/bundle.js');
});

router.get('/config.json', function(req, res) {
  res.sendfile('./config.json');
});

// =============================================================================
// = App
// =============================================================================

app.use('/', router);
app.use(express.static(__dirname + '/../public'));

// start
app.listen(port, function() {
  console.log('Ready on port ' + port);
});
