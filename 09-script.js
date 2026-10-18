/* ══════════════════════════════════════════════════════════════
   Testimonials: entrance when first seen, plus a scroll-linked
   drift layered on top of the continuous marquee.
   Also lights the colour band rule on each section.
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* wrap the track so the marquee animation and the scroll drift
     live on separate elements and cannot overwrite each other */
  function wrap(track){
    if (!track || track.parentElement.classList.contains('svrv-shift')
               || track.parentElement.classList.contains('rvx-shift')) return;
    var mq = track.parentElement;
    var shift = document.createElement('div');
    shift.className = mq.classList.contains('rvx-mq') ? 'rvx-shift' : 'svrv-shift';
    mq.insertBefore(shift, track);
    shift.appendChild(track);
  }

  function strips(){
    return Array.prototype.slice.call(document.querySelectorAll('.svrv-mq, .rvx-mq'));
  }

  function prep(){
    strips().forEach(function(mq){
      var track = mq.querySelector('.svrv-track, .rvx-track');
      if (!track) return;
      wrap(track);
      Array.prototype.forEach.call(track.children, function(c, i){
        c.style.setProperty('--k', Math.min(i, 8));   // cap the stagger
      });
      if (!reduce) mq.classList.add('intro');
    });
  }

  /* entrance the first time the strip comes into view */
  function watchIntro(){
    var list = strips();
    if (!list.length) return;
    if (reduce || !('IntersectionObserver' in window)){
      list.forEach(function(mq){ mq.classList.add('intro-in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        e.target.classList.add('intro-in');
        io.unobserve(e.target);
      });
    }, {threshold:.15});
    list.forEach(function(mq){ io.observe(mq); });
  }

  /* drift with the scroll: the strip shifts as the section passes */
  var ticking = false;
  function drift(){
    if (reduce) return;
    strips().forEach(function(mq){
      var r = mq.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      // 0 when the strip enters the bottom, 1 when it leaves the top
      var p = 1 - (r.top + r.height) / (innerHeight + r.height);
      var px = Math.round((p - .5) * -160);
      mq.style.setProperty('--drift', px + 'px');
    });
  }
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){ drift(); ticking = false; });
  }

  /* the lime rule at the top of each colour band */
  function watchBands(){
    var bands = document.querySelectorAll(
      '.svpage .svstats, .svpage .svprovide, .svpage .svwhy, .svpage .svclients, .svpage .svrv');
    if (!bands.length) return;
    if (!('IntersectionObserver' in window)){
      Array.prototype.forEach.call(bands, function(b){ b.classList.add('band-in'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('band-in'); io.unobserve(e.target); }
      });
    }, {threshold:.06});
    Array.prototype.forEach.call(bands, function(b){ io.observe(b); });
  }

  function boot(){
    prep();
    watchIntro();
    watchBands();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll, {passive:true});
    window.addEventListener('hashchange', function(){
      setTimeout(function(){ prep(); watchIntro(); watchBands(); drift(); }, 200);
    });
    drift();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
