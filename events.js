const interviewImages = [
    'interview/MAU team.jpg',
    'interview/IMG-20250510-WA0021.jpg',
    'interview/IMG-20250510-WA0022.jpg',
    'interview/IMG-20250510-WA0023.jpg',
    'interview/IMG-20250510-WA0024.jpg',
    'interview/IMG-20250510-WA0025.jpg',
    'interview/IMG-20250510-WA0026.jpg',
    'interview/IMG-20250510-WA0027.jpg',
    'interview/IMG-20250510-WA0028.jpg',
    'interview/IMG-20250510-WA0030.jpg',
    'interview/IMG-20250510-WA0031.jpg'
];

const outingImages = [
    './Outing/WhatsApp Image 2025-05-10 at 13.24.52_61a85bb6.jpg',
    './Outing/WhatsApp Image 2025-05-10 at 13.24.52_793fcaa3.jpg',
    './Outing/WhatsApp Image 2025-05-10 at 13.24.52_8ed4f527.jpg'
];

const bestMemberImages = [
    'Members of the month/Academics.jpg',
    'Members of the month/Content Writing.jpg',
    'Members of the month/Graphic Design.jpg',
    'Members of the month/HR.jpg',
    'Members of the month/IT.jpg',
    'Members of the month/Logistics.jpg',
    'Members of the month/Marketing .jpg',
    'Members of the month/PR.jpg'
];

