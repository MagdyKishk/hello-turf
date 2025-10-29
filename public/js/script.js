// ===================================
// Hello Turf - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === Initialize Testimonials Slider ===
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    if (testimonialsSlider) {
        new Splide('#testimonialsSlider', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 5000,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: true,
            pagination: true,
            breakpoints: {
                992: {
                    perPage: 2,
                    gap: '1.5rem',
                },
                768: {
                    perPage: 1,
                    gap: '1rem',
                }
            }
        }).mount();
    }
    
    // === Mobile Navigation Toggle ===
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // === Smooth Scrolling for Navigation Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = 80;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // === Scroll to Top Button ===
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // Add shadow to navbar on scroll
        const navbar = document.querySelector('.navbar');
        if (window.pageYOffset > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // === Quote Form Handling ===
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get the submit button
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName')?.value,
                email: document.getElementById('email')?.value,
                phone: document.getElementById('phone')?.value,
                address: document.getElementById('address')?.value,
                projectSize: document.getElementById('projectSize')?.value,
                message: document.getElementById('message')?.value
            };
            
            try {
                // Send data to backend
                const response = await fetch('./quote/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    alert(data.message || 'Thank you for your quote request! We\'ll contact you within 24 hours.');
                    
                    // Reset form
                    quoteForm.reset();
                } else {
                    // Show error messages
                    if (data.errors && data.errors.length > 0) {
                        const errorMessages = data.errors.map(err => err.msg).join('\n');
                        alert('Please fix the following errors:\n\n' + errorMessages);
                    } else {
                        alert(data.message || 'Sorry, something went wrong. Please try again.');
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Sorry, something went wrong. Please call us directly at (512) 317-5400.');
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
    
    // === Form Validation Enhancement ===
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });
    }
    
    // === Intersection Observer for Fade-in Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .why-card, .testimonial-card, .gallery-item, .stat-item'
    );
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // === Gallery Image Modal (Optional Enhancement) ===
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In production, you could implement a lightbox/modal here
            // For now, we'll just log the click
            console.log('Gallery item clicked');
            // You could integrate a library like Lightbox2, GLightbox, or build custom modal
        });
    });
    
    // === Active Navigation Highlight ===
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // === Performance: Lazy Loading for Images ===
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // === Analytics Event Tracking (Template) ===
    function trackEvent(category, action, label) {
        // Integrate with Google Analytics, Facebook Pixel, etc.
        console.log('Event tracked:', category, action, label);
        
        // Example for Google Analytics 4:
        // gtag('event', action, {
        //     'event_category': category,
        //     'event_label': label
        // });
    }
    
    // Track CTA button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('CTA', 'Click', buttonText);
        });
    });
    
    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Phone Click', this.getAttribute('href'));
        });
    });
    
    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Email Click', this.getAttribute('href'));
        });
    });
    
});

// === Console Welcome Message ===
console.log('%c👋 Welcome to Hello Turf!', 'color: #2ECC71; font-size: 20px; font-weight: bold;');
console.log('%cAustin\'s Artificial Turf Specialists', 'color: #0066CC; font-size: 14px;');

