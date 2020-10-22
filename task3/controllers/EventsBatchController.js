const eventsBatchResource = require('../resources/EventBatchResource');

class EventsBatchController {
  getAllEvents(req, res) {
    res.setHeader('Content-Type', 'application/json');
    eventsBatchResource.getAllEvents().pipe(res);
  }
}

const eventsBatchController = new EventsBatchController();

module.exports = eventsBatchController;