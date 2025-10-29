/**
 * Comprehensive Service Data
 * Contains all detailed content for each service page
 */

const servicesData = {
    'residential-turf': {
        id: 'residential-turf',
        name: 'Residential Turf Installation',
        slug: 'residential-turf',
        heroImage: 'turf-1.jpg',
        heroTitle: 'Residential Turf Installation',
        heroSubtitle: 'Transform your backyard into a year-round green paradise with premium artificial turf',
        mainHeading: 'Beautiful, Low-Maintenance Lawns for Austin Homes',
        introParagraph: 'At Hello Turf, we specialize in transforming residential properties throughout Austin with premium artificial turf solutions. Say goodbye to mowing, watering, and constant lawn maintenance while enjoying a lush, green yard year-round.',
        benefitsTitle: 'Why Choose Artificial Turf for Your Home?',
        benefits: [
            { icon: 'check-circle', title: 'Save Time & Money', description: 'No more weekly mowing, watering, or fertilizing' },
            { icon: 'check-circle', title: 'Water Conservation', description: 'Save up to 55,000 gallons of water per year' },
            { icon: 'check-circle', title: 'Year-Round Green', description: 'Perfect lawn in every season, rain or shine' },
            { icon: 'check-circle', title: 'Pet & Kid Friendly', description: 'Durable, safe, and easy to clean' },
            { icon: 'check-circle', title: 'Eco-Friendly', description: 'No harmful pesticides or fertilizers needed' },
            { icon: 'check-circle', title: 'Increase Property Value', description: 'Beautiful curb appeal that lasts' }
        ],
        optionsTitle: 'Our Residential Turf Options',
        optionsIntro: 'We offer a variety of high-quality artificial turf products to suit your specific needs:',
        options: [
            { title: 'Premium Luxury Turf', description: 'Ultra-realistic appearance with soft, dense fibers. Perfect for high-visibility areas like front yards.' },
            { title: 'Family & Pet Turf', description: 'Durable, stain-resistant, and easy to clean. Ideal for backyards with children and pets.' },
            { title: 'Budget-Friendly Turf', description: 'High-quality synthetic grass at an affordable price. Great for larger areas.' }
        ],
        processTitle: 'Our Installation Process',
        process: [
            { step: 'Free Consultation', description: 'We visit your property, assess your space, and discuss your vision' },
            { step: 'Custom Design', description: 'We create a tailored plan that fits your landscape and budget' },
            { step: 'Site Preparation', description: 'Proper base preparation ensures long-lasting results' },
            { step: 'Professional Installation', description: 'Our expert team installs your turf with precision' },
            { step: 'Final Inspection', description: 'We ensure everything meets our high standards and your expectations' }
        ],
        ctaTitle: 'Ready to Transform Your Yard?',
        ctaDescription: 'Get a free, no-obligation quote today. Most installations completed in 1-3 days!',
        ctaButton: 'Request Free Quote'
    },

    'commercial-turf': {
        id: 'commercial-turf',
        name: 'Commercial Turf Installation',
        slug: 'commercial-turf',
        heroImage: 'turf-1.jpg',
        heroTitle: 'Commercial Turf Installation',
        heroSubtitle: 'Professional-grade artificial turf solutions for businesses, offices, and commercial properties',
        mainHeading: 'Premium Commercial Artificial Turf for Austin Businesses',
        introParagraph: 'Hello Turf provides top-quality commercial turf installations for businesses across Austin. Our professional-grade synthetic grass solutions enhance your property\'s appearance while dramatically reducing maintenance costs and water usage.',
        benefitsTitle: 'Why Choose Commercial Artificial Turf?',
        benefits: [
            { icon: 'check-circle', title: 'Reduce Operating Costs', description: 'Eliminate ongoing lawn maintenance expenses' },
            { icon: 'check-circle', title: 'Professional Appearance', description: 'Immaculate landscaping 365 days a year' },
            { icon: 'check-circle', title: 'High Traffic Durability', description: 'Withstands heavy foot traffic and events' },
            { icon: 'check-circle', title: 'Water Savings', description: 'Significantly reduce water bills and meet conservation goals' },
            { icon: 'check-circle', title: 'Quick Installation', description: 'Minimal disruption to your business operations' },
            { icon: 'check-circle', title: 'Increase Property Value', description: 'Enhance curb appeal and tenant satisfaction' }
        ],
        optionsTitle: 'Commercial Applications',
        optionsIntro: 'Our commercial turf is perfect for a wide range of business applications:',
        options: [
            { title: 'Office Complexes', description: 'Create inviting outdoor spaces for employees and visitors with low-maintenance landscaping.' },
            { title: 'Retail & Restaurants', description: 'Enhance customer experience with beautiful outdoor seating areas and entryways.' },
            { title: 'Hotels & Apartments', description: 'Provide residents and guests with attractive, maintenance-free common areas.' },
            { title: 'Event Venues', description: 'Durable surface that looks perfect for weddings, corporate events, and gatherings.' },
            { title: 'Healthcare Facilities', description: 'Safe, clean outdoor spaces for patients, staff, and visitors.' },
            { title: 'Schools & Daycares', description: 'Safe play areas and athletic fields that require minimal maintenance.' }
        ],
        processTitle: 'Our Installation Process',
        process: [
            { step: 'Free Consultation', description: 'We visit your property, assess your space, and discuss your vision' },
            { step: 'Custom Design', description: 'We create a tailored plan that fits your landscape and budget' },
            { step: 'Site Preparation', description: 'Proper base preparation ensures long-lasting results' },
            { step: 'Professional Installation', description: 'Our expert team installs your turf with precision' },
            { step: 'Final Inspection', description: 'We ensure everything meets our high standards and your expectations' }
        ],
        ctaTitle: 'Ready to Upgrade Your Commercial Property?',
        ctaDescription: 'Get a free commercial quote today. Volume pricing and flexible scheduling available!',
        ctaButton: 'Request Commercial Quote'
    },

    'pet-turf': {
        id: 'pet-turf',
        name: 'Pet Turf Installation',
        slug: 'pet-turf',
        heroImage: 'turf-8.jpg',
        heroTitle: 'Pet Turf Installation',
        heroSubtitle: 'Durable, safe, and odor-resistant artificial turf designed specifically for your furry friends',
        mainHeading: 'Premium Pet Turf Systems for Austin Pet Owners',
        introParagraph: 'Hello Turf offers specialized artificial turf designed specifically for pets. Our pet turf systems feature antimicrobial backing, superior drainage, and easy-to-clean surfaces that stand up to digging, running, and heavy use from your furry family members.',
        benefitsTitle: 'Why Choose Pet Turf?',
        benefits: [
            { icon: 'check-circle', title: 'Odor Control', description: 'Antimicrobial backing prevents bacteria and eliminates odors' },
            { icon: 'check-circle', title: 'Superior Drainage', description: 'Drains 30+ inches per hour - no more muddy paws or puddles' },
            { icon: 'check-circle', title: 'Easy Cleanup', description: 'Solid waste removal is simple, liquid waste drains instantly' },
            { icon: 'check-circle', title: 'Durable & Safe', description: 'Non-toxic, lead-free materials that withstand digging and play' },
            { icon: 'check-circle', title: 'No Mud or Dirt', description: 'Keep your home clean - no more tracking in mud' },
            { icon: 'check-circle', title: 'Year-Round Use', description: 'Always green, always clean, rain or shine' }
        ],
        optionsTitle: 'Pet Turf Features',
        optionsIntro: 'Our pet turf systems include specialized features designed for pet owners:',
        options: [
            { title: 'Antimicrobial Protection', description: 'Built-in antimicrobial technology prevents bacteria growth and keeps your pet area fresh and hygienic.' },
            { title: 'Maximum Drainage', description: 'Advanced perforated backing and drainage system ensures liquids drain away quickly with no pooling.' },
            { title: 'Stain Resistant', description: 'Specially treated fibers resist staining and are incredibly easy to rinse clean with a hose.' }
        ],
        processTitle: 'Our Pet Turf Installation Process',
        process: [
            { step: 'Free Consultation', description: 'We assess your yard and discuss your pets\' needs and habits' },
            { step: 'Custom Design', description: 'We design a pet-friendly space tailored to your property' },
            { step: 'Site Preparation', description: 'Proper grading and drainage base preparation' },
            { step: 'Professional Installation', description: 'Expert installation with pet-specific backing and infill' },
            { step: 'Care Instructions', description: 'We show you how to maintain your pet turf for optimal performance' }
        ],
        ctaTitle: 'Ready to Give Your Pets the Best?',
        ctaDescription: 'Get a free quote for pet turf installation. Your pets will love it!',
        ctaButton: 'Request Free Quote'
    },

    'putting-greens': {
        id: 'putting-greens',
        name: 'Custom Putting Greens',
        slug: 'putting-greens',
        heroImage: 'turf-9.jpg',
        heroTitle: 'Custom Putting Greens',
        heroSubtitle: 'Professional-grade putting greens for your backyard - practice your game at home',
        mainHeading: 'Custom Putting Greens for Austin Golf Enthusiasts',
        introParagraph: 'Hello Turf designs and installs professional-quality putting greens tailored to your backyard space and skill level. Whether you\'re a beginner looking to practice or a scratch golfer wanting to perfect your short game, we create custom greens with realistic ball roll and professional-grade turf.',
        benefitsTitle: 'Why Install a Backyard Putting Green?',
        benefits: [
            { icon: 'check-circle', title: 'Improve Your Game', description: 'Practice anytime without leaving home' },
            { icon: 'check-circle', title: 'Custom Design', description: 'Tailored contours, breaks, and challenges to match your skill level' },
            { icon: 'check-circle', title: 'True Ball Roll', description: 'Professional-grade turf with realistic putting surface' },
            { icon: 'check-circle', title: 'Year-Round Use', description: 'Practice in any weather - no maintenance required' },
            { icon: 'check-circle', title: 'Increase Home Value', description: 'Unique feature that adds curb appeal and entertainment value' },
            { icon: 'check-circle', title: 'Entertainment', description: 'Great for parties, family fun, and friendly competitions' }
        ],
        optionsTitle: 'Putting Green Features',
        optionsIntro: 'We offer various features to create your perfect practice green:',
        options: [
            { title: 'Custom Contours', description: 'Add breaks, slopes, and undulations to challenge your putting skills and simulate real course conditions.' },
            { title: 'Multiple Holes', description: 'Install multiple cup locations to create various practice scenarios and keep practice interesting.' },
            { title: 'Chipping Areas', description: 'Add fringe and rough areas around your green to practice chip shots and approach shots.' }
        ],
        processTitle: 'Our Putting Green Installation Process',
        process: [
            { step: 'Free Consultation', description: 'We assess your space and discuss your golfing goals and preferences' },
            { step: 'Custom Design', description: 'We create a 3D design with your desired features, contours, and challenges' },
            { step: 'Site Preparation', description: 'Precision grading and contouring for proper ball roll' },
            { step: 'Professional Installation', description: 'Expert installation with professional-grade putting turf' },
            { step: 'Final Calibration', description: 'We test and adjust for optimal ball speed and true roll' }
        ],
        ctaTitle: 'Ready to Build Your Dream Putting Green?',
        ctaDescription: 'Get a free consultation and design for your custom putting green today!',
        ctaButton: 'Request Free Quote'
    },

    'pool-turf': {
        id: 'pool-turf',
        name: 'Pool Turf Installation',
        slug: 'pool-turf',
        heroImage: 'turf-5.jpg',
        heroTitle: 'Pool Turf Installation',
        heroSubtitle: 'Transform your pool area with safe, comfortable, and beautiful artificial turf',
        mainHeading: 'Premium Pool Turf for Austin Swimming Pools',
        introParagraph: 'Transform your pool deck and surrounding area with Hello Turf\'s specialized pool turf. Our pool-specific artificial grass is designed to stay cool underfoot, resist chlorine and pool chemicals, provide excellent traction when wet, and create a resort-style atmosphere in your backyard.',
        benefitsTitle: 'Why Choose Pool Turf?',
        benefits: [
            { icon: 'check-circle', title: 'Heat Resistant', description: 'Stays cooler than concrete or pavers under Austin\'s hot sun' },
            { icon: 'check-circle', title: 'Non-Slip Surface', description: 'Safe traction even when wet - reduces slip and fall accidents' },
            { icon: 'check-circle', title: 'Chemical Resistant', description: 'Withstands chlorine, salt water, and pool chemicals' },
            { icon: 'check-circle', title: 'Comfortable', description: 'Soft on bare feet - no more burning concrete' },
            { icon: 'check-circle', title: 'Fast Drainage', description: 'Water drains quickly - no puddles or standing water' },
            { icon: 'check-circle', title: 'Low Maintenance', description: 'Easy to clean and maintain - looks great year-round' }
        ],
        optionsTitle: 'Pool Turf Applications',
        optionsIntro: 'Our pool turf is perfect for various poolside installations:',
        options: [
            { title: 'Pool Decks', description: 'Transform your entire pool deck into a comfortable, safe, and beautiful surface that stays cool.' },
            { title: 'Pool Surrounds', description: 'Create a lush green border around your pool that enhances the resort-like atmosphere.' },
            { title: 'Splash Pads & Water Features', description: 'Perfect for areas around splash pads, fountains, and other water features.' }
        ],
        processTitle: 'Our Pool Turf Installation Process',
        process: [
            { step: 'Free Consultation', description: 'We assess your pool area and discuss your design preferences' },
            { step: 'Custom Design', description: 'We create a layout that complements your pool and landscaping' },
            { step: 'Site Preparation', description: 'Proper grading for optimal drainage away from pool' },
            { step: 'Professional Installation', description: 'Expert installation with pool-safe backing and materials' },
            { step: 'Final Inspection', description: 'We ensure perfect fit and proper drainage throughout' }
        ],
        ctaTitle: 'Ready to Upgrade Your Pool Area?',
        ctaDescription: 'Get a free quote for pool turf installation. Create your backyard oasis!',
        ctaButton: 'Request Free Quote'
    },

    'sports-turf': {
        id: 'sports-turf',
        name: 'Sports Turf Installation',
        slug: 'sports-turf',
        heroImage: 'turf-6.jpg',
        heroTitle: 'Sports Turf Installation',
        heroSubtitle: 'Professional-grade athletic turf for sports fields, training areas, and recreational facilities',
        mainHeading: 'Professional Sports Turf for Austin Athletic Facilities',
        introParagraph: 'Hello Turf specializes in installing high-performance sports turf for athletic fields, training facilities, and recreational areas. Our sports turf is engineered for durability, safety, and optimal performance across various sports and activities.',
        benefitsTitle: 'Why Choose Sports Turf?',
        benefits: [
            { icon: 'check-circle', title: 'Maximum Durability', description: 'Withstands heavy use and extreme weather conditions' },
            { icon: 'check-circle', title: 'Player Safety', description: 'Shock-absorbing padding reduces injury risk' },
            { icon: 'check-circle', title: 'Consistent Performance', description: 'Uniform surface with predictable ball bounce and roll' },
            { icon: 'check-circle', title: 'Year-Round Play', description: 'Always ready - no weather delays or field closures' },
            { icon: 'check-circle', title: 'Low Maintenance', description: 'No mowing, watering, or line painting required' },
            { icon: 'check-circle', title: 'Cost Effective', description: 'Lower long-term costs compared to natural grass fields' }
        ],
        optionsTitle: 'Sports Turf Applications',
        optionsIntro: 'Our sports turf is ideal for various athletic and recreational facilities:',
        options: [
            { title: 'Multi-Sport Fields', description: 'Versatile turf for soccer, football, lacrosse, field hockey, and other field sports.' },
            { title: 'Training Facilities', description: 'High-performance surfaces for indoor and outdoor training centers and practice areas.' },
            { title: 'Recreational Areas', description: 'Durable turf for playgrounds, parks, and community recreational facilities.' },
            { title: 'Batting Cages & Hitting Areas', description: 'Specialized turf for baseball and softball training areas with optimal ball response.' },
            { title: 'Tennis & Pickleball Courts', description: 'Court-specific turf with proper speed and bounce characteristics.' },
            { title: 'Bocce & Lawn Bowling', description: 'Smooth, flat surfaces perfect for precision lawn sports.' }
        ],
        processTitle: 'Our Sports Turf Installation Process',
        process: [
            { step: 'Free Consultation', description: 'We assess your facility needs and sport-specific requirements' },
            { step: 'Custom Design', description: 'We design a field layout optimized for your sports and space' },
            { step: 'Site Preparation', description: 'Professional grading and shock-pad installation for safety' },
            { step: 'Professional Installation', description: 'Expert installation with sport-specific turf and infill' },
            { step: 'Final Testing', description: 'Performance testing to ensure optimal play characteristics' }
        ],
        ctaTitle: 'Ready to Upgrade Your Athletic Facility?',
        ctaDescription: 'Get a free consultation for your sports turf project. Let\'s build something great!',
        ctaButton: 'Request Free Quote'
    },

    'pavers': {
        id: 'pavers',
        name: 'Paver Installation',
        slug: 'pavers',
        heroImage: 'turf-4.jpg',
        heroTitle: 'Paver Installation',
        heroSubtitle: 'Beautiful, durable pavers for patios, walkways, driveways, and outdoor living spaces',
        mainHeading: 'Professional Paver Installation for Austin Properties',
        introParagraph: 'Hello Turf offers expert paver installation services for residential and commercial properties throughout Austin. Our team creates stunning outdoor spaces with high-quality pavers that combine beauty, durability, and functionality. Perfect for patios, walkways, driveways, and pool decks.',
        benefitsTitle: 'Why Choose Pavers?',
        benefits: [
            { icon: 'check-circle', title: 'Exceptional Durability', description: 'Pavers withstand heavy traffic and harsh weather' },
            { icon: 'check-circle', title: 'Timeless Beauty', description: 'Wide variety of colors, patterns, and styles available' },
            { icon: 'check-circle', title: 'Easy Repairs', description: 'Individual pavers can be replaced without affecting the entire surface' },
            { icon: 'check-circle', title: 'Low Maintenance', description: 'Simple cleaning and minimal upkeep required' },
            { icon: 'check-circle', title: 'Increase Home Value', description: 'Beautiful hardscaping adds significant property value' },
            { icon: 'check-circle', title: 'Eco-Friendly Options', description: 'Permeable pavers allow water drainage and reduce runoff' }
        ],
        optionsTitle: 'Paver Applications',
        optionsIntro: 'We install pavers for a variety of outdoor applications:',
        options: [
            { title: 'Patios & Outdoor Living', description: 'Create beautiful entertainment spaces with custom paver patios and outdoor kitchens.' },
            { title: 'Walkways & Pathways', description: 'Elegant pathways that guide visitors through your landscape and enhance curb appeal.' },
            { title: 'Driveways', description: 'Durable, attractive driveways that make a lasting first impression.' },
            { title: 'Pool Decks', description: 'Non-slip, cool-to-touch pavers perfect for pool surrounds and deck areas.' },
            { title: 'Retaining Walls', description: 'Functional and decorative walls that manage grade changes and prevent erosion.' },
            { title: 'Fire Pit Areas', description: 'Safe, beautiful gathering spaces built around custom fire pits.' }
        ],
        processTitle: 'Our Paver Installation Process',
        process: [
            { step: 'Free Consultation', description: 'We visit your property and discuss your vision and budget' },
            { step: 'Custom Design', description: 'We create a detailed design with paver style, pattern, and layout' },
            { step: 'Site Preparation', description: 'Proper excavation, base preparation, and grading for drainage' },
            { step: 'Professional Installation', description: 'Expert installation with precise leveling and joint spacing' },
            { step: 'Final Sealing', description: 'Optional sealing to protect and enhance your paver investment' }
        ],
        ctaTitle: 'Ready to Transform Your Outdoor Space?',
        ctaDescription: 'Get a free consultation and quote for your paver project. Let\'s create something beautiful!',
        ctaButton: 'Request Free Quote'
    }
};

// Helper functions
const getAllServices = () => {
    return Object.values(servicesData);
};

const getServiceBySlug = (slug) => {
    return servicesData[slug] || null;
};

const getServiceById = (id) => {
    return Object.values(servicesData).find(service => service.id === id);
};

module.exports = {
    servicesData,
    getAllServices,
    getServiceBySlug,
    getServiceById
};

