// ===== MAA DIGITAL COMPUTER EDUCATION - script.js =====

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('visible');
  }
  highlightNavOnScroll();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu when nav link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix) {
  let current = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = document.querySelectorAll('.stat');
      stats.forEach(stat => {
        const numEl = stat.querySelector('.stat-num');
        const target = parseInt(stat.getAttribute('data-count'));
        animateCounter(numEl, target);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== SCROLL REVEAL ANIMATION =====
const aosElements = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
    }
  });
}, { threshold: 0.1 });

aosElements.forEach(el => aosObserver.observe(el));

// ===== COURSE FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    courseCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeUp 0.4s ease both';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== FORM SUBMISSION =====
function submitForm() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const course = document.getElementById('course').value;

  if (!name) {
    showAlert('Kripya apna naam likhein!', 'error');
    document.getElementById('name').focus();
    return;
  }
  if (!phone || phone.length < 10) {
    showAlert('Sahi mobile number likhein!', 'error');
    document.getElementById('phone').focus();
    return;
  }
  if (!course) {
    showAlert('Kripya ek course select karein!', 'error');
    document.getElementById('course').focus();
    return;
  }

  // Hide form, show success
  const form = document.querySelector('.admission-form');
  const successMsg = document.getElementById('successMsg');
  form.style.display = 'none';
  successMsg.classList.add('show');

  // Reset after 5 seconds
  setTimeout(() => {
    form.style.display = 'block';
    successMsg.classList.remove('show');
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('course').value = '';
    document.getElementById('batch').value = '';
    document.getElementById('message').value = '';
  }, 5000);
}

// ===== ALERT NOTIFICATION =====
function showAlert(msg, type) {
  const existing = document.querySelector('.custom-alert');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.className = 'custom-alert';
  alert.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${msg}`;
  alert.style.cssText = `
    position: fixed; top: 90px; right: 24px; z-index: 9999;
    background: ${type === 'error' ? '#ef4444' : '#10b981'};
    color: white; padding: 14px 22px; border-radius: 12px;
    font-family: 'Hind', sans-serif; font-size: 15px; font-weight: 600;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    animation: fadeDown 0.4s ease both;
  `;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3500);
}

// ===== SCROLL TO TOP =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== COURSE CARD HOVER RIPPLE =====
courseCards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.borderColor = 'rgba(26,86,219,0.2)';
  });
  card.addEventListener('mouseleave', function () {
    this.style.borderColor = '';
  });
});

// ===== PHONE INPUT - NUMBERS ONLY =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
  });
}

// ===== ENROLL BUTTONS → SCROLL TO ADMISSION =====
document.querySelectorAll('.btn-enroll').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const admissionSection = document.getElementById('admission');
    if (admissionSection) {
      const top = admissionSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== TYPING EFFECT IN HERO (optional tagline) =====
const heroDesc = document.querySelector('.hero-desc');
if (heroDesc) {
  const originalText = heroDesc.textContent;
  heroDesc.textContent = '';
  let charIndex = 0;
  function typeText() {
    if (charIndex < originalText.length) {
      heroDesc.textContent += originalText[charIndex];
      charIndex++;
      setTimeout(typeText, 18);
    }
  }
  setTimeout(typeText, 900);
}

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

console.log('%c🎓 MAA Digital Computer Education', 'color:#1a56db;font-size:18px;font-weight:bold;');
console.log('%cWebsite loaded successfully!', 'color:#10b981;font-size:13px;');
