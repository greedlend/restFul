console.log('a starting');
exports.done = false;
console.log('be4 a.js requires b.js');
const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a done');