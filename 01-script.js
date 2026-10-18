(function(){
  var stage=document.getElementById('dmxStage');
  if(!stage)return;
  var cols=[].slice.call(stage.querySelectorAll('.dmx-col')),
      arrows=[].slice.call(stage.querySelectorAll('.dmx-arrow')),
      reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      hold=[3000,2200,2800], i=0, timer=null, running=false;

  if(reduce){
    cols.forEach(function(c){c.classList.add('is-on');});
    arrows.forEach(function(a){a.classList.add('lit');});
    var d0=document.getElementById('dmxDots'); if(d0)d0.style.display='none';
    return;
  }

  var dots=[].slice.call((document.getElementById('dmxDots')||{children:[]}).children),
      rail=window.matchMedia('(max-width:900px)'), self=false, sTimer=null;

  function isRail(){ return stage.scrollWidth - stage.clientWidth > 8; }
  function center(n){
    var c=cols[n], x=c.offsetLeft-(stage.clientWidth-c.offsetWidth)/2;
    self=true; clearTimeout(sTimer); sTimer=setTimeout(function(){self=false;},600);
    try{ stage.scrollTo({left:x,behavior:'smooth'}); }catch(e){ stage.scrollLeft=x; }
  }
  function show(n,fromUser){
    cols.forEach(function(c,k){c.classList.toggle('is-on',k===n);
      if(k===n)c.classList.add('was-on');});   /* played screens stay readable */
    arrows.forEach(function(a,k){a.classList.toggle('lit',k<n);});
    dots.forEach(function(d,k){d.classList.toggle('on',k===n);});
    if(!fromUser && isRail()) center(n);
  }
  function tick(){ i=(i+1)%cols.length; show(i); timer=setTimeout(tick,hold[i]); }
  function start(){ if(running)return; running=true; show(i); timer=setTimeout(tick,hold[i]); }
  function stop(){ running=false; clearTimeout(timer); }

  /* a manual swipe takes over: sync the active phone, then resume the cycle */
  var swTimer=null;
  stage.addEventListener('scroll',function(){
    if(self||!isRail())return;
    clearTimeout(swTimer);
    swTimer=setTimeout(function(){
      var mid=stage.scrollLeft+stage.clientWidth/2, best=0, dist=1e9;
      cols.forEach(function(c,k){
        var d=Math.abs(c.offsetLeft+c.offsetWidth/2-mid);
        if(d<dist){dist=d;best=k;}
      });
      if(best!==i){ i=best; show(i,true); }
      if(running){ clearTimeout(timer); timer=setTimeout(tick,hold[i]); }
    },140);
  },{passive:true});
  rail.addEventListener('change',function(){ show(i); });

  new IntersectionObserver(function(es){
    es.forEach(function(e){ e.isIntersecting?start():stop(); });
  },{threshold:.25}).observe(stage);
})();
