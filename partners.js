document.addEventListener('DOMContentLoaded', function () {
  const partnerCards = document.querySelectorAll('.partner-card');

  if (partnerCards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    partnerCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s ease, border-color 0.35s ease';
      observer.observe(card);
    });
  }
});
