/*
* Production keys
* @module config/prod.js
*/
module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET
};
