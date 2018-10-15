/** Express server serving the contacts API
 * @module server
 * @requires express
 * @requires http
 * @requires bodyParser
 */

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

require('./db/mongoose');

app.use(bodyParser.json());

require('./routes/userRoutes')(app);
require('./routes/contactRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

module.exports = { app, server };
