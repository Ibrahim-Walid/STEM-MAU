// Gallery images array with titles and descriptions
const galleryImages = [
    {
        src: './conference/IMG-20250501-WA0016.jpg',
        alt: 'STEM MAU Conference session'
    },
    {
        src: './conference/IMG-20250501-WA0015.jpg',
        alt: 'STEM MAU Conference delegates'
    },
    {
        src: './conference/IMG-20250501-WA0014.jpg',
        alt: 'STEM MAU Conference discussion'
    },
    {
        src: './conference/IMG-20250501-WA0013.jpg',
        alt: 'STEM MAU Conference presentation'
    },
    {
        src: './conference/IMG-20250501-WA0012.jpg',
        alt: 'STEM MAU Conference team'
    },
    {
        src: './conference/IMG-20250501-WA0011.jpg',
        alt: 'STEM MAU Conference debate'
    },
    {
        src: './conference/IMG-20250501-WA0010.jpg',
        alt: 'STEM MAU Conference meeting'
    },
    {
        src: './conference/IMG-20250501-WA0009.jpg',
        alt: 'STEM MAU Conference participants'
    }
];

// Conference page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize certificate carousel
    initCertificateCarousel();
    
    // Add animation on scroll for sections
    initScrollAnimations();
    
    // Set active link in navigation
    const conferenceLink = document.querySelector('nav ul li a[href="conference.html"]');
    if (conferenceLink) {
        conferenceLink.classList.add('active');
    }
    
    // Initialize menu tabs
    initMenuTabs();
    
    // Initialize gallery carousel
    initGalleryCarousel();
    
    // Add enhanced scroll animation functionality
    setupScrollReveal();
    
    // Force all tabs to be closed on mobile
    if (window.innerWidth <= 768) {
        const menuTabs = document.querySelectorAll('.menu-tab');
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
    }
    // Ensure at least one tab is active on desktop
    else {
        const firstTab = document.querySelector('.menu-tab');
        const firstItem = document.querySelector('.menu-item');
        if (firstTab && firstItem) {
            firstTab.classList.add('active');
            firstItem.classList.add('active');
        }
    }
});

// Certificate Carousel Functionality
function initCertificateCarousel() {
    const wrapper = document.querySelector('.certificate-wrapper');
    const prevBtn = document.querySelector('.certificate-prev');
    const nextBtn = document.querySelector('.certificate-next');
    const indicatorsContainer = document.querySelector('.certificate-indicators');
    
    // Clear existing content and create slides with backgrounds
    wrapper.innerHTML = '';
    
    // Get all certificate images
    const certificateImages = [
        './conference/Certificate/IMG-20250501-WA0006.jpg',
        './conference/Certificate/IMG-20250501-WA0005.jpg',
        './conference/Certificate/IMG-20250501-WA0004.jpg',
        './conference/Certificate/IMG-20250501-WA0003.jpg',
        './conference/Certificate/IMG-20250501-WA0002.jpg'
    ];
    
    // Create slides with blurred backgrounds
    certificateImages.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'certificate-slide';
        
        // Create blurred background
        const slideBg = document.createElement('div');
        slideBg.className = 'certificate-slide-bg';
        slideBg.style.backgroundImage = `url(${imgSrc})`;
        
        // Create image
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "STEM MAU Conference Certificate";
        if (index === 0) {
            img.classList.add('active');
        }
        
        // Append elements
        slide.appendChild(slideBg);
        slide.appendChild(img);
        wrapper.appendChild(slide);
    });
    
    const certificates = wrapper.querySelectorAll('img');
    let currentIndex = 0;
    
    // Clear existing indicators
    indicatorsContainer.innerHTML = '';
    
    // Create indicators
    certificates.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.certificate-indicators .indicator');
    
    // Function to go to a specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Previous slide button
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        updateCarousel();
        resetSlideTimer();
    });
    
    // Next slide button
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % certificates.length;
        updateCarousel();
        resetSlideTimer();
    });
    
    // Update carousel position
    function updateCarousel() {
        const isLooping = (currentIndex === 0 && wrapper.style.transform && 
            wrapper.style.transform.includes(`-${(certificates.length - 1) * 100}%`));
        
        if (isLooping) {
            // Create a smooth transition when looping from last to first slide
            wrapper.style.transition = 'opacity 0.3s ease';
            wrapper.style.opacity = '0';
            
            setTimeout(() => {
                wrapper.style.transition = 'none';
                wrapper.style.transform = 'translateX(0)';
                
                setTimeout(() => {
                    wrapper.style.transition = 'opacity 0.3s ease';
                    wrapper.style.opacity = '1';
                }, 50);
            }, 300);
        } else {
            wrapper.style.transition = 'transform 0.5s ease';
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            wrapper.style.opacity = '1';
        }
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Make sure images are properly sized
        certificates.forEach((img, index) => {
            if (index === currentIndex) {
                img.style.maxHeight = '100%';
                img.style.objectFit = 'contain';
            }
        });
    }
    
    // Auto-rotate slides every 5 seconds
    let slideInterval;
    
    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % certificates.length;
            updateCarousel();
        }, 5000);
    }
    
    // Pause auto-rotation when hovering over the carousel
    wrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    wrapper.addEventListener('mouseleave', () => {
        resetSlideTimer();
    });
    
    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (swipeDistance > minSwipeDistance) {
            currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
            updateCarousel();
            resetSlideTimer();
        } else if (swipeDistance < -minSwipeDistance) {
            currentIndex = (currentIndex + 1) % certificates.length;
            updateCarousel();
            resetSlideTimer();
        }
    }
    
    // Initialize
    updateCarousel();
    resetSlideTimer();
    
    // Check visibility with Intersection Observer
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resetSlideTimer();
            } else {
                clearInterval(slideInterval);
            }
        });
    }, {
        threshold: 0.3
    });

    carouselObserver.observe(wrapper.closest('.certificate-carousel'));
}

