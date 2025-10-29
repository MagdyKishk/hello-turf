/**
 * Service Routes
 * Routes for service pages
 */

const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// All services page (optional)
router.get('/', serviceController.getServices);

// Individual service pages
router.get('/:slug', serviceController.getService);

module.exports = router;

