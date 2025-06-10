// Typing animation using requestAnimationFrame
document.addEventListener('DOMContentLoaded', () => {
    const texts = ['Full Stack Developer', 'Undergrad', 'Problem Solver', 'Tech Enthusiast'];
    const typingElement = document.querySelector('.typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let lastTimestamp = 0;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function type(timestamp) {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;

        if ((isDeleting && elapsed > deletingSpeed) || (!isDeleting && elapsed > typingSpeed)) {
            const currentText = texts[textIndex];
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingElement.textContent = currentText.substring(0, charIndex) + '|';
            lastTimestamp = timestamp;

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(() => requestAnimationFrame(type), pauseTime);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        requestAnimationFrame(type);
    }

    if (typingElement) {
        typingElement.textContent = '|';
        requestAnimationFrame(type);
    }
});

// Smooth scrolling for navigation links
function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar scroll effect
function initializeNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

// Mobile navigation toggle
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Animate elements on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Animate skill tags on hover
function initializeSkillTags() {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Form submission
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
}

// Button loading animation
function initializeButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.type !== 'submit') return;

            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
}

// Parallax effect for hero image
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const heroImage = document.querySelector('.hero-image');

        if (heroImage) {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Floating animation delay for project cards
function initializeProjectCards() {
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Dynamic copyright
function updateCopyright() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-content p');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Pranav Reddy. All rights reserved.`;
    }
}

// Initialize everything
function initializeWebsite() {
    initializeNavigation();
    initializeNavbarScroll();
    initializeMobileNav();
    initializeScrollAnimations();
    initializeSkillTags();
    initializeContactForm();
    initializeButtons();
    initializeParallax();
    initializeProjectCards();
    updateCopyright();
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', initializeWebsite);
