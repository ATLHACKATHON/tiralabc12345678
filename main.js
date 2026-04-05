// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== PARTICLE EFFECT =====
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    Object.assign(p.style, {
      position: 'absolute',
      width: Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      background: Math.random() > 0.5 ? '#00d4ff' : '#39ff9f',
      borderRadius: '50%',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      opacity: Math.random() * 0.4 + 0.1,
      animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
      animationDelay: Math.random() * 4 + 's',
    });
    particleContainer.appendChild(p);
  }
}

// ===== ANIMATE ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feat-card, .step-card, .testi-card, .sensor-card, .team-card, .kpi-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const increment = target / 50;
  const interval = setInterval(() => {
    count = Math.min(count + increment, target);
    el.textContent = Math.floor(count) + suffix;
    if (count >= target) clearInterval(interval);
  }, 30);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.kpi-val').forEach(el => {
        const val = parseInt(el.textContent);
        if (!isNaN(val)) animateCounter(el, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.kpi-card').forEach(el => statsObserver.observe(el));
