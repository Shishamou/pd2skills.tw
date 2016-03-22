var packing = require('../packing');

var result = packing(__dirname + '/datas');
result = JSON.stringify(result, null, 4);

module.exports = result;
