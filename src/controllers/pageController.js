/**
 * Page Controller
 * Handles rendering of main pages
 */

const { getAllServices } = require('../models/Service');

// Home page
exports.getHome = (req, res) => {
    try {
        res.render('index', {
            title: 'Hello Turf | Austin\'s Artificial Turf Specialists',
            currentPage: 'home',
            services: getAllServices()
        });
    } catch (error) {
        console.error('Error rendering home page:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: error,
            message: 'Error loading home page'
        });
    }
};

// Gallery page
exports.getGallery = (req, res) => {
    try {
        const galleryItems = [
            {
                image: '/images/turf-7.jpg',
                title: 'Backyard Paradise',
                description: 'Residential Installation - Austin, TX'
            },
            {
                image: '/images/turf-8.jpg',
                title: 'Pet-Friendly Oasis',
                description: 'Pet Turf System - Round Rock, TX'
            },
            {
                image: '/images/turf-9.jpg',
                title: 'Backyard Putting Green',
                description: 'Custom Design - Cedar Park, TX'
            },
            {
                image: '/images/turf-10.jpg',
                title: 'Commercial Landscape',
                description: 'Office Complex - Downtown Austin'
            },
            {
                image: '/images/turf-11.jpg',
                title: 'Safe Play Area',
                description: 'Playground Turf - Pflugerville, TX'
            },
            {
                image: '/images/turf-12.jpg',
                title: 'Curb Appeal Boost',
                description: 'Front Yard - Lakeway, TX'
            }
        ];

        res.render('gallery', {
            title: 'Our Work Gallery | Hello Turf',
            currentPage: 'gallery',
            galleryItems: galleryItems
        });
    } catch (error) {
        console.error('Error rendering gallery page:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: error,
            message: 'Error loading gallery page'
        });
    }
};

// Contact page
exports.getContact = (req, res) => {
    try {
        res.render('contact', {
            title: 'Contact Us - Get Free Quote | Hello Turf',
            currentPage: 'contact',
            success: req.query.success === 'true',
            error: req.query.error === 'true'
        });
    } catch (error) {
        console.error('Error rendering contact page:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: error,
            message: 'Error loading contact page'
        });
    }
};

