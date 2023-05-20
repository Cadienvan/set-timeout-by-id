const { setTimeoutById } = require('../dist/index.js')

console.log('before setTimeoutById');
setTimeoutById(() => {
  console.log('in setTimeoutById');
}, 1000, 'myTimeout');
console.log('after setTimeoutById');
