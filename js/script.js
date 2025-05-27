// Initialize AOS
AOS.init();

// DOM Elements
const contentBtn = document.querySelector('.content-btn');
const navCard = document.querySelector('.nav-card');
const closeCardBtn = document.querySelector('.close-card');
const navLinks = document.querySelectorAll('.nav-links li a');
const header = document.querySelector('header');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section');
const scrollTopBtn = document.querySelector('.scroll-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const preloader = document.querySelector('.preloader');
const tabBtns = document.querySelectorAll('.tab-btn');
const timelineContents = document.querySelectorAll('.timeline-content');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const overlayLinks = document.querySelectorAll('.nav-overlay a');
const tabPanes = document.querySelectorAll('.tab-pane');

// Preloader
window.addEventListener('load', () => {
    preloader.style.display = 'none';
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Automatically update the copyright year
    updateCopyrightYear();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize tab switching
    initTabSwitching();
    
    // Check for hero image and create fallback if needed
    checkHeroImage();
});

// Toggle navigation card
contentBtn.addEventListener('click', () => {
    navCard.classList.toggle('active');
    contentBtn.classList.toggle('active');
});

// Close card when close button is clicked
closeCardBtn.addEventListener('click', () => {
    navCard.classList.remove('active');
    contentBtn.classList.remove('active');
});

// Close card when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navCard.classList.remove('active');
        contentBtn.classList.remove('active');
    });
});

// Close card on escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navCard.classList.contains('active')) {
        navCard.classList.remove('active');
        contentBtn.classList.remove('active');
    }
});

// Close card when clicking outside
document.addEventListener('click', (e) => {
    if (navCard.classList.contains('active') && 
        !navCard.contains(e.target) && 
        !contentBtn.contains(e.target)) {
        navCard.classList.remove('active');
        contentBtn.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target element
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Get header height for offset
            const headerHeight = document.querySelector('header').offsetHeight;
            
            // Calculate the target position with offset
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Project Filtering
function initProjectFilters() {
    if (!filterBtns.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 10);
                } else {
                    card.classList.remove('show');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Tab Switching for Timeline
function initTabSwitching() {
    if (!tabBtns.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get the target tab
            const target = btn.getAttribute('data-tab');
            
            // Hide all tab panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the target pane
            document.getElementById(`${target}-tab`).classList.add('active');
        });
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    if (!testimonials.length) return;
    
    let currentSlide = 0;
    
    // Show current slide
    function showSlide(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        testimonials[index].classList.add('active');
        
        // Add active class to current dot
        testimonialDots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    }
    
    // Add event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Add event listeners to dots
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // In a real application, you would send the form data to a server
        // For this demo, we'll just show a success message
        showNotification(`Thank you for your message, ${name}! I'll get back to you soon.`, 'success');
        
        // Reset the form
        contactForm.reset();
    });
}

// Show Notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Add active class after a small delay
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Add scroll animations to elements
function initScrollAnimations() {
    // Add fade-in animation to sections when scrolled into view
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '-50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animate skill bars if this is the skills section
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Update header styling on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide scroll-to-top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

// Scroll to top
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update the year in the copyright notice
function updateCopyrightYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}

// Type writing effect for the hero section
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.querySelector('.hero h1 .highlight');
    if (typewriterElement) {
        const name = typewriterElement.textContent;
        typewriterElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < name.length) {
                typewriterElement.textContent += name.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                // Add blinking cursor effect after typing
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                typewriterElement.appendChild(cursor);
            }
        }
        
        setTimeout(() => {
            typeWriter();
        }, 1000);
    }
});

// Check for hero image and create fallback if needed
function checkHeroImage() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        // Create a fallback in case the image doesn't load
        heroImage.onerror = function() {
            createPlaceholderImage(this);
        };
        
        // Also check if the image is already loaded but broken
        if (heroImage.complete && (heroImage.naturalWidth === 0 || heroImage.naturalHeight === 0)) {
            createPlaceholderImage(heroImage);
        }
    }
}

// Create a placeholder image with initials
function createPlaceholderImage(imgElement) {
    // Get name from the alt attribute or use a default
    const name = imgElement.alt || 'Your Name';
    const initials = name.split(' ').map(n => n[0]).join('');
    
    // Create canvas for the placeholder
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set dimensions
    canvas.width = 350;
    canvas.height = 450;
    
    // Draw background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#255F38'); // Medium green
    gradient.addColorStop(1, '#1F7D53'); // Teal green
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw initials
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, canvas.width / 2, canvas.height / 2);
    
    // Replace the broken image with the canvas data
    imgElement.src = canvas.toDataURL('image/png');
}

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabsContainer = document.querySelector('.tabs-container');
    let isFirstClick = true;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Show container on first click
            if (isFirstClick) {
                tabsContainer.classList.add('show');
                isFirstClick = false;
            }

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}); 