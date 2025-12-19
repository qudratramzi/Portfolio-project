// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

menuBtn?.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('show');
});

nav?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('show');
    menuBtn?.setAttribute('aria-expanded', 'false');
  })
);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fixed header drop shadow when scrolling
const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
  if (!topbar) return;
  topbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Back to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop?.classList.toggle('show', window.scrollY > 600);
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (mailto)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get('name');
  const email = data.get('email');
  const subj = data.get('subject');
  const msg  = data.get('message');

  const mailto = `mailto:enayat.meskinyaar2@gmail.com?subject=${encodeURIComponent(
    `[Portfolio] ${subj}`
  )}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${msg}`)}`;

  window.location.href = mailto;
  statusEl.textContent = 'Opening your email app...';
  setTimeout(()=> statusEl.textContent = '', 2500);
});


// Reveal-on-scroll for chips and animated underlines
const upEls = document.querySelectorAll('.reveal-up');
const underlineEls = document.querySelectorAll('.reveal-underline');

if ('IntersectionObserver' in window) {
  const upObs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        o.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  upEls.forEach(el => upObs.observe(el));

  const ulObs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        o.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -20% 0px' });

  underlineEls.forEach(el => ulObs.observe(el));
} else {
  // Fallback if IntersectionObserver is not supported
  upEls.forEach(el => el.classList.add('show'));
  underlineEls.forEach(el => el.classList.add('in-view'));
}
