// Haz Medz — interactions: scroll reveal (bounce both directions), nav, form

/* ---------- Always land on the hero when the page (re)loads ---------- */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);
window.addEventListener('pageshow', () => window.scrollTo(0, 0));

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Scroll reveal (bounces in whichever direction you scroll) ---------- */
const revealEls = document.querySelectorAll('[data-reveal]');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      // remove so it re-animates (bounces) next time it enters view,
      // whether scrolling down or back up
      entry.target.classList.remove('in-view');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -8% 0px'
});

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 6) * 0.06}s`;
  io.observe(el);
});

/* ---------- Mobile nav ---------- */
const burger = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Nav shrink/glass intensify on scroll ---------- */
const navEl = document.querySelector('.nav');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navEl.classList.toggle('scrolled', y > 20);
  lastY = y;
}, { passive: true });

/* ---------- Contact form (static-friendly demo handler) ---------- */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.fullPhone = `${data.phoneCode} ${data.phone}`.trim();

  if (!data.name || !data.email || !data.phone || !data.message) {
    status.textContent = 'Please fill in all required fields.';
    status.style.color = '#e0876f';
    return;
  }

  // Placeholder success flow — wire this up to a real endpoint
  // (e.g. Formspree, Netlify Forms, or your own backend) when ready.
  status.textContent = 'Thanks — your enquiry has been noted. We\'ll be in touch shortly.';
  status.style.color = 'var(--teal-300)';
  form.reset();
});
