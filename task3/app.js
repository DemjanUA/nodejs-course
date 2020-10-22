const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./logger');
const config = require('./config');
const events = require('./routes/events');
const eventsBatch = require('./routes/events-batch');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/events', events);
app.use('/events-batch', eventsBatch);

app.all('/', (req, res) => {
  res.send('Server is working!');
})

app.listen(config.PORT, () => logger.log(`Listening on port ${config.PORT}`));