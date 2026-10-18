/* ══════════════════════════════════════════════════════════════
   COUNT-UP v2

   Two problems with counting each figure on its own:
     1. it fired once and never again, so scrolling back showed
        static numbers;
     2. inside the moving testimonial marquee each card counted
        the moment it clipped into view — off in the mask fade,
        one at a time, so you never saw it happen.

   So counting is now driven per SECTION. When a section scrolls
   in, every figure inside it counts from zero together, and it
   replays each time you come back to it.
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* a section is any block that holds a set of figures */
  var GROUPS = [
    '.stats', '.stat',            // homepage headline stats
    '.dmx-results',               // 24/7 · 3–4 wks · 4.8x
    '.svstats-row',               // service results band
    '.svrv-mq', '.rvx-mq',        // testimonial marquees
    '.svwhy-badge',               // why-us badge
    '.sv-quote'                   // featured client quote
  ].join(', ');

  /* the figures themselves */
  var FIG = '[data-count], .dmx-results li b, .svstat b, .svrv-metric b, ' +
            '.rvx-metric b, .sv-metric b, .svwhy-badge b';

  var NUM = /\d+(?:[.,]\d+)?/g;
  // NUM carries /g, so .test() would advance lastIndex and skip
  // every other figure - use a stateless check for filtering
  var HASNUM = /\d/;
  var DUR = 1400;

  function decimals(str){
    var i = str.indexOf('.');
    return i === -1 ? 0 : str.length - i - 1;
  }

  /* the true, finished text for a figure */
  function finalText(el){
    if (el.dataset.cuText !== undefined) return el.dataset.cuText;
    var out;
    if (el.hasAttribute('data-count')){
      // built by the site's own script: rebuild it rather than
      // reading a value that may still be mid-animation
      var end = parseFloat(el.dataset.count),
          dec = parseInt(el.dataset.dec || '0', 10);
      out = (el.dataset.pre || '') + end.toFixed(dec) + (el.dataset.suf || '');
    } else {
      out = el.textContent;
    }
    el.dataset.cuText = out;
    return out;
  }

  function figuresIn(group){
    var list = [];
    if (group.matches(FIG)) list.push(group);
    Array.prototype.push.apply(list, group.querySelectorAll(FIG));
    return list.filter(function(el){ return HASNUM.test(finalText(el)); });
  }

  function animate(group){
    var figs = figuresIn(group);
    if (!figs.length) return;

    if (reduce){
      figs.forEach(function(el){ el.textContent = finalText(el); });
      return;
    }

    var plans = figs.map(function(el){
      var src = finalText(el);
      var parts = src.match(NUM) || [];
      return {
        el: el,
        src: src,
        targets: parts.map(function(p){
          var clean = p.replace(/,/g, '');
          return {end: parseFloat(clean), dec: decimals(clean), grouped: p.indexOf(',') !== -1};
        })
      };
    });

    // start everything at zero so the rise is visible
    plans.forEach(function(pl){
      var i = 0;
      pl.el.textContent = pl.src.replace(NUM, function(){
        var t = pl.targets[i++];
        return t.dec ? (0).toFixed(t.dec) : '0';
      });
    });

    var start = null;
    function frame(ts){
      if (!start) start = ts;
      var p = Math.min((ts - start) / DUR, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      plans.forEach(function(pl){
        if (p >= 1){ pl.el.textContent = pl.src; return; }
        var i = 0;
        pl.el.textContent = pl.src.replace(NUM, function(){
          var t = pl.targets[i++];
          var v = (t.end * ease).toFixed(t.dec);
          if (t.grouped) v = Number(v).toLocaleString('en-US',
            {minimumFractionDigits: t.dec, maximumFractionDigits: t.dec});
          return v;
        });
      });
      if (p < 1) requestAnimationFrame(frame);
      else group.dataset.cuRunning = '';
    }
    group.dataset.cuRunning = '1';
    requestAnimationFrame(frame);
  }

  var io = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          var g = e.target;
          if (e.isIntersecting){
            if (g.dataset.cuArmed === '1' && g.dataset.cuRunning !== '1'){
              g.dataset.cuArmed = '0';
              animate(g);
            }
          } else {
            g.dataset.cuArmed = '1';       // re-arm, so it plays again next time
          }
        });
      }, {threshold:.25})
    : null;

  function scan(){
    document.querySelectorAll(GROUPS).forEach(function(g){
      if (g.dataset.cuBound === '1') return;
      // skip a wrapper whose figures are already covered by an inner group
      if (g.parentElement && g.parentElement.closest(GROUPS)) return;
      if (!figuresIn(g).length) return;
      g.dataset.cuBound = '1';
      g.dataset.cuArmed = '1';
      if (io) io.observe(g); else animate(g);
    });
  }

  function boot(){
    // let the site's own counter finish its first pass before we take over
    setTimeout(function(){
      scan();
      [600, 1500, 3000].forEach(function(t){ setTimeout(scan, t); });
      window.addEventListener('hashchange', function(){ setTimeout(scan, 300); });
      var tick = false;
      window.addEventListener('scroll', function(){
        if (tick) return; tick = true;
        requestAnimationFrame(function(){ scan(); tick = false; });
      }, {passive:true});
    }, 2000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
