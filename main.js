// ── Nav scroll state ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile burger ─────────────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Scroll reveal ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.project, .skill-group, .map-featured, .map-item, ' +
  '.about-right p, .btn-row, .contact-h, .contact-body, .contact-section .btn-large, ' +
  '.section-hd, .section-intro'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// Stagger children in grids
document.querySelectorAll('.project-grid, .map-pair, .skills-block').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// ── Active nav link highlighting ──────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const links = document.querySelectorAll('.nav-links a[href^="#"]');

const activeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.style.color = '');
      const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (a && !a.classList.contains('nav-cta')) a.style.color = 'var(--kelp)';
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => activeObs.observe(s));
