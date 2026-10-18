/* ══════════════════════════════════════════════════════════════
   SERVICE DETAIL — scroll-spy nav, AI conversation playback,
   stagger indices for the entrance animations
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. give every staggered child its position ─────────── */
  function indexChildren(root){
    var groups = (root || document).querySelectorAll(
      '.sv-cards, .svprovide-list, .svai-steps, .svstats-row, .svclients-row');
    Array.prototype.forEach.call(groups, function(g){
      Array.prototype.forEach.call(g.children, function(c, i){
        c.style.setProperty('--n', i);
      });
    });
  }

  /* ── 2. reveal the child groups as they scroll in ───────── */
  function watchGroups(){
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('seen'); io.unobserve(e.target); }
      });
    }, {rootMargin:'0px 0px -50px 0px', threshold:.08});
    document.querySelectorAll('.sv-cards, .svstats-row, .svclients-row')
      .forEach(function(g){ io.observe(g); });
  }

  /* ── 3. the DM conversation plays when it comes into view ── */
  function playThread(col){
    col.classList.remove('is-on');
    // force a reflow so the transition restarts from the top
    void col.offsetWidth;
    col.classList.add('is-on');
  }

  function watchThreads(){
    var cols = document.querySelectorAll('.svai-col');
    if (!cols.length) return;
    if (reduce || !('IntersectionObserver' in window)){
      Array.prototype.forEach.call(cols, function(c){ c.classList.add('is-on'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ playThread(e.target); io.unobserve(e.target); }
      });
    }, {threshold:.35});
    Array.prototype.forEach.call(cols, function(c){ io.observe(c); });
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('[data-replay]');
    if (!btn) return;
    var stage = btn.closest('.svai-stage');
    var col = stage && stage.querySelector('.svai-col');
    if (col) playThread(col);
  });

  /* ── 4. sticky nav names the section you are reading ─────── */
  var LABELS = [
    ['.sv-hero',    'Overview'],
    ['.svinfo',     'Overview'],
    ['.sv-sec',     'What you get'],
    ['.svstats',    'Recent results'],
    ['.svprovide',  'What we provide'],
    ['.svwhy',      'Why teams pick us'],
    ['.svai',       'AI chatbot integration'],
    ['.svband',     'Get in touch'],
    ['.svclients',  'Clients'],
    ['.svrv',       'Client reviews'],
    ['.sv-end',     'Start a project']
  ];

  function labelFor(sec){
    if (sec.classList.contains('sv-sec')){
      var eye = sec.querySelector('.sv-eyebrow');
      if (eye) return eye.textContent.trim();
    }
    for (var i = 0; i < LABELS.length; i++){
      if (sec.matches(LABELS[i][0])) return LABELS[i][1];
    }
    return 'Overview';
  }

  function spy(){
    var page = document.querySelector('.svpage.on');
    if (!page) return;
    var slot = page.querySelector('.sv-navtitle .sec');
    if (!slot) return;
    var nav = page.querySelector('.sv-nav');
    var line = (nav ? nav.getBoundingClientRect().bottom : 0) + 90;
    var current = null;
    page.querySelectorAll(':scope > section').forEach(function(sec){
      var r = sec.getBoundingClientRect();
      if (r.top <= line && r.bottom > line) current = sec;
    });
    if (!current) return;
    var text = labelFor(current);
    if (slot.textContent === text) return;
    slot.classList.add('swap');
    setTimeout(function(){ slot.textContent = text; slot.classList.remove('swap'); }, 180);
  }

  /* ── 5. split the nav title into service + section ───────── */
  function prepTitles(){
    document.querySelectorAll('.sv-navtitle').forEach(function(t){
      if (t.querySelector('.svc')) return;
      var name = t.textContent.trim();
      t.textContent = '';
      var a = document.createElement('span'); a.className = 'svc'; a.textContent = name;
      var d = document.createElement('span'); d.className = 'sep';
      var c = document.createElement('span'); c.className = 'sec'; c.textContent = 'Overview';
      t.appendChild(a); t.appendChild(d); t.appendChild(c);
    });
  }

  function boot(){
    prepTitles();
    indexChildren();
    watchGroups();
    watchThreads();
    var tick = false;
    window.addEventListener('scroll', function(){
      if (tick) return; tick = true;
      requestAnimationFrame(function(){ spy(); tick = false; });
    }, {passive:true});
    window.addEventListener('hashchange', function(){ setTimeout(spy, 250); });
    spy();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
