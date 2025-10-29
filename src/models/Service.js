/**
 * Service Model
 * Data structure for service information
 * This can be used with or without MongoDB
 */

// Service data (can be moved to database later)
const services = [
    {
        id: 'residential-turf',
        name: 'Residential Turf Installation',
        slug: 'residential-turf',
        icon: 'fa-home',
        shortDescription: 'Transform your backyard into a year-round green paradise.',
        description: 'Our residential turf installations are perfect for lawns, landscaping, and outdoor living spaces. Enjoy a pristine yard without the hassle of mowing, watering, or fertilizing.',
        benefits: [
            'Custom design and layout',
            'Drought-resistant solution',
            'Pet and kid-friendly options',
            'Low maintenance luxury',
            'Increases property value',
            'Year-round green appearance'
        ],
        features: [
            'Premium synthetic grass materials',
            'Professional installation',
            'Custom edge trimming',
            'Drainage system installation',
            'UV protection',
            '15-year warranty'
        ]
    },
    {
        id: 'commercial-turf',
        name: 'Commercial Turf',
        slug: 'commercial-turf',
        icon: 'fa-building',
        shortDescription: 'Professional-grade turf for businesses and commercial properties.',
        description: 'Enhance your business property with professional-grade artificial turf. Ideal for office complexes, retail spaces, HOAs, and commercial landscapes.',
        benefits: [
            'High-traffic durability',
            'Professional appearance',
            'Cost-effective maintenance',
            'Quick installation',
            'Enhanced curb appeal',
            'Water conservation'
        ],
        features: [
            'Heavy-duty materials',
            'Large-scale installation',
            'Minimal disruption',
            'Commercial warranties',
            'ADA compliant options',
            'Professional project management'
        ]
    },
    {
        id: 'putting-greens',
        name: 'Putting Greens',
        slug: 'putting-greens',
        icon: 'fa-golf-ball',
        shortDescription: 'Custom putting greens for golf enthusiasts.',
        description: 'Practice your short game at home with a custom putting green. We design and install professional-quality putting surfaces tailored to your space and skill level.',
        benefits: [
            'Custom contours and breaks',
            'True ball roll',
            'Professional-grade turf',
            'Year-round playability',
            'Improve your golf game',
            'Entertainment value'
        ],
        features: [
            'Professional design consultation',
            'Custom green shapes',
            'Multiple cup locations',
            'Fringe and collar options',
            'Proper slope and drainage',
            'Tournament-quality surfaces'
        ]
    },
    {
        id: 'pet-turf',
        name: 'Pet Turf Systems',
        slug: 'pet-turf',
        icon: 'fa-dog',
        shortDescription: 'Durable, pet-friendly artificial turf solutions.',
        description: 'Specially designed artificial turf for pet owners. Our pet turf features antimicrobial backing, superior drainage, and easy-to-clean surfaces.',
        benefits: [
            'Odor-resistant technology',
            'Excellent drainage system',
            'Non-toxic materials',
            'Easy cleanup and maintenance',
            'Durable against digging',
            'Mud and allergen-free'
        ],
        features: [
            'Antimicrobial backing',
            'Enhanced drainage holes',
            'Pet-safe infill',
            'Stain resistant',
            'Easy rinse cleaning',
            'Durable construction'
        ]
    },
    {
        id: 'pool-turf',
        name: 'Pool Turf',
        slug: 'pool-turf',
        icon: 'fa-swimming-pool',
        shortDescription: 'Safe, slip-resistant turf for pool areas.',
        description: 'Transform your pool area with soft, safe artificial turf. Perfect for pool decks, surrounding areas, and splash zones.',
        benefits: [
            'Slip-resistant surface',
            'No grass clippings in pool',
            'Comfortable on bare feet',
            'Quick drainage',
            'Cool surface technology',
            'No maintenance required'
        ],
        features: [
            'Chlorine resistant',
            'Rapid drainage system',
            'UV stabilized',
            'Soft blade technology',
            'Heat reflective options',
            'Custom installation around any pool shape'
        ]
    },
    {
        id: 'sports-turf',
        name: 'Sports Turf',
        slug: 'sports-turf',
        icon: 'fa-football-ball',
        shortDescription: 'Professional sports turf for athletic facilities.',
        description: 'High-performance artificial turf for sports fields, training facilities, and athletic areas. Built to withstand intensive use.',
        benefits: [
            'Professional performance',
            'All-weather playability',
            'Reduced maintenance costs',
            'Consistent playing surface',
            'Enhanced safety',
            'Multi-sport capabilities'
        ],
        features: [
            'Sport-specific designs',
            'Shock absorption padding',
            'Professional line marking',
            'Heavy-duty construction',
            'FIFA/NFL quality standards',
            'Extended warranties'
        ]
    },
    {
        id: 'pavers',
        name: 'Artificial Grass Pavers',
        slug: 'pavers',
        icon: 'fa-border-all',
        shortDescription: 'Grass pavers for driveways and pathways.',
        description: 'Combine the beauty of grass with the functionality of pavers. Perfect for driveways, parking areas, and pathways.',
        benefits: [
            'Unique aesthetic appeal',
            'Drivable surface',
            'Erosion control',
            'Stormwater management',
            'Low maintenance',
            'Eco-friendly solution'
        ],
        features: [
            'Heavy-duty grid system',
            'Vehicle weight capacity',
            'Proper drainage',
            'Custom patterns',
            'Easy installation',
            'Long-lasting durability'
        ]
    }
];

// Helper functions
const getAllServices = () => {
    return services;
};

const getServiceBySlug = (slug) => {
    return services.find(service => service.slug === slug);
};

const getServiceById = (id) => {
    return services.find(service => service.id === id);
};

module.exports = {
    services,
    getAllServices,
    getServiceBySlug,
    getServiceById
};

