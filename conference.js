// Gallery images array with titles and descriptions
const galleryImages = [
    {
        src: './Conference/IMG-20250501-WA0016.jpg',
        alt: 'STEM MAU Conference session'
    },
    {
        src: './Conference/IMG-20250501-WA0015.jpg',
        alt: 'STEM MAU Conference delegates'
    },
    {
        src: './Conference/IMG-20250501-WA0014.jpg',
        alt: 'STEM MAU Conference discussion'
    },
    {
        src: './Conference/IMG-20250501-WA0013.jpg',
        alt: 'STEM MAU Conference presentation'
    },
    {
        src: './Conference/IMG-20250501-WA0012.jpg',
        alt: 'STEM MAU Conference team'
    },
    {
        src: './Conference/IMG-20250501-WA0011.jpg',
        alt: 'STEM MAU Conference debate'
    },
    {
        src: './Conference/IMG-20250501-WA0010.jpg',
        alt: 'STEM MAU Conference meeting'
    },
    {
        src: './Conference/IMG-20250501-WA0009.jpg',
        alt: 'STEM MAU Conference participants'
    }
];

function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = ''; 
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                const diplomacyText = document.querySelector('.header-content h1');
                if (diplomacyText) {
                    typeWriterEffect(diplomacyText, "STEM MAU Conference", 100);
                }
            }, 500);
        });
    }

    initCertificateCarousel();
    
    initScrollAnimations();
    
    const conferenceLink = document.querySelector('nav ul li a[href="conference.html"]');
    if (conferenceLink) {
        conferenceLink.classList.add('active');
    }
    
    initMenuTabs();
    
    initGalleryCarousel();

    setupScrollReveal();
    
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
    else {
        const firstTab = document.querySelector('.menu-tab');
        const firstItem = document.querySelector('.menu-item');
        if (firstTab && firstItem) {
            firstTab.classList.add('active');
            firstItem.classList.add('active');
        }
    }
});

function initCertificateCarousel() {
    const wrapper = document.querySelector('.certificate-wrapper');
    const prevBtn = document.querySelector('.certificate-prev');
    const nextBtn = document.querySelector('.certificate-next');
    const indicatorsContainer = document.querySelector('.certificate-indicators');
    
    wrapper.innerHTML = '';
    
    const certificateImages = [
        './Conference/Certificate/IMG-20250501-WA0006.jpg',
        './Conference/Certificate/IMG-20250501-WA0005.jpg',
        './Conference/Certificate/IMG-20250501-WA0004.jpg',
        './Conference/Certificate/IMG-20250501-WA0003.jpg',
        './Conference/Certificate/IMG-20250501-WA0002.jpg'
    ];
    
    certificateImages.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'certificate-slide';
        
        const slideBg = document.createElement('div');
        slideBg.className = 'certificate-slide-bg';
        slideBg.style.backgroundImage = `url(${imgSrc})`;
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = "STEM MAU Conference Certificate";
        if (index === 0) {
            img.classList.add('active');
        }
        
        slide.appendChild(slideBg);
        slide.appendChild(img);
        wrapper.appendChild(slide);
    });
    
    const certificates = wrapper.querySelectorAll('img');
    let currentIndex = 0;
    
    indicatorsContainer.innerHTML = '';
    
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

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
        updateCarousel();
        resetSlideTimer();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % certificates.length;
        updateCarousel();
        resetSlideTimer();
    });

    function updateCarousel() {
        const isLooping = (currentIndex === 0 && wrapper.style.transform && 
            wrapper.style.transform.includes(`-${(certificates.length - 1) * 100}%`));
        
        if (isLooping) {
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
        
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        certificates.forEach((img, index) => {
            if (index === currentIndex) {
                img.style.maxHeight = '100%';
                img.style.objectFit = 'contain';
            }
        });
    }
    
    let slideInterval;
    
    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % certificates.length;
            updateCarousel();
        }, 5000);
    }
    
    wrapper.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    wrapper.addEventListener('mouseleave', () => {
        resetSlideTimer();
    });
    
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
    
    updateCarousel();
    resetSlideTimer();
    
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

function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.id === 'conference-overview') {
                    const items = entry.target.querySelectorAll('.highlight-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 200 * index);
                    });
                }
                
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

function initMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuTabArrows = document.querySelectorAll('.menu-tab-arrow');
    const spacer = document.getElementById('mobile-menu-spacer');
    
    function isMobileView() {
        return window.innerWidth <= 768;
    }
    
    function handleTabClick(e) {
        const tab = e.currentTarget;
        const tabId = tab.getAttribute('data-tab');
        const targetItem = document.getElementById(tabId);
        
        if (isMobileView()) {

            if (tab.classList.contains('active')) {
                tab.classList.remove('active');
                targetItem.classList.remove('active');
                
                targetItem.style.maxHeight = '0';
                targetItem.style.opacity = '0';
                targetItem.style.transform = 'translateY(-10px)';
                
                spacer.style.height = '0';
                
                return;
            }
            
            menuTabs.forEach(t => {
                t.classList.remove('active');
            });
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = '0';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
            });
            
            tab.classList.add('active');
            targetItem.classList.add('active');
            
            const contentHeight = targetItem.scrollHeight;
            
            targetItem.style.maxHeight = contentHeight + 'px';
            targetItem.style.opacity = '1';
            targetItem.style.transform = 'translateY(0)';
            
            spacer.style.height = (contentHeight + 50) + 'px';
            
            setTimeout(() => {
                const tabRect = tab.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                window.scrollTo({
                    top: scrollTop + tabRect.top - 100,
                    behavior: 'smooth'
                });
            }, 50);
        } else {
            
            menuTabs.forEach(t => t.classList.remove('active'));
            menuItems.forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = '';
                item.style.opacity = '';
                item.style.transform = '';
            });
            
            tab.classList.add('active');
            targetItem.classList.add('active');
            
            if (spacer) spacer.style.height = '0';
        }
    }
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', handleTabClick);
    });
    
    function setupLayout() {
        if (isMobileView()) {
            menuTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            menuItems.forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = '0';
                item.style.opacity = '0';
            });
            
            menuTabArrows.forEach(arrow => {
                arrow.style.display = 'inline-block';
            });
            
            if (spacer) spacer.style.height = '0';
        } else {
            const activeTab = document.querySelector('.menu-tab.active');
            const activeItem = document.querySelector('.menu-item.active');
            
            if (!activeTab || !activeItem) {
                menuTabs[0].classList.add('active');
                menuItems[0].classList.add('active');
            }
            
            menuTabArrows.forEach(arrow => {
                arrow.style.display = 'none';
            });
            
            menuItems.forEach(item => {
                item.style.maxHeight = '';
                item.style.opacity = '';
                item.style.transform = '';
            });
            
            if (spacer) spacer.style.height = '0';
        }
    }
    
    setupLayout();
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            setupLayout();
        }, 250); 
    });
}

function initGalleryCarousel() {
    const carousel = document.querySelector('.conference-carousel');
    const track = carousel.querySelector('.carousel-track');
    const nextButton = carousel.querySelector('.next-btn');
    const prevButton = carousel.querySelector('.prev-btn');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    let currentIndex = 0;
    let autoRotateInterval;
    let isAutoRotating = true;

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

    track.innerHTML = '';

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
    
    indicatorsContainer.innerHTML = '';
    
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
    
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        resetAutoRotate();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
        resetAutoRotate();
    });
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
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
                currentIndex = (currentIndex + 1) % slides.length;
            } else {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            }
            updateCarousel();
            resetAutoRotate();
        }
    }

    updateCarousel();
    startAutoRotate();
}

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

document.addEventListener('click', function(e) {
    const carouselSlide = e.target.closest('.carousel-slide');
    if (carouselSlide) {
        const imgSrc = carouselSlide.querySelector('img').src;
        const title = carouselSlide.querySelector('.overlay-content h3').textContent;
        const description = carouselSlide.querySelector('.overlay-content p').textContent;
        
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
        
        content.appendChild(img);
        content.appendChild(info);
        content.appendChild(closeBtn);
        lightbox.appendChild(content);
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
        });
    }
});

function setupScrollReveal() {
    const elementsToAnimate = document.querySelectorAll('.conference-description, .conference-highlights, .highlight-item, .gallery-grid, section h2');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    function handleScroll() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('revealed');
            }
        });
    }
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
} 