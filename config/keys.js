/*
* Production keys
* @module config/keys.js
* @description exports the correct keys depending on the enviroment. The keys will come from process.env on production
*/
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
