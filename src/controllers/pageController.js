/**
 * Page Controller
 * Handles rendering of main pages
 */

const { getAllServices } = require('../models/Service');
const { getAllServices: getAllServicesData } = require('../models/ServiceData');

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

// Privacy Policy page
exports.getPrivacy = (req, res) => {
    try {
        res.render('privacy', {
            title: 'Privacy Policy | Hello Turf',
            currentPage: 'privacy'
        });
    } catch (error) {
        console.error('Error rendering privacy page:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: error,
            message: 'Error loading privacy page'
        });
    }
};

// Terms of Service page
exports.getTerms = (req, res) => {
    try {
        res.render('terms', {
            title: 'Terms of Service | Hello Turf',
            currentPage: 'terms'
        });
    } catch (error) {
        console.error('Error rendering terms page:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: error,
            message: 'Error loading terms page'
        });
    }
};

// Sitemap XML
exports.getSitemap = (req, res) => {
    try {
        const baseUrl = 'https://hello-turf.com';
        const services = getAllServicesData();
        const currentDate = new Date().toISOString().split('T')[0];
        
        const urls = [
            { loc: baseUrl, changefreq: 'weekly', priority: '1.0' },
            { loc: `${baseUrl}/gallery`, changefreq: 'monthly', priority: '0.8' },
            { loc: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.9' },
            { loc: `${baseUrl}/privacy`, changefreq: 'yearly', priority: '0.3' },
            { loc: `${baseUrl}/terms`, changefreq: 'yearly', priority: '0.3' }
        ];
        
        // Add service pages
        services.forEach(service => {
            urls.push({
                loc: `${baseUrl}/services/${service.slug}`,
                changefreq: 'monthly',
                priority: '0.8'
            });
        });
        
        res.set('Content-Type', 'text/xml');
        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        urls.forEach(url => {
            sitemap += '  <url>\n';
            sitemap += `    <loc>${url.loc}</loc>\n`;
            sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
            sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
            sitemap += `    <priority>${url.priority}</priority>\n`;
            sitemap += '  </url>\n';
        });
        
        sitemap += '</urlset>';
        res.send(sitemap);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Error generating sitemap');
    }
};
