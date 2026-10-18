/* keep the page padding in step with the fixed header */
(function(){
  'use strict';
  function size(){
    document.querySelectorAll('.svpage').forEach(function(p){
      var nav = p.querySelector('.sv-nav');
      if (nav) p.style.setProperty('--navh', Math.round(nav.offsetHeight) + 'px');
    });
  }
  function boot(){
    size();
    window.addEventListener('resize', size, {passive:true});
    window.addEventListener('hashchange', function(){ setTimeout(size, 60); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
