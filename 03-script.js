/* ─── single-file router: #service/<slug> swaps the page ─── */
(function(){
  var main=document.getElementById('mainPage'),
      panels=[].slice.call(document.querySelectorAll('.svpage')),
      base=document.title;
  function show(){
    var m=(location.hash||'').match(/^#service\/([a-z0-9-]+)$/), hit=null;
    if(m) hit=document.getElementById('sv-'+m[1]);
    panels.forEach(function(p){p.classList.toggle('on',p===hit);});
    main.style.display=hit?'none':'';
    document.title=hit?(hit.dataset.title||base):base;
    document.documentElement.classList.toggle('on-service',!!hit);
    if(hit){
      window.scrollTo(0,0);
      hit.querySelectorAll('.rv').forEach(function(el){el.classList.add('seen');});
    }else if(location.hash&&location.hash.length>1&&location.hash.indexOf('/')<0){
      var el=null;
      try{el=document.querySelector(location.hash);}catch(e){}
      if(el)setTimeout(function(){el.scrollIntoView({behavior:'auto',block:'start'});},0);
    }
  }
  window.addEventListener('hashchange',function(){
    var m=(location.hash||'').match(/^#service\//);
    if(m||document.documentElement.classList.contains('on-service')) show();
  });
  show();
})();
