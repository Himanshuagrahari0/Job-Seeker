// About Page Functionality

// Testimonial Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentSlide = 0;

// Initialize slider
function initSlider() {
    showSlide(currentSlide);
    
    // Auto-rotate slides every 5 seconds
    setInterval(() => {
        nextSlide();
    }, 5000);
}

// Show specific slide
function showSlide(n) {
    // Hide all slides
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Handle wrap-around
    if (n >= testimonialCards.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = testimonialCards.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Show current slide and activate corresponding dot
    testimonialCards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners for slider controls
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Animate stats on scroll
const statsSection = document.querySelector('.about-hero');
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50; // Divide animation into 50 steps
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent; // Show original text
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + stat.textContent.slice(-1); // Keep the + or % symbol
            }
        }, 30);
    });
}

// Intersection Observer for stats animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Team member hover effects
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-10px)';
    });
    
    member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0)';
    });
});

// Contact form simulation (if added later)
const contactButtons = document.querySelectorAll('.contact-cta .btn-primary, .contact-cta .btn-secondary');

contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.classList.contains('btn-primary')) {
            // Email button
            e.preventDefault();
            window.location.href = 'mailto:contact@jobfinder.com?subject=Inquiry%20from%20JobFinder%20Website';
        } else {
            // Live chat button
            e.preventDefault();
            alert('Live chat feature would open here.\n\nIn a real implementation, this would connect you with a customer support representative.');
        }
    });
});

// Add animation to value cards on scroll
const valueCards = document.querySelectorAll('.value-card');

const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the animations
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

// Set initial state for animation
valueCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    valueObserver.observe(card);
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    
    // Add click effect to social icons
    const socialIcons = document.querySelectorAll('.member-social a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = icon.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            icon.style.position = 'relative';
            icon.style.overflow = 'hidden';
            icon.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show link destination
            const platform = icon.querySelector('i').className.includes('linkedin') ? 'LinkedIn' :
                           icon.querySelector('i').className.includes('twitter') ? 'Twitter' :
                           icon.querySelector('i').className.includes('github') ? 'GitHub' :
                           icon.querySelector('i').className.includes('medium') ? 'Medium' : 'Instagram';
            
            console.log(`Opening ${platform} profile (link disabled in demo)`);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});