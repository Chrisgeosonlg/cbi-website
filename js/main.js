/* ============================================================
   CBI — Calvary Bible Institute | Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  if (hamburger) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  // Close mobile menu when a link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ── ACTIVE NAV LINK (highlight current page) ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── SCROLL REVEAL ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  /* ── COURSE FILTER TABS ── */
  const tabBtns = document.querySelectorAll('.tab-btn[data-filter]');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.course-card[data-mode]').forEach(card => {
          if (filter === 'all') {
            card.style.display = 'flex';
          } else if (filter === 'online' || filter === 'campus') {
            card.style.display = card.dataset.mode === filter ? 'flex' : 'none';
          } else {
            card.style.display = card.dataset.level === filter ? 'flex' : 'none';
          }
        });
      });
    });
  }

  /* ── PAYMENT METHOD SELECTION ── */
  document.querySelectorAll('.pay-method').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.pay-method').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
    });
  });

  /* ── DONATE AMOUNT SELECTION ── */
  document.querySelectorAll('.donate-amount').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.donate-amount').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
    });
  });

  /* ── BUY & DOWNLOAD BUTTONS (demo) ── */
  document.querySelectorAll('.btn-buy').forEach(btn => {
    btn.addEventListener('click', function () {
      const card  = this.closest('.resource-card');
      const title = card ? card.querySelector('.rc-title')?.textContent : 'Resource';
      const price = card ? card.querySelector('.rc-price')?.textContent : '';
      alert(
        '💳 Purchase: ' + title +
        '\n\nPrice: ' + price +
        '\n\nYou will receive a mobile money prompt on your phone.\n\n(Integrate Selcom / Azampay for live payments.)'
      );
    });
  });

  /* ── FORM SUBMISSION (demo) ── */
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = this.dataset.demo || 'Thank you! We will be in touch shortly.';
      alert('✅ ' + msg);
      this.reset();
    });
  });

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── STICKY NAV SHADOW ON SCROLL ── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(11,31,58,.1)'
        : '0 2px 20px rgba(11,31,58,.05)';
    });
  }

});
