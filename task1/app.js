const http = require('http');

const logger = require('./logger');
const config = require('./config');

http.createServer((req, res) => {
  res.end('Hello world!');
}).listen(config.PORT, () => logger.log(`Listening on port ${config.PORT}`));