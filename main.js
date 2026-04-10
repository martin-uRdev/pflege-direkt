/* ============================================================
   PFLEGE DIREKT — main.js
   - Theme toggle (dark/light, localStorage)
   - Mobile nav toggle
   - FAQ accordion
   - Contact form handler
   ============================================================ */

(function () {
  'use strict';

  /* ─── THEME TOGGLE ──────────────────────────────────────── */
  const THEME_KEY = 'pflege-direkt-theme';

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored) {
      applyTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  initTheme();

  document.addEventListener('DOMContentLoaded', function () {

    /* ─── THEME TOGGLE BUTTONS ────────────────────────────── */
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });

    /* ─── MOBILE NAV ──────────────────────────────────────── */
    const navToggle = document.querySelector('.nav__toggle');
    const navMobile = document.querySelector('.nav__mobile');

    if (navToggle && navMobile) {
      navToggle.addEventListener('click', function () {
        const isOpen = navMobile.classList.contains('is-open');
        navMobile.classList.toggle('is-open', !isOpen);
        navToggle.setAttribute('aria-expanded', String(!isOpen));
      });

      // Close mobile nav when a link is clicked
      navMobile.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navMobile.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    /* ─── SET ACTIVE NAV LINK ─────────────────────────────── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('nav__link--active');
      }
    });

    /* ─── FAQ ACCORDION ───────────────────────────────────── */
    document.querySelectorAll('.faq-item__trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const item = trigger.closest('.faq-item');
        const isOpen = item.classList.contains('is-open');

        // Close all open items
        document.querySelectorAll('.faq-item.is-open').forEach(function (openItem) {
          openItem.classList.remove('is-open');
          openItem.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it was closed
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    /* ─── CONTACT FORM HANDLER ────────────────────────────── */
    const contactFormWrapper = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit');

    if (submitBtn && contactFormWrapper) {
      submitBtn.addEventListener('click', function () {
        // Basic validation
        const required = contactFormWrapper.querySelectorAll('[required]');
        let valid = true;

        required.forEach(function (field) {
          if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            valid = false;
          } else {
            field.style.borderColor = '';
          }
        });

        if (!valid) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Wird gesendet…';

        setTimeout(function () {
          contactFormWrapper.style.display = 'none';
          if (formSuccess) {
            formSuccess.classList.add('is-visible');
          }
          if (window.lucide) {
            window.lucide.createIcons();
          }
        }, 900);
      });
    }

    /* ─── LUCIDE ICONS ────────────────────────────────────── */
    if (window.lucide) {
      window.lucide.createIcons();
    }

  });

})();
