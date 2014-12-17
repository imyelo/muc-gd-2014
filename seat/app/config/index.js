var fs = require('fs');
var path = require('path');
module.exports = fs.existsSync(path.join(__dirname, './custom.js')) ? require('./custom.js') : require('./defaults');
