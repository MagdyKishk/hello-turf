/**
 * Quote Routes
 * Routes for quote form submission
 */

const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// Get quote form
router.get('/', quoteController.getQuoteForm);

// Submit quote
router.post('/submit', quoteController.quoteValidation, quoteController.submitQuote);

module.exports = router;

