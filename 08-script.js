/* ══════════════════════════════════════════════════════════════
   AI DM — deterministic playback.
   The earlier version relied on toggling a CSS class and letting
   transition-delay stagger the bubbles, which does not restart
   reliably. This drives each bubble from JS instead, with a
   typing indicator before every agent reply.
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timers = new WeakMap();

  function clear(thread){
    (timers.get(thread) || []).forEach(clearTimeout);
    timers.set(thread, []);
  }
  function later(thread, fn, ms){
    var t = setTimeout(fn, ms);
    timers.get(thread).push(t);
  }

  function typingBubble(){
    var d = document.createElement('div');
    d.className = 'dmx-msg in svai-typing';
    d.setAttribute('aria-hidden', 'true');
    d.innerHTML = '<i></i><i></i><i></i>';
    return d;
  }

  function play(stage){
    var thread = stage.querySelector('.dmx-thread');
    if (!thread) return;
    var items = Array.prototype.filter.call(thread.children, function(n){
      return !n.classList.contains('svai-typing');
    });
    clear(thread);
    Array.prototype.forEach.call(thread.querySelectorAll('.svai-typing'), function(n){ n.remove(); });

    if (reduce){                                  // no motion: show it all at once
      items.forEach(function(n){ n.classList.add('show'); });
      stage.classList.add('is-done');
      return;
    }

    items.forEach(function(n){ n.classList.remove('show'); });
    stage.classList.remove('is-done');

    var t = 350;
    items.forEach(function(node, i){
      var fromAgent = node.classList.contains('in') || node.classList.contains('dmx-card');
      if (fromAgent){
        var think = 420;
        later(thread, function(){
          var bub = typingBubble();
          thread.appendChild(bub);
          thread.scrollTop = thread.scrollHeight;
          later(thread, function(){
            bub.remove();
            node.classList.add('show');
            thread.appendChild(node);            // keep reading order at the bottom
            thread.scrollTop = thread.scrollHeight;
            if (i === items.length - 1) stage.classList.add('is-done');
          }, think);
        }, t);
        t += think + 320;
      } else {
        later(thread, function(){
          node.classList.add('show');
          thread.appendChild(node);
          thread.scrollTop = thread.scrollHeight;
          if (i === items.length - 1) stage.classList.add('is-done');
        }, t);
        t += 480;
      }
    });
  }

  /* auto-start when it scrolls in; restart if you come back to it */
  function watch(){
    var stages = document.querySelectorAll('.svai-stage');
    if (!stages.length) return;
    if (!('IntersectionObserver' in window)){
      Array.prototype.forEach.call(stages, play);
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var st = e.target;
        if (e.isIntersecting){
          if (!st.dataset.playing){ st.dataset.playing = '1'; play(st); }
        } else {
          delete st.dataset.playing;             // allow a fresh run next time
        }
      });
    }, {threshold:.25});
    Array.prototype.forEach.call(stages, function(st){ io.observe(st); });
  }

  document.addEventListener('click', function(e){
    var btn = e.target.closest && e.target.closest('[data-replay]');
    if (!btn) return;
    var stage = btn.closest('.svai-stage');
    if (stage) play(stage);
  });

  window.addEventListener('hashchange', function(){
    setTimeout(function(){
      var page = document.querySelector('.svpage.on');
      if (!page) return;
      var st = page.querySelector('.svai-stage');
      if (st) delete st.dataset.playing;          // re-arm for the new page
    }, 120);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch);
  else watch();
})();
