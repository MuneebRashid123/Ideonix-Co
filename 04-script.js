/* ══════════════════════════════════════════════════════════════
   SERVICE DETAIL — review marquee + pointer depth
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine   = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function norm(t){
    return String(t).toLowerCase().replace(/[^a-z]/g,'');
  }

  /* ── 1. build one marquee per service page ─────────────────
     The homepage marquee is already rendered, so we clone those
     cards, strip the microdata (it must not repeat 12 times) and
     re-tag the class names. ──────────────────────────────── */
  function reskin(src, match, isClone){
    var n = src.cloneNode(true);
    // strip schema.org markup and its <meta> carriers
    var all = [n].concat(Array.prototype.slice.call(n.querySelectorAll('*')));
    all.forEach(function(el){
      el.removeAttribute('itemprop');
      el.removeAttribute('itemscope');
      el.removeAttribute('itemtype');
      if (el.className && typeof el.className === 'string'){
        el.className = el.className.replace(/\brvx-/g, 'svrv-');
      }
    });
    Array.prototype.forEach.call(n.querySelectorAll('meta'), function(m){
      m.parentNode.removeChild(m);
    });
    if (match) n.classList.add('is-match');
    if (isClone) n.setAttribute('aria-hidden', 'true');
    else n.setAttribute('tabindex', '0');
    return n;
  }

  function buildMarquees(){
    var source = document.querySelectorAll('#rvxTrack > .rvx-card:not([aria-hidden])');
    var tracks = document.querySelectorAll('.svrv-track');
    if (!source.length || !tracks.length) return;

    Array.prototype.forEach.call(tracks, function(track){
      var want = norm(track.getAttribute('data-svc') || '');
      var mine = [], rest = [];
      Array.prototype.forEach.call(source, function(card){
        var label = card.querySelector('.rvx-svc');
        var tag = norm(label ? label.textContent : '');
        var hit = tag && want &&
                  (tag === want || tag.indexOf(want) === 0 || want.indexOf(tag) === 0);
        (hit ? mine : rest).push(card);
      });
      var list = mine.concat(rest);
      var frag = document.createDocumentFragment();
      list.forEach(function(c, i){ frag.appendChild(reskin(c, i < mine.length, false)); });
      list.forEach(function(c, i){ frag.appendChild(reskin(c, i < mine.length, true)); });
      track.innerHTML = '';
      track.appendChild(frag);
    });
  }

  /* ── 2. pointer tilt on the content cards ──────────────── */
  var TILT = '.svpage .sv-card, .svpage .sv-shot, .svpage .sv-case';
  var MAX  = 7; // degrees

  function onMove(e){
    if (!fine || reduce) return;
    var el = e.target.closest && e.target.closest(TILT);
    if (!el) return;
    var b = el.getBoundingClientRect();
    var px = (e.clientX - b.left) / b.width;   // 0 → 1
    var py = (e.clientY - b.top) / b.height;
    el.style.setProperty('--ry', ((px - .5) *  MAX * 2).toFixed(2) + 'deg');
    el.style.setProperty('--rx', ((.5 - py) *  MAX * 2).toFixed(2) + 'deg');
    el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
    el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
  }
  function onLeave(e){
    var el = e.target.closest && e.target.closest(TILT);
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  /* ── 3. press ("2D → 3D touch") on cards ───────────────── */
  var PRESS = TILT + ', .svrv-card';
  var held  = null;

  function press(e){
    var el = e.target.closest && e.target.closest(PRESS);
    if (!el || reduce) return;
    held = el;
    el.classList.add('is-press');
  }
  function release(){
    if (held){ held.classList.remove('is-press'); held = null; }
  }

  /* ── 4. ripple on the buttons ──────────────────────────── */
  function ripple(e){
    if (reduce) return;
    var btn = e.target.closest && e.target.closest('.svpage .btn, .svpage .sv-other a, .svpage .sv-nav .cta');
    if (!btn) return;
    var b = btn.getBoundingClientRect();
    var d = Math.max(b.width, b.height);
    var s = document.createElement('span');
    s.className = 'sv-ripple';
    s.style.width = s.style.height = d + 'px';
    s.style.left = (e.clientX - b.left - d / 2) + 'px';
    s.style.top  = (e.clientY - b.top  - d / 2) + 'px';
    btn.appendChild(s);
    setTimeout(function(){ if (s.parentNode) s.parentNode.removeChild(s); }, 640);
  }

  function bind(){
    buildMarquees();
    document.addEventListener('pointermove', onMove, {passive:true});
    document.addEventListener('pointerout',  onLeave, {passive:true});
    document.addEventListener('pointerdown', function(e){ press(e); ripple(e); }, {passive:true});
    document.addEventListener('pointerup',     release, {passive:true});
    document.addEventListener('pointercancel', release, {passive:true});
    // keyboard press feedback on focusable review cards
    document.addEventListener('keydown', function(e){
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var el = document.activeElement;
      if (el && el.classList && el.classList.contains('svrv-card')){
        el.classList.add('is-press');
        setTimeout(function(){ el.classList.remove('is-press'); }, 160);
      }
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();
