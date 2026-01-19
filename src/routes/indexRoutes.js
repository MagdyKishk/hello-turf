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

// Privacy Policy page
router.get('/privacy', pageController.getPrivacy);

// Terms of Service page
router.get('/terms', pageController.getTerms);

// Sitemap
router.get('/sitemap.xml', pageController.getSitemap);

module.exports = router;

