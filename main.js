// Fade-up on scroll
const fadeEls = document.querySelectorAll(
  '.work-card, .skill-group, .about-body p, .about-body .btn, .contact-heading, .contact-sub, .contact-links'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

// Stagger work cards
document.querySelectorAll('.work-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--green-dark)';
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navObserver.observe(s));