document.addEventListener('DOMContentLoaded', function () {
    initCarousel('#interviews .carousel-track', '#interviews .carousel-indicators', 
                '#interviews .prev-btn', '#interviews .next-btn', interviewImages, 'interviews');
    initCarousel('.outings-carousel .carousel-track', '.outings-carousel .carousel-indicators', 
                '.outings-carousel .prev-btn', '.outings-carousel .next-btn', outingImages, 'outings');
    initCarousel('#best-members .carousel-track', '#best-members .carousel-indicators',
                '#best-members .prev-btn', '#best-members .next-btn', bestMemberImages, 'best-members');
    animateOnScroll();
    handleSectionHighlighting();

    const eventsLink = document.querySelector('nav ul li a[href="events.html"]');
    if (eventsLink) {
        eventsLink.classList.add('active');
    }

    fixSvgPaths();

    const style = document.createElement('style');
    style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    
    .active-section {
      position: relative;
    }
    
    .active-section::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, transparent, #00ff88, transparent);
      opacity: 0.7;
    }
  `;
    document.head.appendChild(style);
});

function initCarousel(trackSelector, indicatorsSelector, prevButtonSelector, nextButtonSelector, images, type) {
    const carouselTrack = document.querySelector(trackSelector);
    const indicators = document.querySelector(indicatorsSelector);
    const prevButton = document.querySelector(prevButtonSelector);
    const nextButton = document.querySelector(nextButtonSelector);
    
    if (!carouselTrack || !indicators || !prevButton || !nextButton) return;

    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.setAttribute('data-index', index);

        const slideBg = document.createElement('div');
        slideBg.className = 'carousel-slide-bg';
        slideBg.style.backgroundImage = `url(${image})`;
        
        const img = document.createElement('img');
        img.src = image;
        img.loading = "lazy";

        if (index === 0) {
            if (type === 'interviews') {
                img.alt = 'STEM MAU High Board Members';
                slide.classList.add('special-slide');
                const ribbon = document.createElement('div');
                ribbon.className = 'ribbon';
                ribbon.textContent = 'High Board';
                slide.appendChild(slideBg);
                slide.appendChild(img);
                slide.appendChild(ribbon);
            } else if (type === 'best-members') {
                img.alt = 'STEM MAU Best Member - Academics';
                slide.appendChild(slideBg);
                slide.appendChild(img);
            } else {
                img.alt = 'STEM MAU Outing';
                slide.appendChild(slideBg);
                slide.appendChild(img);
            }
        } else {
            if (type === 'interviews') {
                img.alt = `STEM MAU Interview Session ${index}`;
            } else if (type === 'best-members') {
                const departments = ['Academics', 'Content Writing', 'Graphic Design', 'HR', 'IT', 'Logistics', 'Marketing', 'PR'];
                img.alt = `STEM MAU Best Member - ${departments[index]}`;
            } else {
                img.alt = `STEM MAU Outing Photo ${index}`;
            }
            slide.appendChild(slideBg);
            slide.appendChild(img);
        }

        carouselTrack.appendChild(slide);

        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.setAttribute('data-index', index);
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            resetSlideTimer();
        });
        indicators.appendChild(indicator);
    });

    let currentSlide = 0;
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    const indicatorDots = indicators.querySelectorAll('.indicator');

    let slideInterval;
    let isCarouselVisible = false;

    function resetSlideTimer() {
        clearInterval(slideInterval);

        if (isCarouselVisible) {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            }, 5000);
        }
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
        resetSlideTimer();
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
        resetSlideTimer();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    const carousel = carouselTrack.closest('.carousel');

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > minSwipeDistance) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
            resetSlideTimer();
        } else if (swipeDistance < -minSwipeDistance) {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
            resetSlideTimer();
        }
    }

    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        resetSlideTimer();
    });

    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isCarouselVisible = entry.isIntersecting;

            if (entry.isIntersecting) {
                currentSlide = 0;
                updateCarousel();
                resetSlideTimer();
            } else {
                clearInterval(slideInterval);
            }
        });
    }, {
        threshold: 0.3
    });

    carouselObserver.observe(carousel);

    function updateCarousel() {
        const isLooping = (currentSlide === 0 && carouselTrack.style.transform &&
            carouselTrack.style.transform.includes(`-${(slides.length - 1) * 100}%`));

        const carouselContainer = carouselTrack.closest('.carousel-container');

        if (isLooping) {
            carouselContainer.classList.add('loop-transition');

            carouselTrack.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            carouselTrack.style.opacity = '0';

            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                carouselTrack.style.transform = 'translateX(0)';

                setTimeout(() => {
                    carouselTrack.style.transition = 'opacity 0.5s ease';
                    carouselTrack.style.opacity = '1';

                    setTimeout(() => {
                        carouselContainer.classList.remove('loop-transition');
                    }, 500);
                }, 50);
            }, 500);
        } else {
            carouselTrack.style.transition = 'transform 0.5s ease';
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            carouselTrack.style.opacity = '1';
        }

        indicatorDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    updateCarousel();
}

function fixSvgPaths() {
    const prevSvgPaths = document.querySelectorAll('.prev-btn svg path');
    const nextSvgPaths = document.querySelectorAll('.next-btn svg path');

    prevSvgPaths.forEach(path => {
        path.setAttribute('d', 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z');
    });

    nextSvgPaths.forEach(path => {
        path.setAttribute('d', 'M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z');
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.section-container, .carousel-container, .outing-placeholder, .cta-container');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, 150);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const style = document.createElement('style');
    style.textContent = `
    .section-container, .carousel-container, .outing-placeholder, .cta-container {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .reveal {
      opacity: 1;
      transform: translateY(0);
    }
    
    .special-slide {
      border: 3px solid #00ff88;
    }
    
    #interviews {
      transition-delay: 0.1s;
    }
    
    .carousel-container {
      transition-delay: 0.3s;
    }
    
    #outings {
      transition-delay: 0.1s;
    }
    
    .outing-placeholder {
      transition-delay: 0.3s;
    }
    
    #join-events {
      transition-delay: 0.1s;
    }
  `;
    document.head.appendChild(style);

    elements.forEach(element => {
        observer.observe(element);
    });
}

function handleSectionHighlighting() {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.2, 0.5, 0.8]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                entry.target.classList.add('active-section');

                if (entry.target.id === 'interviews' || entry.target.id === 'outings') {
                    const carousel = entry.target.querySelector('.carousel-container');
                    if (carousel && !carousel.classList.contains('highlighted')) {
                        carousel.classList.add('highlighted');
                        carousel.style.animation = 'pulse 2s';
                    }
                }
            } else {
                entry.target.classList.remove('active-section');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-bg');
    if (header) {
        const scrollPosition = window.scrollY;
        header.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            section.classList.add('active-section');
        } else {
            section.classList.remove('active-section');
        }
    });
});

function initBestMembers() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const department = item.getAttribute('data-department');
            const imagePath = `Members of the month/${department}.jpg`;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'member-modal';
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            // Create image
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = `${department} Best Member`;
            
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '&times;';
            
            // Add elements to modal
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(img);
            modal.appendChild(modalContent);
            
            // Add modal to body
            document.body.appendChild(modal);
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .member-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .member-modal.active {
                    opacity: 1;
                }
                
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90vh;
                }
                
                .modal-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    object-fit: contain;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                }
                
                .modal-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 30px;
                    cursor: pointer;
                    padding: 5px 10px;
                    transition: transform 0.3s ease;
                }
                
                .modal-close:hover {
                    transform: scale(1.2);
                }
            `;
            document.head.appendChild(style);
            
            // Show modal
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Close modal on click
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target === closeBtn) {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.remove();
                    }, 300);
                }
            });
        });
    });
}