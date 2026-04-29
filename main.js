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
  burger.setAttribute('aria-label', navLinks.classList.contains('open') ? 'Close menu' : 'Open menu');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Map modal ─────────────────────────────────────────────
const mapData = [
  {
    src: 'images/kelp-map.jpg',
    caption: 'Southern California Giant Kelp Forests Under Heat Stress — March 2026 · NOAA · GBIF · Natural Earth'
  },
  {
    src: 'images/fault-map.jpg',
    caption: 'Fault Lines & Population Density, Los Angeles County 2020 · US Census Bureau · USGS'
  },
  {
    src: 'images/crime-map.jpg',
    caption: 'Most Common Crime Type by LAPD Division, 2025 · LAPD NIBRS · LAPD Boundary Layer'
  }
];

const modal     = document.getElementById('mapModal');
const modalImg  = document.getElementById('modalImg');
const modalCap  = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.map-card').forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.dataset.modal, 10);
    const d = mapData[idx];
    modalImg.src = d.src;
    modalImg.alt = d.caption;
    modalCap.textContent = d.caption;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Scroll reveal ─────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.trail-map, .skill-group, .map-card, .outside-strip, ' +
  '.about-right p, .btn-row, .contact-h, .contact-body, ' +
  '.contact-section .btn-large, .section-hd'
);

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
});

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -28px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// ── Scroll track arrows ───────────────────────────────────
document.querySelectorAll('.scroll-track').forEach(track => {
  const el = track.querySelector('.project-grid, .maps-scroll');
  if (!el) return;

  const btnL = document.createElement('button');
  btnL.className = 'scroll-arrow scroll-arrow-left';
  btnL.innerHTML = '&#8592;';
  btnL.setAttribute('aria-label', 'Scroll left');

  const btnR = document.createElement('button');
  btnR.className = 'scroll-arrow scroll-arrow-right';
  btnR.innerHTML = '&#8594;';
  btnR.setAttribute('aria-label', 'Scroll right');

  track.appendChild(btnL);
  track.appendChild(btnR);

  const cardWidth = () => (el.querySelector('.project, .map-card')?.offsetWidth ?? 320) + 20;

  btnL.addEventListener('click', () => el.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
  btnR.addEventListener('click', () => el.scrollBy({ left:  cardWidth(), behavior: 'smooth' }));

  const update = () => {
    const atStart = el.scrollLeft <= 4;
    const atEnd   = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    btnL.hidden = atStart;
    btnR.hidden = atEnd;
    track.classList.toggle('scroll-end', atEnd);
  };

  update();
  el.addEventListener('scroll', update, { passive: true });
});

// Stagger grids
document.querySelectorAll('.maps-scroll, .skills-block').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.style.transitionDelay = `${i * 70}ms`;
  });
});

// ── Trail map era buttons ─────────────────────────────────
const trailScroll = document.getElementById('trailScroll');
const trailEraBtns = document.querySelectorAll('.trail-era-btn');
const trailStops = document.querySelectorAll('.trail-stop');
const trailSeps = document.querySelectorAll('.trail-era-sep');

if (trailScroll) {
  // Click a marker to center that stop in the trail viewport
  trailStops.forEach(stop => {
    const marker = stop.querySelector('.tsm-wrap');
    if (!marker) return;
    marker.addEventListener('click', () => {
      const center = stop.offsetLeft + stop.offsetWidth / 2;
      trailScroll.scrollTo({ left: center - trailScroll.clientWidth / 2, behavior: 'smooth' });
    });
  });

  trailEraBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const era = btn.dataset.era;
      const alreadyActive = btn.classList.contains('active');

      trailEraBtns.forEach(b => b.classList.remove('active'));
      trailStops.forEach(s => s.classList.remove('dimmed'));
      trailSeps.forEach(s => s.classList.remove('dimmed'));

      if (!alreadyActive) {
        btn.classList.add('active');
        trailStops.forEach(s => { if (s.dataset.era !== era) s.classList.add('dimmed'); });
        trailSeps.forEach(s => { if (s.dataset.era !== era) s.classList.add('dimmed'); });
        const anchor = document.getElementById(`trail-era-${era}`);
        if (anchor) {
          trailScroll.scrollTo({ left: anchor.offsetLeft - 24, behavior: 'smooth' });
        }
      }
    });
  });
}

// ── Active nav ────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
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
