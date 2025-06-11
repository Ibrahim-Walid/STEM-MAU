document.addEventListener('DOMContentLoaded', () => {
    const preloaderContainer = document.querySelector('.preloader-container');
    if (preloaderContainer) {
        setTimeout(() => {
            preloaderContainer.classList.add('hidden');
        }, 2000); // 2000 milliseconds = 2 seconds
    }

    const sections = document.querySelectorAll('section');

    const fadeIn = (element) => {
        let opacity = 0;
        element.style.opacity = 0;
        element.style.transition = 'opacity 1s ease-in';

        let interval = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.05;
                element.style.opacity = opacity;
            } else {
                clearInterval(interval);
            }
        }, 50);
    };

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const handleScroll = () => {
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                fadeIn(section);
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
});
