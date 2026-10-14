/* ═══════════════════════════════════════════════════
   PORTFOLIO — script.js
   ✔ Smooth scroll to section when nav link is clicked
   ✔ Active nav link highlights whichever section
     is currently in view (sky-blue + underline)
   ✔ Hamburger toggle for mobile
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const page         = document.getElementById('page');
  const navLinks     = document.querySelectorAll('.nav-link[data-target]');
  const sections     = document.querySelectorAll('.section[id]');
  const hamburger    = document.getElementById('hamburger');
  const navLinksWrap = document.querySelector('.nav-links');

  /* ──────────────────────────────────────
     1.  SMOOTH SCROLL ON NAV / BTN CLICK
  ────────────────────────────────────── */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      var targetId = link.getAttribute('data-target');
      var target   = document.getElementById(targetId);

      if (target) {
        // scrollIntoView works even inside a scroll-snap container
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Close mobile menu after click
      navLinksWrap.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* ──────────────────────────────────────
     2.  ACTIVE LINK — tracks scroll position
         The section whose midpoint is closest
         to the middle of the viewport is "active".
  ────────────────────────────────────── */
  function getActiveId () {
    var viewMid = page.scrollTop + page.clientHeight / 2;
    var activeId = null;
    var bestDist = Infinity;

    sections.forEach(function (sec) {
      var secMid = sec.offsetTop + sec.offsetHeight / 2;
      var dist   = Math.abs(secMid - viewMid);
      if (dist < bestDist) {
        bestDist = dist;
        activeId = sec.id;
      }
    });

    return activeId;
  }

  function setActive () {
    var id = getActiveId();
    if (!id) return;

    navLinks.forEach(function (link) {
      if (link.getAttribute('data-target') === id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  page.addEventListener('scroll', setActive, { passive: true });
  setActive(); // highlight correct link on first paint

  /* ──────────────────────────────────────
     3.  HAMBURGER (mobile menu)
  ────────────────────────────────────── */
  hamburger.addEventListener('click', function () {
    var open = navLinksWrap.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });

  /* Close on outside click */
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navLinksWrap.contains(e.target)) {
      navLinksWrap.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

})();
