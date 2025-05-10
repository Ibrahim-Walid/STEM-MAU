// highboard.js

// Preloader
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.classList.add('loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1500);
  }
});

// Navigation menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Navbar shrink effect on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add('shrunk');
    } else {
      nav.classList.remove('shrunk');
    }
  }
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Add smooth animation to member cards
document.addEventListener('DOMContentLoaded', () => {
  const memberCards = document.querySelectorAll('.member-card');
  
  memberCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 200 + (index * 100));
  });

  // Animate track sections
  const trackSections = document.querySelectorAll('.track-section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('track-section-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  trackSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    sectionObserver.observe(section);
  });
  
  // Add track-section-visible class to actually trigger the animation
  document.addEventListener('scroll', () => {
    trackSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      
      if (sectionTop < window.innerHeight - 100 && sectionBottom > 0) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  }, { passive: true });
  
  // Add hover effects to track icons
  const trackIcons = document.querySelectorAll('.track-icon');
  
  trackIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.2) rotate(5deg)';
      icon.style.color = '#00ff88';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1) rotate(0deg)';
      icon.style.color = '';
    });
    
    // Set up the transition
    icon.style.transition = 'transform 0.3s ease, color 0.3s ease';
  });
}); 