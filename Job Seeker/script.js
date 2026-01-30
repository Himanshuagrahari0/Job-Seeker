// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Company Card Click Redirection
const companyCards = document.querySelectorAll('.company-card');

companyCards.forEach(card => {
    card.addEventListener('click', () => {
        const companyId = card.id;
        let jobPageUrl = '';
        
        switch(companyId) {
            case 'microsoft':
                jobPageUrl = 'https://careers.microsoft.com/us/en';
                break;
            case 'google':
                jobPageUrl = 'https://careers.google.com/';
                break;
            case 'samsung':
                jobPageUrl = 'https://www.samsung.com/us/careers/';
                break;
            case 'apple':
                jobPageUrl = 'https://www.apple.com/careers/us/';
                break;
            case 'amazon':
                jobPageUrl = 'https://www.amazon.jobs/';
                break;
            case 'meta':
                jobPageUrl = 'https://www.metacareers.com/';
                break;
            default:
                jobPageUrl = '#';
        }
        
        // Open job page in new tab
        window.open(jobPageUrl, '_blank');
    });
});

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.company-card, .feature-card').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});