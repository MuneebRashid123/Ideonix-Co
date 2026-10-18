/* ══════════════════════════════════════════════════════════════
   SERVICE DETAIL — banner photos, in-page scroll, visibility guard
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── 1. reuse the homepage banner photos on the service heroes ── */
  function paintBanners(tries){
    var slides = document.querySelectorAll('.slide-bg');
    var targets = document.querySelectorAll('.sv-banner');
    if (!targets.length) return;
    if (!slides.length){
      if ((tries || 0) < 20) return setTimeout(function(){ paintBanners((tries||0)+1); }, 250);
      return;                                   // no photos: the gradient hero still stands on its own
    }
    Array.prototype.forEach.call(targets, function(el){
      var i = parseInt(el.getAttribute('data-slide'), 10) || 0;
      var src = slides[i % slides.length];
      var img = src && getComputedStyle(src).backgroundImage;
      if (img && img !== 'none') el.style.backgroundImage = img;
    });
  }

  /* ── 2. "See what we provide" scrolls inside the open page ── */
  function onClick(e){
    var btn = e.target.closest && e.target.closest('[data-scroll]');
    if (!btn) return;
    var page = btn.closest('.svpage') || document;
    var target = page.querySelector(btn.getAttribute('data-scroll'));
    if (!target) return;
    e.preventDefault();
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
  }

  /* ── 3. nothing may stay invisible ──
     The router marks .rv as .seen when a service opens, but if that
     ever misses an element we reveal it rather than leave blank space. */
  function revealGuard(){
    var page = document.querySelector('.svpage.on');
    if (!page) return;
    page.querySelectorAll('.rv:not(.seen)').forEach(function(el){ el.classList.add('seen'); });
  }

  function boot(){
    paintBanners(0);
    document.addEventListener('click', onClick);
    window.addEventListener('hashchange', function(){ setTimeout(revealGuard, 400); });
    setTimeout(revealGuard, 900);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
