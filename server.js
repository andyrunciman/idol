const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
