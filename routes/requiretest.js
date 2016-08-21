console.log('main starting');
const a = require('./a.js');
console.log('be4 main requires b.js');
const b = require('./b.js');
console.log('in main, a.done=%j, b.done=%j', a.done, b.done);