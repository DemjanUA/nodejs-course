const eventsResource = require('../resources/EventResource');

class EventsController {
  async getAllEvents(req, res) {
    const query = req.query;
    res.json(await eventsResource.getAllEvents(query));
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const event = await eventsResource.getById(id);
      res.json(event);
    } catch (error) {
      if (error) {
        res.sendStatus(500);
      } else {
        res.sendStatus(404);
      }
    }
  }

  async create(req, res) {
    res.json(await eventsResource.create(req.body))
  }

  async update(req, res) {
    const id = req.params.id;
    res.send(await eventsResource.update(id, req.body));
  }

  async delete(req, res) {
    const id = req.params.id;
    res.send(await eventsResource.delete(id));
  }
}

const eventsController = new EventsController();

module.exports = eventsController;