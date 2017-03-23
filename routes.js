var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/app.js', function(req, res) {
  res.sendfile('./build/bundle.js');
});

router.get('/config.json', function(req, res) {
  res.sendfile('./config.json');
});


module.exports = router;
