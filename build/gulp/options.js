var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
  default: {target: 'default'}
});

module.exports = options;