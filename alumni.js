document.addEventListener('DOMContentLoaded', function () {
  const profiles = document.querySelectorAll('.alumni-profile');

  if (profiles.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    profiles.forEach((card, index) => {
      card.style.transitionDelay = `${(index % 4) * 0.08}s`;
      card.style.transition =
        'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.35s ease, border-color 0.35s ease';
      observer.observe(card);
    });
  }
});
