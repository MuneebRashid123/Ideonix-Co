/* ══════════════════════════════════════════════════════════════
   PROCESS CONNECTORS
   The curves are measured from where the cards actually land, so
   they stay correct at any width and after a reflow. Same-row
   links get a short curve with an arrow puck; a row change gets
   the long S-sweep back across to the next row.
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var flow = document.querySelector('.pf-flow');
  if (!flow) return;
  var svg  = flow.querySelector('.pf-links');
  var grid = flow.querySelector('.pf-grid');
  if (!svg || !grid) return;

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" ' +
              'stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 6l6 6-6 6"/></svg>';

  function draw(){
    var steps = Array.prototype.slice.call(grid.querySelectorAll('.pf-step'));
    if (steps.length < 2) return;

    var base = flow.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + base.width + ' ' + base.height);
    svg.innerHTML = '';
    Array.prototype.forEach.call(flow.querySelectorAll('.pf-dot'), function(d){ d.remove(); });

    // one card per column position, measured live
    var box = steps.map(function(el){
      var r = el.getBoundingClientRect();
      return {l:r.left-base.left, r:r.right-base.left, t:r.top-base.top, b:r.bottom-base.top,
              cy:r.top-base.top + r.height/2};
    });

    var stacked = box.length > 1 && Math.abs(box[1].t - box[0].t) > 4 &&
                  Math.abs(box[1].l - box[0].l) < 4;      // single column layout

    for (var i = 0; i < box.length - 1; i++){
      var a = box[i], b = box[i+1];
      var sameRow = Math.abs(a.t - b.t) < 24;
      var d, wantDot = true, rot = 0;

      if (stacked){
        // one column: straight down the middle
        var mx = (a.l + a.r) / 2;
        d = 'M' + mx + ' ' + a.b + ' L' + mx + ' ' + b.t;
        rot = 90;
      } else if (sameRow){
        // a gentle bow across the gap, alternating up and down
        var bow = (i % 2 === 0) ? -18 : 18;
        d = 'M' + a.r + ' ' + a.cy +
            ' C' + (a.r + 22) + ' ' + (a.cy + bow) + ',' +
                   (b.l - 22) + ' ' + (b.cy + bow) + ',' + b.l + ' ' + b.cy;
      } else {
        // the long sweep back to the start of the next row: out of the
        // bottom of the last card, across the gutter, into the top of
        // the first card on the row below
        var sx = Math.max(a.l + 30, a.r - 34);
        var ex = Math.min(b.r - 30, b.l + 34);
        var gy = (a.b + b.t) / 2;
        var lead = Math.min(90, Math.abs(sx - ex) / 3);
        d = 'M' + sx + ' ' + a.b +
            ' C' + sx + ' ' + (a.b + 26) + ',' + (sx - 30) + ' ' + gy + ',' + (sx - lead) + ' ' + gy +
            ' L' + (ex + lead) + ' ' + gy +
            ' C' + (ex + 30) + ' ' + gy + ',' + ex + ' ' + (b.t - 26) + ',' + ex + ' ' + b.t;
        wantDot = false;
      }

      var colour = (i % 2 === 0) ? '#F5B82E' : '#7C3AED';

      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('class', 'lk');
      p.setAttribute('stroke', colour);
      p.style.setProperty('--i', i);
      svg.appendChild(p);

      var len = 0;
      try { len = p.getTotalLength(); } catch(e){ len = 400; }
      p.style.setProperty('--len', len);

      if (!reduce){
        var f = document.createElementNS(NS, 'path');
        f.setAttribute('d', d);
        f.setAttribute('class', 'flow');
        f.setAttribute('stroke', colour);
        svg.appendChild(f);

        // a light that runs the length of the connector
        var spark = document.createElementNS(NS, 'circle');
        spark.setAttribute('r', '4.2');
        spark.setAttribute('fill', colour);
        spark.setAttribute('class', 'spark');
        var motion = document.createElementNS(NS, 'animateMotion');
        motion.setAttribute('dur', '3.2s');
        motion.setAttribute('repeatCount', 'indefinite');
        motion.setAttribute('path', d);
        motion.setAttribute('begin', (i * 0.36) + 's');
        spark.appendChild(motion);
        svg.appendChild(spark);
      }

      if (wantDot){
        var mid = null;
        try { mid = p.getPointAtLength(len / 2); } catch(e){ mid = null; }
        if (mid){
          var el = document.createElement('span');
          el.className = 'pf-dot ' + (i % 2 === 0 ? 'amber' : 'violet');
          el.setAttribute('aria-hidden', 'true');
          el.style.left = mid.x + 'px';
          el.style.top  = mid.y + 'px';
          el.style.setProperty('--i', i);
          el.innerHTML = ARROW;
          if (rot) el.firstChild.style.transform = 'rotate(' + rot + 'deg)';
          flow.appendChild(el);
        }
      }
    }
  }

  function reveal(){
    if (!('IntersectionObserver' in window)){
      grid.classList.add('seen'); flow.classList.add('drawn'); return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        grid.classList.add('seen');
        flow.classList.add('drawn');
        io.unobserve(e.target);
        // cards animate in from 26px below; measure again once they land
        [80, 700, 1400].forEach(function(ms){ setTimeout(draw, ms); });
      });
    }, {threshold:.12});
    io.observe(grid);
  }

  var t;
  function redraw(){ clearTimeout(t); t = setTimeout(draw, 120); }

  function boot(){
    draw();
    reveal();
    window.addEventListener('resize', redraw, {passive:true});
    // fonts and images can shift the cards after first paint
    [300, 900, 2000].forEach(function(ms){ setTimeout(draw, ms); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
