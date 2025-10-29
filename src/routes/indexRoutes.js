/**
 * Index Routes
 * Main application routes
 */

const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Home page
router.get('/', pageController.getHome);

// Gallery page
router.get('/gallery', pageController.getGallery);

// Contact page
router.get('/contact', pageController.getContact);

module.exports = router;