// Animation on scroll functionality
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate highlight items when they come into view
                if (entry.target.id === 'conference-overview') {
                    const items = entry.target.querySelectorAll('.highlight-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 200 * index);
                    });
                }
                
                // Animate gallery items when they come into view
                if (entry.target.id === 'conference-gallery') {
                    const items = entry.target.querySelectorAll('.carousel-slide');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 100 * index);
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Menu tabs functionality
function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuTabArrows = document.querySelectorAll('.menu-tab-arrow');
    const spacer = document.getElementById('mobile-menu-spacer');
    
    // Function to check if we're on a mobile device
    function isMobileView() {
        return window.innerWidth <= 768;
    }
    
    // Function to handle tab clicks
    function handleTabClick(e) {
        const tab = e.currentTarget;
        const tabId = tab.getAttribute('data-tab');
        const targetItem = document.getElementById(tabId);
        
        if (isMobileView()) {
            // MOBILE BEHAVIOR
            
            // If the tab is already active (open), close it
            if (tab.classList.contains('active')) {
                tab.classList.remove('active');
                targetItem.classList.remove('active');
                
                // Reset menu item styling
                targetItem.style.maxHeight = '0';
                targetItem.style.opacity = '0';
                targetItem.style.transform = 'translateY(-10px)';
                
                // Immediately start reducing the spacer height
                spacer.style.height = '0';
                
                return;
            }
            
            // Close all tabs first
            menuTabs.forEach(t => {
                t.classList.remove('active');
            });
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = '0';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
            });
            
            // Open the clicked tab
            tab.classList.add('active');
            targetItem.classList.add('active');
            
            // Measure the content height before animation
            const contentHeight = targetItem.scrollHeight;
            
            // Set the height and opacity for animation
            targetItem.style.maxHeight = contentHeight + 'px';
            targetItem.style.opacity = '1';
            targetItem.style.transform = 'translateY(0)';
            
            // Immediately adjust the spacer to make room for the content
            spacer.style.height = (contentHeight + 50) + 'px';
            
            // Scroll to show the opened tab - slight delay to allow for visual updates
            setTimeout(() => {
                const tabRect = tab.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                window.scrollTo({
                    top: scrollTop + tabRect.top - 100,
                    behavior: 'smooth'
                });
            }, 50);
        } else {
            // DESKTOP BEHAVIOR - traditional tabs
            
            // Close all tabs first
            menuTabs.forEach(t => t.classList.remove('active'));
            menuItems.forEach(item => {
                item.classList.remove('active');
                // Clear any inline styles that might have been applied on mobile
                item.style.maxHeight = '';
                item.style.opacity = '';
                item.style.transform = '';
            });
            
            // Open the clicked tab
            tab.classList.add('active');
            targetItem.classList.add('active');
            
            // Reset spacer on desktop (just in case)
            if (spacer) spacer.style.height = '0';
        }
    }
    
    // Add click event to all tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });
    
    // Setup initial layout based on screen size
    function setupLayout() {
        if (isMobileView()) {
            // Mobile layout - initially all tabs are closed
            menuTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = '0';
                item.style.opacity = '0';
            });
            
            // Show arrows on mobile
            menuTabArrows.forEach(arrow => {
                arrow.style.display = 'inline-block';
            });
            
            // Reset spacer
            if (spacer) spacer.style.height = '0';
        } else {
            // Desktop layout - ensure at least one tab is active
            const activeTab = document.querySelector('.menu-tab.active');
            const activeItem = document.querySelector('.menu-item.active');
            
            if (!activeTab || !activeItem) {
                menuTabs[0].classList.add('active');
                menuItems[0].classList.add('active');
            }
            
            // Hide arrows on desktop
            menuTabArrows.forEach(arrow => {
                arrow.style.display = 'none';
            });
            
            // Clear any inline styles from mobile view
            menuItems.forEach(item => {
                item.style.maxHeight = '';
                item.style.opacity = '';
                item.style.transform = '';
            });
            
            // Reset spacer
            if (spacer) spacer.style.height = '0';
        }
    }
    
    // Initial setup
    setupLayout();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            setupLayout();
        }, 250); // Debounce resize events
    });
}

