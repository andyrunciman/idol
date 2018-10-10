//imports
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

//server setup
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

//attach middleware
app.use(bodyParser.json());

//attach routing
require('./routes/authRoutes')(app);
require('./routes/contactRoutes')(app);
//returns a function which populates the app with the appropriate HTTP VERBS

app.get('/test', (req, res) => {
  res.status(200).send({ a: 10 });
});

server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
