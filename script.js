window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

if (window.history.scrollRestoration) {
  window.history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

let isReload = sessionStorage.getItem('pageReload') === 'true';
sessionStorage.setItem('pageReload', 'true');

if (isReload && window.location.hash) {
  history.pushState("", document.title, window.location.pathname);
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);

  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.classList.add('loaded');
      setTimeout(() => {
        preloader.style.display = 'none';

        const scrollToSection = localStorage.getItem('scrollToSection');
        if (scrollToSection) {
          const targetSection = document.getElementById(scrollToSection);
          if (targetSection) {
            setTimeout(() => {
              targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            localStorage.removeItem('scrollToSection');
          }
        }
        else if (window.location.hash && !isReload) {
          const targetId = window.location.hash.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            setTimeout(() => {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }
      }, 500);
    }, 1500);
  }
});

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

const typewriterText = "BUILD A BETTER AFRICA";
let i = 0;
const speed = 100;

function typeWriter() {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;
  if (i === 0) {
    typewriterElement.innerHTML = "";
  }
  if (i < typewriterText.length) {
    typewriterElement.innerHTML += typewriterText.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

window.addEventListener('load', () => {
  setTimeout(typeWriter, 2000);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      history.pushState(null, null, '#' + targetId);
    }
  });
});

const cards = document.querySelectorAll('.event-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
});

const counters = document.querySelectorAll('.stats-card h3');
const speedCount = 200;

function countUp(element) {
  const target = parseInt(element.getAttribute('data-target'), 10);
  if (isNaN(target)) return;
  const increment = target / speedCount;
  let count = 0;

  const updateCount = () => {
    count += increment;
    if (count < target) {
      element.textContent = Math.ceil(count) + (target > 10 ? '+' : '');
      setTimeout(updateCount, 10);
    } else {
      element.textContent = target + (target > 10 ? '+' : '');
    }
  };

  updateCount();
}

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          counters.forEach(counter => {
            if (counter.getAttribute('data-animated') !== 'true') {
              counter.setAttribute('data-animated', 'true');
              countUp(counter);
            }
          });
        }, 2000);
        observer.unobserve(statsSection);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

document.querySelectorAll('section').forEach(section => {
  section.style.animationDelay = '1.7s';
});

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

const backToTopButton = document.querySelector('.back-to-top');

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