// Gallery carousel initialization
function initGalleryCarousel() {
    const carousel = document.querySelector('.conference-carousel');
    const track = carousel.querySelector('.carousel-track');
    const nextButton = carousel.querySelector('.next-btn');
    const prevButton = carousel.querySelector('.prev-btn');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    let currentIndex = 0;
    let autoRotateInterval;
    let isAutoRotating = true;

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoRotate();
            } else {
                stopAutoRotate();
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(carousel);

    function startAutoRotate() {
        if (!isAutoRotating) {
            isAutoRotating = true;
            autoRotateInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }, 5000);
        }
    }

    function stopAutoRotate() {
        if (isAutoRotating) {
            isAutoRotating = false;
            clearInterval(autoRotateInterval);
        }
    }

    function resetAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
    }

    // Clear existing content
    track.innerHTML = '';
    
    // Create slides
    galleryImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.setAttribute('data-index', index);
        
        const slideBg = document.createElement('div');
        slideBg.className = 'carousel-slide-bg';
        slideBg.style.backgroundImage = `url(${image.src})`;
        
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        
        slide.appendChild(slideBg);
        slide.appendChild(imgElement);
        track.appendChild(slide);
    });
    
    const slides = track.querySelectorAll('.carousel-slide');
    
    // Clear existing indicators
    indicatorsContainer.innerHTML = '';
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoRotate();
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    
    // Previous slide button
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        resetAutoRotate();
    });
    
    // Next slide button
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
        resetAutoRotate();
    });
    
    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                // Swipe right
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            updateCarousel();
            resetAutoRotate();
        }
    }
    
    // Initialize the carousel
    updateCarousel();
    startAutoRotate();
}

// Add styling for the lightbox component
const style = document.createElement('style');
style.textContent = `
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    animation: fadeIn 0.3s forwards;
}

.lightbox-content {
    max-width: 80%;
    max-height: 80%;
    position: relative;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transform: scale(0.9);
    animation: scaleIn 0.3s forwards;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 70vh;
    display: block;
    object-fit: contain;
}

.lightbox-info {
    padding: 20px;
    color: #333;
}

.lightbox-info h3 {
    margin: 0 0 10px;
    font-size: 20px;
    color: #1A5C38;
}

.lightbox-info p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
}

.lightbox-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: white;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 1;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

@keyframes scaleIn {
    to { transform: scale(1); }
}

section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

section.visible {
    opacity: 1;
    transform: translateY(0);
}

.highlight-item, .gallery-item, .carousel-slide {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.highlight-item.visible, .gallery-item.visible, .carousel-slide.visible {
    opacity: 1;
    transform: translateY(0);
}
`;

document.head.appendChild(style);

// Lightbox functionality for gallery images
document.addEventListener('click', function(e) {
    const carouselSlide = e.target.closest('.carousel-slide');
    if (carouselSlide) {
        const imgSrc = carouselSlide.querySelector('img').src;
        const title = carouselSlide.querySelector('.overlay-content h3').textContent;
        const description = carouselSlide.querySelector('.overlay-content p').textContent;
        
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        
        const content = document.createElement('div');
        content.classList.add('lightbox-content');
        
        const img = document.createElement('img');
        img.src = imgSrc;
        
        const info = document.createElement('div');
        info.classList.add('lightbox-info');
        info.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('lightbox-close');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        });
        
        // Add elements to the DOM
        content.appendChild(img);
        content.appendChild(info);
        content.appendChild(closeBtn);
        lightbox.appendChild(content);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox when clicking outside content
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Setup scroll reveal animations
function setupScrollReveal() {
    // Add the scroll-reveal class to elements we want to animate
    const elementsToAnimate = document.querySelectorAll('.conference-description, .conference-highlights, .highlight-item, .gallery-grid, section h2');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Function to handle scroll events
    function handleScroll() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initial check and add scroll event listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);
} 