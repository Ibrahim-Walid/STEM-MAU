document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles animation
    initParticles();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize timeline animations
    initTimelineAnimations();

    // Smooth scroll for hash links
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

    // Handle main page links
    document.querySelectorAll('.main-page-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            localStorage.setItem('scrollToSection', sectionId);
            window.location.href = 'index.html#' + sectionId;
        });
    });

    // Handle home link
    document.querySelector('.nav-home-link').addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.setItem('scrollToSection', 'home');
        window.location.href = 'index.html';
    });

    // Handle contact button
    const contactButton = document.getElementById('contactButton');
    if (contactButton) {
        contactButton.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.setItem('scrollToSection', 'contact');
            window.location.href = 'index.html#contact';
        });
    }
});

function initParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: -${Math.random() * 10}s;
        `;
        particles.appendChild(particle);
    }
}

function initScrollAnimations() {
    const cards = document.querySelectorAll('.alumni-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add hover effect for alumni cards
document.querySelectorAll('.alumni-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.university-badge').style.transform = 'translateY(-10px) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.university-badge').style.transform = 'translateY(0) rotate(0)';
    });
}); 