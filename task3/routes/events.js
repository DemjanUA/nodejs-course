const express = require('express');

const router = express.Router();

const eventsController = require('../controllers/EventsController');

router.get('/', eventsController.getAllEvents);

router.get('/:id', eventsController.getById);

router.post('/', eventsController.create);

router.delete('/:id', eventsController.delete);

router.put('/:id', eventsController.update);

module.exports = router;