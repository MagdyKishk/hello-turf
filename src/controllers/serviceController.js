/**
 * Service Controller
 * Handles service-related page rendering
 */

const { getAllServices, getServiceBySlug } = require('../models/ServiceData');

// Get all services
exports.getServices = (req, res) => {
    try {
        const services = getAllServices();
        res.render('services', {
            title: 'Our Services | Hello Turf',
            currentPage: 'services',
            services: services
        });
    } catch (error) {
        console.error('Error rendering services page:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: error,
            message: 'Error loading services page'
        });
    }
};

// Get single service by slug
exports.getService = (req, res) => {
    try {
        const { slug } = req.params;
        const service = getServiceBySlug(slug);
        
        if (!service) {
            return res.status(404).render('404', {
                title: '404 - Service Not Found',
                path: req.path
            });
        }

        const allServices = getAllServices();
        
        // Create proper meta description (not truncated)
        const metaDescription = service.introParagraph.length > 155 
            ? service.introParagraph.substring(0, 152) + '...' 
            : service.introParagraph;

        res.render('service-detail', {
            title: `${service.name} | Hello Turf`,
            currentPage: 'services',
            service: service,
            allServices: allServices,
            description: metaDescription,
            canonical: `https://hello-turf.com/services/${service.slug}`,
            ogType: 'website',
            ogUrl: `https://hello-turf.com/services/${service.slug}`,
            ogTitle: `${service.name} | Hello Turf`,
            ogDescription: metaDescription,
            ogImage: `https://hello-turf.com/images/${service.heroImage}`,
            twitterUrl: `https://hello-turf.com/services/${service.slug}`,
            twitterTitle: `${service.name} | Hello Turf`,
            twitterDescription: metaDescription,
            twitterImage: `https://hello-turf.com/images/${service.heroImage}`
        });
    } catch (error) {
        console.error('Error rendering service page:', error);
        res.status(500).render('error', {
            title: 'Error',
            error: error,
            message: 'Error loading service page'
        });
    }
};
