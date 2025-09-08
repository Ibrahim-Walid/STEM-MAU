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
              window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
              });
            }, 100);
            localStorage.removeItem('scrollToSection');
          }
        }
        else if (window.location.hash && !isReload) {
          const targetId = window.location.hash.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            setTimeout(() => {
              window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
              });
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

      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
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

document.addEventListener('DOMContentLoaded', function() {
  const highlights = document.querySelectorAll('.vision-highlight');
  highlights.forEach(highlight => {
    highlight.addEventListener('mouseenter', function() {
      this.style.textShadow = '0 0 10px rgba(0, 82, 180, 0.5)';
    });
    highlight.addEventListener('mouseleave', function() {
      this.style.textShadow = 'none';
    });
  });
});

function initHeroParticles() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    heroSection.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        
        // Random size between 2px and 4px
        const size = Math.random() * 2 + 2;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation duration between 15s and 30s
        const duration = Math.random() * 15 + 15;
        
        // Random delay between 0s and 15s
        const delay = Math.random() * 15;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            animation: floatParticle ${duration}s linear infinite;
            animation-delay: -${delay}s;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }

    // Add the floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(100px, 50px);
            }
            50% {
                transform: translate(50px, 100px);
            }
            75% {
                transform: translate(-50px, 50px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
        
        .hero-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }
        
        .hero-particle {
            will-change: transform;
        }
    `;
    document.head.appendChild(style);
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroParticles();
    // ... existing code ...
});
// Professors Carousel
const professors = [
  {
    src: 'profs/DR_Randa_Faisl.jpg',
    alt: 'Dr. Randa Faisel',
    text: `We sincerely thank Dr. Randa Faisel for her outstanding leadership in managing the entire process of our training and conference. With her guidance, every step was organized with excellence, bringing together distinguished experts and ensuring that our delegates received high-level preparation. Her dedication and vision were key to the success of this journey, and we are truly grateful for her efforts in making this experience impactful and inspiring for all.`
  },
  {
    src: 'profs/DR_Heba_Assem.jpg',
    alt: 'Dr. Heba Assem',
    text: `STEM Model African Union extends its deepest gratitude to Dr. Heba Assem for delivering an inspiring and insightful training session to our delegates. Her lecture on “The Founding Structure of the African Union” provided our members with invaluable knowledge, historical context, and a deeper understanding of the institutional pillars that uphold the African Union. Her dedication to empowering youth, coupled with her remarkable expertise and vision, has left a lasting impact on our team as we prepare for the upcoming conference. We are truly honored to have learned from a distinguished African leader who continues to shape and inspire the next generation.`
  },
  {
    src: 'profs/DR_Ayat_Abdel-Aziz.jpg',
    alt: 'Dr. Ayat Ali',
    text: `We were honored to receive an enlightening training session from Dr. Ayat Ali, an esteemed expert in African politics, who guided our STEM Model African Union delegates through the intricate political structure and decision-making processes of the African Union. Her insightful presentation shed light on the AU’s foundational mechanisms, strategic political architecture, and the environment in which continental governance unfolds. This session not only deepened our members’ understanding of AU politics but also strengthened their capacity to engage confidently in debates and diplomatic simulations. On behalf of the entire STEM MAU community, we extend our sincere appreciation to Dr. Ayat Ali for sharing her expertise, for her clarity of instruction, and for empowering our delegates with the knowledge needed to represent the continent’s political frameworks effectively.`
  },
  {
    src: 'profs/DR_Samar_El-Bagoury.jpg',
    alt: 'Dr. Samar El Bagoury',
    text: `It is our distinct privilege to extend heartfelt gratitude to Dr. Samar El Bagoury, a distinguished Professor of Economics at Cairo University renowned for her expertise in African development and economic policy. During the recent training session delivered to our STEM MAU delegates, Dr. El Bagoury offered an enlightening lecture on African Economics, broadening our understanding of the continent’s economic dynamics and empowering our members with invaluable academic insight. We are profoundly thankful for her dedication and generosity in sharing her profound knowledge and for inspiring our team to critically engage with the economic underpinnings of African progress.`
  },
  {
    src: 'profs/Mr_Anglo_William.jpg',
    alt: 'Dr. Anglo William',
    text: `We were deeply honored to host Dr. Anglo William, a distinguished expert in African justice, who generously shared his insights with our STEM Model African Union delegates. In his session on the foundations and frameworks of justice in Africa, Dr. William offered profound perspectives that illuminated legal principles, historical precedents, and contemporary dynamics vital to our understanding of continental jurisprudence. His thoughtful guidance not only enriched our delegates’ knowledge but also equipped them with the analytical tools needed to confidently engage in conference debates and policymaking simulations. We extend our heartfelt gratitude to Dr. Anglo William for his dedication, clarity of instruction, and commitment to nurturing the next generation of African leaders. His contribution has significantly elevated the quality of our training and inspired our team to pursue justice with both rigor and vision.`
  },
  {
    src: 'profs/DR_Islam_Fekry.jpg',
    alt: 'Dr. Islam Fekry',
    text: `We are truly honored to have had Dr. Islam Fekry deliver an exceptional training session for our delegates under the theme “Africa Through Egyptian Eyes.” Through his remarkable insights and profound perspective, Dr. Fekry highlighted the deep historical, cultural, and strategic ties between Egypt and the African continent, enriching our members’ understanding of Africa’s unique role in shaping regional and global dynamics. His valuable contribution has not only broadened the horizons of our delegates but also inspired them to embrace a deeper sense of responsibility toward Africa’s future.`
  },
  {
    src: 'profs/DR_Mohamed_Fouad.jpg',
    alt: 'Dr. Mohamed Fouad',
    text: `We were deeply privileged to welcome Dr. Mohamed Fouad, a distinguished scholar and expert on African water politics and transboundary resource management, who delivered an insightful training session to our STEM MAU members. With his profound expertise, Dr. Mohamed guided our delegates through the complex dynamics of the Nile Basin, the Grand Ethiopian Renaissance Dam, and the broader water security challenges in Africa. His lecture not only enriched our understanding of the historical, political, and environmental dimensions of this pressing issue but also equipped our members with the analytical tools necessary to address such challenges in the upcoming Model African Union Conference. We extend our sincere gratitude to Dr. Mohamed Fouad for his invaluable contribution, his dedication to empowering youth, and his commitment to advancing dialogue on one of Africa’s most critical issues. His words will undoubtedly inspire our members as they step into their roles as future policymakers and advocates for sustainable development.`
  },
  {
    src: 'profs/DR_Hassan_Ghazaly.jpg',
    alt: 'Dr. Hassan Ghazally',
    text: `We are deeply honored to extend our heartfelt gratitude to Dr. Hassan Ghazally, an esteemed youth leadership and policy expert, who has made remarkable contributions to empowering young voices across Africa. With a rich background as the Vice President of the Pan-African Youth Union (2017–2020), and as the founder and coordinator of the African Youth Office at the Egyptian Ministry of Youth and Sports, Dr. Ghazally has played a vital role in shaping continental youth policies and advancing opportunities for young leaders. In our journey at STEM Model African Union, Dr. Ghazally stood as the guiding force who organized and managed all of our training sessions and the final conference. He was the one who connected us with distinguished doctors, professors, and experts—ensuring that our members received the highest level of mentorship and preparation. On behalf of the entire team, we sincerely thank Dr. Hassan Ghazally for his dedication, vision, and invaluable support in making this experience possible. His unwavering commitment to youth development continues to inspire us all.`
  },
  {
    src: 'profs/Ambassador_Amr_El-Jowaily.jpg',
    alt: 'Ambassador Amr Aljowaily',
    text: `We were very privileged to have Ambassador Amr Aljowaily, Africa’s most esteemed diplomat and intellectual leader, present a life-altering training session with our STEM Model African Union members. With a long and illustrious career culminating in leadership roles at the AU Commission and postings around the globe, Ambassador Aljowaily guided our representatives through the topic “Justice for Africans and People of African Descent Through Reparations.” His message was both informative and inspirational, leaving our members newly committed to contributing to Africa’s future.`
  }
];

let profIndex = 0;
const profImgEl = document.getElementById('prof-img');
const profTextEl = document.getElementById('prof-text');
const profContEl = document.querySelector('.profs-container');
const prevBtn = document.querySelector('.prof-prev');
const nextBtn = document.querySelector('.prof-next');

function showProfessor(newIndex) {
  profContEl.classList.remove('reverse','show');
  if (newIndex % 2 === 1) profContEl.classList.add('reverse');
  profImgEl.src = professors[newIndex].src;
  profImgEl.alt = professors[newIndex].alt;
  profTextEl.innerHTML = `<p>${professors[newIndex].text}</p>`;
  // Force reflow for smooth transition
  void profImgEl.offsetWidth;
  profContEl.classList.add('show');
  profIndex = newIndex;
}

window.addEventListener('load', () => {
  showProfessor(profIndex);
  // Auto-advance carousel every 6s
  setInterval(() => {
    profIndex = (profIndex + 1) % professors.length;
    showProfessor(profIndex);
  }, 6000);
});

// Previous/Next button handlers
prevBtn.addEventListener('click', () => {
  const newIndex = (profIndex - 1 + professors.length) % professors.length;
  showProfessor(newIndex);
});
nextBtn.addEventListener('click', () => {
  const newIndex = (profIndex + 1) % professors.length;
  showProfessor(newIndex);
});