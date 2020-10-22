const express = require('express');

const router = express.Router();

const eventsBatchController = require('../controllers/EventsBatchController');

router.get('/', eventsBatchController.getAllEvents);

module.exports = router;