(function(){
"use strict";
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('yr').textContent=new Date().getFullYear();

var ICON={
 bulb:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z"/></svg>',
 chess:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-6 7 6v11"/><path d="M9 21v-6h6v6"/></svg>',
 search:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 layers:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
 code:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
 sparkle:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17Z"/></svg>',
 rocket:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13c-1.5 1.5-2 6-2 6s4.5-.5 6-2"/><path d="M14.5 4.5C18 3 21 3 21 3s0 3-1.5 6.5c-1.7 4-5.5 7-9.5 8L7 14.5c1-4 4-7.8 7.5-10Z"/><circle cx="15" cy="9" r="1.6"/></svg>',
 chart:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m7 15 3.5-4 3 2.5L20 7"/></svg>',
 pen:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19 19 12l3 3-7 7-3-3Z"/><path d="M18 13 16.5 5.5 2 2l3.5 14.5L13 18l5-5Z"/><path d="m2 2 7.6 7.6"/><circle cx="11" cy="11" r="2"/></svg>',
 phone:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="3"/><path d="M11 18h2"/></svg>',
 share:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>',
 target:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>',
 bot:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="4"/><circle cx="9" cy="14" r="1.4" fill="currentColor"/><circle cx="15" cy="14" r="1.4" fill="currentColor"/><path d="M12 3v5"/></svg>',
 cam:'<svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
 arrow:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 star:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z"/></svg>',
 vf:'<svg class="verified" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1 9.6 3.5 6.2 3l-.6 3.4L2.5 8l1.5 3.1L2.5 14l3.1 1.6.6 3.4 3.4-.5L12 21l2.4-2.5 3.4.5.6-3.4L21.5 14 20 11.1 21.5 8l-3.1-1.6-.6-3.4-3.4.5L12 1Zm-1 13.5L7.5 11l1.4-1.4 2.1 2.1 4.6-4.6L17 8.5l-6 6Z"/></svg>',
 chk:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
};

/* ───── socials ───── */
var SOCIALS=[
 {n:'LinkedIn',c:'s-li',u:'https://www.linkedin.com/company/ideonixco/',s:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95C21.4 8.75 22 11.1 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4V9Z"/></svg>'},
 {n:'Instagram',c:'s-ig',u:'https://www.instagram.com/ideonixco',s:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.8" cy="6.2" r="1.2" fill="currentColor" stroke="none"/></svg>'},
 {n:'Facebook',c:'s-fb',u:'https://facebook.com/Ideonixco/',s:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5.5h-3c-2.2 0-4 1.8-4 4V12H7.5v3.5H10V22h3.5v-6.5H16l.5-3.5h-3v-2c0-.6.4-1 1-1Z"/></svg>'},
 {n:'WhatsApp',c:'s-wa',u:'https://wa.me/923360187339',s:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a11 11 0 0 1-4.9-4.2c-.4-.6-.9-1.5-.9-2.4 0-.9.5-1.4.7-1.6.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.5l-.3.4c-.1.2-.3.3-.1.6.4.7 1 1.3 1.6 1.7.3.2.5.2.7 0l.6-.7c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.4.3v.7Z"/></svg>'}
];
function socHTML(){return SOCIALS.map(function(s){
 return '<a href="'+s.u+'" class="'+s.c+'" aria-label="Ideonix Co. on '+s.n+'" target="_blank" rel="noopener">'+s.s+'</a>';}).join('');}
['drawerSoc','footSoc'].forEach(function(id){document.getElementById(id).innerHTML=socHTML();});

/* ───── nav ───── */
var nav=document.getElementById('nav'),burger=document.getElementById('burger'),sticky=document.getElementById('sticky');
burger.addEventListener('click',function(){var o=nav.classList.toggle('open');
 burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');});
document.querySelectorAll('#drawer nav a').forEach(function(a){
 a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
var heroEl=document.querySelector('.hero');
function onScroll(){
 var y=window.scrollY, trigger=Math.max(120,(heroEl?heroEl.offsetHeight:400)-90);
 nav.classList.toggle('stuck',y>trigger);
 sticky.classList.toggle('up',y>560);}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

/* ───── reveal + counters ───── */
var io=new IntersectionObserver(function(es){es.forEach(function(e){
 if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target);}});},
 {rootMargin:'0px 0px -60px 0px',threshold:.1});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
var cio=new IntersectionObserver(function(es){es.forEach(function(e){
 if(!e.isIntersecting)return;cio.unobserve(e.target);
 var el=e.target,end=parseFloat(el.dataset.count),dec=parseInt(el.dataset.dec||'0',10),
     pre=el.dataset.pre||'',suf=el.dataset.suf||'';
 if(reduce){el.textContent=pre+end.toFixed(dec)+suf;return;}
 var t0=null;
 function step(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1400,1),ea=1-Math.pow(1-p,3);
  el.textContent=pre+(end*ea).toFixed(dec)+suf;if(p<1)requestAnimationFrame(step);}
 requestAnimationFrame(step);});},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});
var track=document.getElementById('track');track.innerHTML+=track.innerHTML;

/* ═════ HERO SLIDER ═════ */
/* ───────────────────────────────────────────────────────────
   HERO BANNER SLIDES
   To swap a photo: replace the `img` value with your own image
   URL (e.g. 'images/banner-2.jpg'). Slides without an `img`
   fall back to the brand gradient in `bg`. Recommended photo
   size: 1600 x 550, under 200KB.
   ─────────────────────────────────────────────────────────── */
var SLIDES=[
 {vd:'banner-workflow-desktop.mp4',vm:'banner-workflow-mobile.mp4',
  pd:'banner-workflow-desktop-poster.jpg',pm:'banner-workflow-mobile-poster.jpg',
  light:true,cls:'v-workflow',
  bg:'#EDE3FC',scrim:'transparent',
  eyebrow:'💡 Innovation &amp; product development',
  title:'Transforming Ideas into <em>Winning Products</em>.',
  text:'From the first sketch to market launch, we validate your idea, shape the strategy, design the experience, and build your product, ready to launch and scale.',
  b1:'Book a discovery call',b2:'See our services'},

 {vd:'banner-figma-desktop.mp4',vm:'banner-figma-mobile.mp4',
  pd:'banner-figma-desktop-poster.jpg',pm:'banner-figma-mobile-poster.jpg',
  light:true,cls:'v-figma',
  bg:'#EAFCB6',scrim:'transparent',
  eyebrow:'🌐 Product development',
  title:'Web platforms, apps and <em>SaaS, built to ship</em>.',
  text:'Wireframes, prototypes and polished interfaces, designed with your customers in mind, then handed straight to our developers.',
  b1:'Scope your build',b2:'See our services'},

 {vd:'banner-social-desktop.mp4',vm:'banner-social-mobile.mp4',
  pd:'banner-social-desktop-poster.jpg',pm:'banner-social-mobile-poster.jpg',
  light:true,cls:'v-social',
  bg:'#F9FCE9',scrim:'transparent',
  eyebrow:'📈 Social media &amp; AI automation',
  title:'Grow smarter with <em>AI on every channel</em>.',
  text:'Ideonix AI answers Instagram, WhatsApp and Facebook around the clock, while the team behind it ships the content, the creative and the ads.',
  b1:'Automate your DMs',b2:'See our services'},

 {vd:'banner-chatbot-desktop.mp4',vm:'banner-chatbot-mobile.mp4',
  pd:'banner-chatbot-desktop-poster.jpg',pm:'banner-chatbot-mobile-poster.jpg',
  light:true,cls:'v-chatbot',
  bg:'#FBFAFF',scrim:'transparent',
  eyebrow:'🤖 AI automation',
  title:'Your AI sales agent, <em>always on</em>.',
  text:'Ideonix AI answers customers, shares prices and takes orders on your Website, WhatsApp and Instagram, day and night.',
  b1:'Meet Ideonix AI',b2:'Watch the live demo'},

 {vd:'banner-launch-desktop.mp4',vm:'banner-launch-mobile.mp4',
  pd:'banner-launch-desktop-poster.jpg',pm:'banner-launch-mobile-poster.jpg',
  light:true,cls:'v-launch',
  bg:'#EAFEB7',scrim:'transparent',
  eyebrow:'🚀 Go to market',
  title:'A launch plan, <em>not just a launch day</em>.',
  text:'Branding, positioning, customer acquisition and launch execution, with performance monitoring and optimisation once you are live.',
  b1:'Plan your launch',b2:'Talk to a strategist'}
];
var slidesEl=document.getElementById('slides'),dotsEl=document.getElementById('dots'),sbar=document.getElementById('sbar');
slidesEl.innerHTML=SLIDES.map(function(s,i){
 var bg=s.img?("url('"+s.img+"'),"+s.bg):s.bg;
 var bp=s.pos||'center';
 var media=s.vd
  ?'<div class="slide-bg slide-vid '+(s.cls||'')+'">'+
    '<video class="vid-d vid-fg" src="'+s.vd+'" poster="'+s.pd+'" muted playsinline preload="auto" aria-hidden="true" tabindex="-1"></video>'+
    '<video class="vid-m" src="'+s.vm+'" poster="'+s.pm+'" muted playsinline preload="auto" aria-hidden="true" tabindex="-1"></video>'+
   '</div>'
  :'<div class="slide-bg" style="background-image:'+bg+';background-position:'+bp+'"></div>';
 return '<div class="slide'+(s.light?' slide-light '+(s.cls||''):'')+(i===0?' on':'')+'" role="group" aria-roledescription="slide" aria-label="'+(i+1)+' of '+SLIDES.length+'">'+
  media+
  '<div class="slide-scrim" style="background:'+s.scrim+'"></div>'+
  '<div class="slide-body">'+
   '<span class="badge">'+s.eyebrow+'</span>'+
   '<h1>'+s.title+'</h1><p>'+s.text+'</p>'+
   '<div class="slide-cta"><a href="#book" class="btn btn-p">'+s.b1+'</a><a href="#what-we-do" class="btn btn-g">'+s.b2+'</a></div>'+
  '</div></div>';}).join('');
dotsEl.innerHTML=SLIDES.map(function(s,i){
 return '<button role="tab" class="'+(i===0?'on':'')+'" data-i="'+i+'" aria-label="Slide '+(i+1)+'" aria-selected="'+(i===0)+'"></button>';}).join('');
var cur=0,DUR=6500,t0=0,raf=null;
function actVid(){
 var sl=slidesEl.querySelectorAll('.slide')[cur];if(!sl)return null;
 var vs=sl.querySelectorAll('video');
 for(var i=0;i<vs.length;i++){if(vs[i].offsetWidth>0)return vs[i];}
 return null;
}
function playVid(){
 slidesEl.querySelectorAll('.slide').forEach(function(sl,i){
  sl.querySelectorAll('video').forEach(function(v){
   if(i===cur&&v.offsetWidth>0){try{v.currentTime=0;}catch(e){}var pr=v.play();if(pr&&pr.catch)pr.catch(function(){});}
   else{v.pause();}
  });
 });
}
function paint(){
 slidesEl.querySelectorAll('.slide').forEach(function(s,i){s.classList.toggle('on',i===cur);});
 playVid();
 var sl=document.getElementById('slider');if(sl)sl.classList.toggle('is-light',!!SLIDES[cur].light);
 dotsEl.querySelectorAll('button').forEach(function(d,i){d.classList.toggle('on',i===cur);d.setAttribute('aria-selected',i===cur);});
}
function go(i){cur=(i+SLIDES.length)%SLIDES.length;paint();restart();}
function tick(ts){
 if(!t0)t0=ts;
 var v=actVid(),p;
 if(v&&v.currentTime>0&&v.duration>0){p=v.currentTime/v.duration;}      /* follow the video's own length */
 else{p=(ts-t0)>2500?(ts-t0)/DUR:0;}                                    /* fallback if the video cannot start */
 sbar.style.width=(Math.min(p,1)*100)+'%';
 if(p>=0.995||(v&&v.ended)){t0=0;go(cur+1);return;}
 raf=requestAnimationFrame(tick);
}
function resumeVid(){var v=actVid();if(v&&v.paused&&!v.ended){var pr=v.play();if(pr&&pr.catch)pr.catch(function(){});}}
function restart(){if(reduce)return;cancelAnimationFrame(raf);t0=0;resumeVid();raf=requestAnimationFrame(tick);}
function stopS(){cancelAnimationFrame(raf);}   /* hover/focus: video keeps playing, the slider just waits before changing banner */
paint();restart();
document.getElementById('next').addEventListener('click',function(){go(cur+1);});
document.getElementById('prev').addEventListener('click',function(){go(cur-1);});
dotsEl.querySelectorAll('button').forEach(function(d){d.addEventListener('click',function(){go(parseInt(d.dataset.i,10));});});
var slider=document.getElementById('slider');
slider.addEventListener('mouseenter',stopS);slider.addEventListener('mouseleave',restart);
slider.addEventListener('focusin',stopS);
document.addEventListener('visibilitychange',function(){if(document.hidden){stopS();var v=actVid();if(v)v.pause();}else{restart();}});
var sx=0,sy=0;
slider.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY;stopS();},{passive:true});
slider.addEventListener('touchend',function(e){
 var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
 if(Math.abs(dx)>46&&Math.abs(dx)>Math.abs(dy)){go(dx<0?cur+1:cur-1);}else{restart();}},{passive:true});

/* ═════ SERVICES ═════ */
var GROUPS={
 core:[
  {k:'a-orange',ic:ICON.bulb,t:'Idea Discovery & Validation',
   d:"We assess ideas, identify opportunities, validate market demand and define a clear product direction before development begins.",
   tags:['Idea assessment','Demand validation','Opportunity mapping','Product direction']},
  {k:'a-navy',ic:ICON.chess,t:'Business & Product Strategy',
   d:"We create business models, product roadmaps, go-to-market strategies and growth plans that turn concepts into viable businesses.",
   tags:['Business models','Product roadmap','Growth planning']},
  {k:'a-blue',ic:ICON.search,t:'Market Research',
   d:"We conduct industry analysis, competitor research, customer insights and opportunity assessments to support informed decision-making.",
   tags:['Industry analysis','Competitor research','Customer insights']},
  {k:'a-plum',ic:ICON.layers,t:'UI/UX Design',
   d:"We design intuitive digital experiences, user journeys, wireframes, prototypes and interfaces that align with customer needs.",
   tags:['User journeys','Wireframes','Prototypes','Design systems']},
  {k:'a-teal',ic:ICON.code,t:'Product Development',
   d:"Our team develops web platforms, mobile applications, SaaS products and digital solutions using modern technologies.",
   tags:['Web platforms','Mobile apps','SaaS','Modern stack']},
  {k:'a-rose',ic:ICON.sparkle,t:'Branding & Positioning',
   d:"We build strong brand identities, messaging frameworks and market positioning strategies that help products stand out.",
   tags:['Brand identity','Messaging','Positioning','Guidelines']},
  {k:'a-amber',ic:ICON.target,t:'Go-To-Market Planning',
   d:"We prepare products for launch through marketing strategies, customer acquisition planning and commercialisation frameworks.",
   tags:['Marketing strategy','Acquisition planning','Commercialisation']},
  {k:'a-green',ic:ICON.rocket,t:'Product Launch Support',
   d:"We provide launch execution support, performance monitoring and optimisation to ensure successful market entry.",
   tags:['Launch execution','Performance monitoring','Optimisation']}
 ],
 growth:[
  {k:'a-navy',ic:ICON.code,t:'Web development',
   d:"Custom storefronts, business sites and web apps. Built to load fast, rank well and convert — not just look good in a screenshot.",
   tags:['Shopify','WordPress','Next.js','SEO ready']},
  {k:'a-rose',ic:ICON.pen,t:'Graphic design',
   d:"Brand identity, packaging, ad creative and social templates. A visual system your team can keep using after we hand it over.",
   tags:['Identity','Packaging','Ad creative','Brand guides']},
  {k:'a-teal',ic:ICON.phone,t:'App development',
   d:"Native iOS and Android, or one React Native codebase for both. We ship it to the stores, then monitor and maintain it for you.",
   tags:['iOS','Android','React Native','Maintenance']},
  {k:'a-amber',ic:ICON.share,t:'Social media handling',
   d:"Full account management — calendar, posting, community replies and monthly reporting. Your feed stops going quiet for three weeks at a time.",
   tags:['Content calendar','Daily posting','Community','Reporting']},
  {k:'a-blue',ic:ICON.chart,t:'Meta & TikTok ads',
   d:"Media buying, creative testing and audience scaling. Every campaign points somewhere Ideonix AI can actually convert.",
   tags:['Media buying','Creative testing','Retargeting']},
  {k:'a-orange',ic:ICON.bot,t:'AI automation',
   d:"Ideonix AI on your Instagram and WhatsApp — plus CRM, Shopify and COD verification workflows wired end to end.",
   tags:['Ideonix agent','Official Meta API','Shopify sync','COD']},
  {k:'a-plum',ic:ICON.cam,t:'Content creation',
   d:"Reels, UGC-style video, product photography and copy — produced in batches every week so you never run out of things to test.",
   tags:['Reels','UGC video','Product photos','Copywriting']}
 ]
};
/* legacy services grid removed — replaced by the static #what-we-do card grid */

/* ═════ WHY ═════ */
var WHY=[
 {t:'End-to-end innovation partner',d:'Research, strategy, design, build and launch handled by one accountable team.'},
 {t:'From idea to market under one roof',d:'No handoffs between four vendors who blame each other when something slips.'},
 {t:'Strategic, creative and technical',d:'Business thinking, design craft and engineering sitting in the same room.'},
 {t:'Faster product development cycles',d:'Parallel workstreams and reusable foundations cut months off a typical build.'},
 {t:'Market-focused execution',d:'We validate demand before we write code, so you build what people will pay for.'},
 {t:'Scalable for startups and enterprises',d:'The same process works for a first MVP and a multi-region rollout.'}
];
document.getElementById('whyGrid').innerHTML=WHY.map(function(w){
 return '<div class="why-item rv"><span class="wi" aria-hidden="true">'+ICON.chk+'</span>'+
  '<div><b>'+w.t+'</b><span>'+w.d+'</span></div></div>';}).join('');
document.querySelectorAll('#whyGrid .rv').forEach(function(el){io.observe(el);});

/* ═════ CONVERSATION ENGINE ═════ */
function bubble(m){var d=document.createElement('div');d.className='msg '+m.who;
 if(m.product){d.innerHTML='<div class="prod"><span class="sw"></span><div><b>'+m.product.name+'</b><span>'+m.product.meta+'</span></div></div>'+m.text;}
 else{d.textContent=m.text;}return d;}
function Player(node,script,opts){
 opts=opts||{};var timers=[],idx=0,max=opts.max||7;
 function clear(){timers.forEach(clearTimeout);timers=[];}
 function next(){
  if(idx>=script.length){if(opts.onDone)opts.onDone();if(opts.loop)timers.push(setTimeout(start,4200));return;}
  var m=script[idx];
  if(opts.onStep)opts.onStep(m.step);
  function render(){node.appendChild(bubble(m));
   while(node.children.length>max)node.removeChild(node.firstChild);
   node.scrollTop=node.scrollHeight;idx++;timers.push(setTimeout(next,m.after||1200));}
  if(m.who!=='them'&&!reduce){
   var t=document.createElement('div');t.className='typing';t.innerHTML='<i></i><i></i><i></i>';
   node.appendChild(t);node.scrollTop=node.scrollHeight;
   timers.push(setTimeout(function(){t.remove();render();},m.think||850));
  }else{render();}}
 function start(){clear();idx=0;node.innerHTML='';if(opts.onReset)opts.onReset();
  if(reduce){script.forEach(function(m){node.appendChild(bubble(m));});
   while(node.children.length>max)node.removeChild(node.firstChild);if(opts.onDone)opts.onDone();return;}
  timers.push(setTimeout(next,500));}
 return {start:start,stop:clear};}

var rail=document.getElementById('notifRail');
var sales=[{id:'#IDX-118',who:'@nabeel.k',item:'AI chatbot setup',amt:'call'},
           {id:'#IDX-119',who:'@zara.founder',item:'Marketplace build',amt:'scoped'},
           {id:'#IDX-120',who:'@hassan.retail',item:'WhatsApp + Shopify',amt:'booked'}];
var si=0;
function pushSale(){var s=sales[si%sales.length];si++;
 var n=document.createElement('div');n.className='notif';
 n.innerHTML='<span class="ic"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>'+
  '<div><b>New lead '+s.id+'</b><small>'+s.who+' · '+s.item+'</small></div><span class="amt">'+s.amt+'</span>';
 rail.appendChild(n);while(rail.children.length>2)rail.removeChild(rail.firstChild);}
pushSale();

var caseScript=[
 {who:'them',step:1,text:'Saw your reel — do you build AI chatbots for Instagram?',after:1200},
 {who:'us',step:1,text:"We do — Instagram DM agents, WhatsApp Business bots and website live chat, all on the official APIs.",think:900,after:1600},
 {who:'them',step:2,text:'I run a retail brand, about 12k followers on Shopify',after:1200},
 {who:'us',step:2,text:'Then the WhatsApp + Instagram setup fits. Trained on your catalogue, live stock checks, order written straight into Shopify.',think:950,after:1700},
 {who:'them',step:3,text:'Is it safe though? I have heard bots get accounts banned',after:1300},
 {who:'us',step:3,text:"Fair concern. We only build on the official Meta and WhatsApp Business APIs — no browser automation, which is what actually gets accounts restricted. You can revoke our access in one click.",think:1100,after:1900},
 {who:'them',step:3,text:'Makes sense. How long and roughly how much?',after:1200},
 {who:'us',step:4,text:'Seven days to go live. Exact number comes after the free audit — no guessing. Shall I book you in with a strategist?',think:950,after:1600},
 {who:'them',step:4,text:'Yes please, Thursday if possible',after:1000},
 {who:'us',step:4,text:'Booked — Thursday 4:00pm PKT. Scope summary and invite are in your inbox 👇',think:850,after:1400},
 {who:'sys',step:5,text:'✅ Lead #IDX-118 · discovery call booked · scope sent',after:2800}
];
var steps=Array.prototype.slice.call(document.querySelectorAll('#steps li'));
var ord1=document.getElementById('ord1'),ord2=document.getElementById('ord2');
var casePlayer=Player(document.getElementById('caseThread'),caseScript,{
 onReset:function(){steps.forEach(function(li){li.classList.remove('on');});ord1.classList.remove('in');ord2.classList.remove('in');},
 onStep:function(n){if(!n)return;steps.forEach(function(li,i){li.classList.toggle('on',i===n-1);});},
 onDone:function(){steps.forEach(function(li){li.classList.add('on');});
  setTimeout(function(){ord1.classList.add('in');},300);
  setTimeout(function(){ord2.classList.add('in');pushSale();},900);}});
var started=false;
var dio=new IntersectionObserver(function(es){es.forEach(function(e){
 if(e.isIntersecting&&!started){started=true;casePlayer.start();}});},{threshold:.25});
dio.observe(document.getElementById('demo'));
document.getElementById('replay').addEventListener('click',function(){casePlayer.start();});


/* ═════ premium motion: scroll parallax + cursor tilt ═════ */
(function(){
 if(reduce)return;
 var par=[].slice.call(document.querySelectorAll('[data-par]'));
 var ticking=false;
 function move(){
  var vh=window.innerHeight;
  par.forEach(function(el){
   var r=el.getBoundingClientRect();
   if(r.bottom<-200||r.top>vh+200)return;
   var mid=r.top+r.height/2, off=(vh/2-mid)*parseFloat(el.dataset.par);
   el.style.setProperty('--pv',off.toFixed(1)+'px');
  });
  ticking=false;
 }
 function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(move);}}
 window.addEventListener('scroll',onScroll,{passive:true});
 window.addEventListener('resize',onScroll);
 move();

 document.querySelectorAll('[data-tilt]').forEach(function(card){
  card.addEventListener('mousemove',function(e){
   var r=card.getBoundingClientRect(),
       x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
   card.style.setProperty('--mx',(x*100).toFixed(1)+'%');
   card.style.setProperty('--my',(y*100).toFixed(1)+'%');
   card.style.setProperty('--ry',((x-.5)*11).toFixed(2)+'deg');
   card.style.setProperty('--rx',((.5-y)*9).toFixed(2)+'deg');
  });
  card.addEventListener('mouseleave',function(){
   card.style.setProperty('--rx','0deg'); card.style.setProperty('--ry','0deg');
  });
 });
})();










/* ═════ each phone plays its own DM exchange when it scrolls into view ═════ */
(function(){
 var threads=[].slice.call(document.querySelectorAll('.pthread'));
 if(!threads.length)return;

 /* you = customer · info = what the AI worked out · ai = the reply · res = the result */
 var SEQ=[
  /* 1 · what we build — the chatbot products, and how they work */
  [ {w:'you',t:'Hi! Do you build AI chatbots?',d:950},
    {w:'info',t:'Intent: service enquiry · matched to AI Automation',d:900},
    {w:'ai',t:'Yes — Instagram DM agents, WhatsApp Business chatbots, Messenger bots and website live chat. All on official APIs, so your account stays safe.',think:850,d:1400},
    {w:'you',t:'How does it actually work?',d:950},
    {w:'ai',t:'We train it on your catalogue and past chats. It reads photos and voice notes, answers in your brand voice in about 4 seconds, and writes the order into your store.',think:900,d:1500},
    {w:'res',t:'Service matched · AI chatbot automation',d:2600} ],

  /* 2 · the full service list */
  [ {w:'you',t:'Besides chatbots, what else do you offer?',d:1000},
    {w:'info',t:'Sending service overview · 10 services',d:900},
    {w:'ai',t:'Ten in total: custom software, product development, web, mobile apps, UI/UX design, e-commerce, AI automation, SaaS platforms, API integration and digital marketing.',think:900,d:1500},
    {w:'you',t:'Do I have to take all of them?',d:950},
    {w:'ai',t:'Not at all. Most clients start with one and add more later — we scope only what you need.',think:800,d:1200},
    {w:'res',t:'Service overview sent · 10 services',d:2600} ],

  /* 3 · interested → the details */
  [ {w:'you',t:'Interested. Can you share details for a WhatsApp chatbot?',d:1050},
    {w:'info',t:'Client profile: retail brand · 12k followers · Shopify store',d:1000},
    {w:'ai',t:'Setup takes about 7 days. It includes catalogue training, official WhatsApp Business API access, Shopify order sync and 30 days of tuning after launch.',think:900,d:1500},
    {w:'ai',t:'From you we need catalogue access, your FAQs and a WhatsApp number. Shall I book a free audit call this week?',think:850,d:1300},
    {w:'you',t:'Yes please, Thursday works',d:900},
    {w:'res',t:'✅ Discovery call booked · Thu 4:00pm PKT · invite sent',d:2800} ],

  /* 4 · order + payment, in full */
  [ {w:'info',t:'Package selected: AI Chatbot Setup — WhatsApp + Instagram',d:1000},
    {w:'ai',t:'Order summary: WhatsApp AI chatbot setup, Instagram DM agent, Shopify order sync and 30 days of tuning — $2,400 total.',think:850,d:1500},
    {w:'info',t:'Payment plan: 50% advance $1,200 · balance on delivery',d:1000},
    {w:'you',t:'Sending the advance now',d:950},
    {w:'info',t:'Payment received · bank transfer · invoice #IDX-4821',d:1000},
    {w:'res',t:'✅ Order confirmed · $2,400 · build starts Monday',d:2800} ]
 ];

 var timers={};                      /* one timer chain per phone */
 function stop(i){(timers[i]||[]).forEach(clearTimeout);timers[i]=[];}

 function bubble(node,m){
  var d=document.createElement('div');
  d.className='pmsg '+m.w; d.textContent=m.t;
  node.appendChild(d); node.scrollTop=node.scrollHeight;
 }

 function play(i){
  var node=threads[i],seq=SEQ[i];
  if(!node||!seq)return;
  stop(i); node.innerHTML='';
  if(reduce){seq.forEach(function(m){bubble(node,m);});return;}
  var k=0;
  (function next(){
   if(k>=seq.length){                                  /* hold, then loop */
    timers[i].push(setTimeout(function(){play(i);},3200));
    return;
   }
   var m=seq[k++];
   function land(){bubble(node,m);timers[i].push(setTimeout(next,m.d||900));}
   if(m.w==='ai'){
    var t=document.createElement('div');
    t.className='ptyping'; t.innerHTML='<i></i><i></i><i></i>';
    node.appendChild(t); node.scrollTop=node.scrollHeight;
    timers[i].push(setTimeout(function(){t.remove();land();},m.think||800));
   } else land();
  })();
 }

 /* play only what's on screen; stop the rest so nothing runs in the background */
 var io=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
   var i=+e.target.dataset.step;
   if(e.isIntersecting){e.target.classList.add('seen');play(i);}
   else stop(i);
  });
 },{threshold:.28});
 document.querySelectorAll('.fsx-row').forEach(function(r){io.observe(r);});
})();

/* ═════ REVIEWS ═════ */
document.getElementById('rvxStars').innerHTML=ICON.star.repeat(5);
var REVIEWS=[
 {n:'Hina Raza',r:'Operations Lead, Saffron House',loc:'Karachi, PK',ini:'HR',bg:'linear-gradient(135deg,#9333EA,#BBFE11)',
  s:'E-Commerce Website',m:'\u221262%',ml:'COD return rate',d:'21 May 2026',dt:'2026-05-21',stars:5,
  q:"Cash on delivery was destroying our margin with fake orders. The storefront they built verifies every COD order by phone before dispatch, and returns dropped by more than half in the first month."},
 {n:'Omar Farooq',r:'Co-founder, Moda Rey',loc:'Manama, BH',ini:'OF',bg:'linear-gradient(135deg,#5B21B6,#2A1A5E)',
  s:'AI Automation',m:'11 min \u2192 4 sec',ml:'First response time',d:'11 Feb 2026',dt:'2026-02-11',stars:5,
  q:"Ideonix AI now answers our Instagram and WhatsApp round the clock. Nobody waits until morning for a price any more, and the orders it captures land straight in our system."},
 {n:'James Whitfield',r:'Director, Northbound',loc:'New York, US',ini:'JW',bg:'linear-gradient(135deg,#15803D,#2A1A5E)',
  s:'Mobile App Development',m:'4.8\u2605',ml:'App store rating',d:'8 April 2026',dt:'2026-04-08',stars:5,
  q:"We came for a website and stayed for the whole product build. The React Native app they shipped holds a 4.8 rating, and I deal with one project manager instead of four separate agencies."},
 {n:'Daniyal Ahmed',r:'Head of Growth, Velo Athletics',loc:'Sydney, AU',ini:'DA',bg:'linear-gradient(135deg,#2A1A5E,#7C3AED)',
  s:'Digital Marketing',m:'4.9x',ml:'ROAS in month two',d:'2 June 2026',dt:'2026-06-02',stars:5,
  q:"Meta and TikTok buying with real creative testing behind it. They ship eleven ad variations a week now instead of two a month, and every campaign points at a page that actually converts."},
 {n:'Sana Mirza',r:'Founder, Lunaform',loc:'Karachi, PK',ini:'SM',bg:'linear-gradient(135deg,#BBFE11,#A5E80C)',
  s:'Product Development',m:'4 months',ml:'Pitch deck to launch',d:'14 July 2026',dt:'2026-07-14',stars:5,
  q:"Ideonix took our idea from a rough pitch deck to a launched product in four months. They pushed back on half our assumptions during validation, which stung at the time and saved us a fortune later."},
 {n:'Fatima Al-Suwaidi',r:'Operations Director, Arenite',loc:'Doha, QA',ini:'FA',bg:'linear-gradient(135deg,#4D7C0F,#BBFE11)',
  s:'Custom Software Development',m:'9 hrs',ml:'Saved every week',d:'19 March 2026',dt:'2026-03-19',stars:5,
  q:"They replaced four spreadsheets with one internal dashboard our branch managers actually use. Bilingual from day one, and the team answers during our working hours, not theirs."},
 {n:'Bilal Khan',r:'CTO, Peregrine Logistics',loc:'Lahore, PK',ini:'BK',bg:'linear-gradient(135deg,#6D28D9,#C084FC)',
  s:'API & System Integration',m:'3 systems',ml:'One dashboard',d:'27 June 2026',dt:'2026-06-27',stars:5,
  q:"Our courier API, ERP and CRM never spoke to each other. Ideonix wired them together with proper webhooks and error handling, so nobody re-keys an order into a spreadsheet at midnight."},
 {n:'Aisha Siddiqui',r:'Product Lead, Clarity HR',loc:'Dubai, AE',ini:'AS',bg:'linear-gradient(135deg,#7C3AED,#A78BFA)',
  s:'SaaS & Cloud Platforms',m:'12k users',ml:'Zero downtime',d:'5 May 2026',dt:'2026-05-05',stars:5,
  q:"Multi-tenant from the start, with subscription billing and role-based access we did not have to bolt on later. We have crossed twelve thousand users without a single outage."},
 {n:'Rohan Mehta',r:'Founder, Tilt Studio',loc:'Toronto, CA',ini:'RM',bg:'linear-gradient(135deg,#2A1A5E,#9333EA)',
  s:'UI/UX Product Design',m:'2.4x',ml:'Signup completion',d:'16 April 2026',dt:'2026-04-16',stars:5,
  q:"They rebuilt the onboarding around what users were actually doing, not what we assumed. Completion more than doubled, and the design system means our own team can ship screens without them."},
 {n:'Zara Iqbal',r:'Marketing Head, Noor Living',loc:'Karachi, PK',ini:'ZI',bg:'linear-gradient(135deg,#BBFE11,#4D7C0F)',
  s:'Social Media Handling',m:'18k \u2192 74k',ml:'Followers in six months',d:'9 June 2026',dt:'2026-06-09',stars:5,
  q:"A real content calendar, daily posting and someone actually replying to comments. Our feed stopped going quiet for three weeks at a time, and the monthly reporting is honest about what flopped."},
 {n:'Adnan Yousaf',r:'Owner, Cedar & Co.',loc:'Manchester, UK',ini:'AY',bg:'linear-gradient(135deg,#5B21B6,#8B5CF6)',
  s:'Web Development',m:'1.2s',ml:'Load time, top of page one',d:'23 Feb 2026',dt:'2026-02-23',stars:5,
  q:"The old site took six seconds to load and ranked nowhere. The rebuild loads in just over one, and we sit at the top of page one for our main terms without paying for the position."},
 {n:'Meher Anwar',r:'Brand Manager, Suno Studio',loc:'Islamabad, PK',ini:'MA',bg:'linear-gradient(135deg,#9333EA,#C084FC)',
  s:'Graphic Design',m:'11 / week',ml:'Ad creatives shipped',d:'30 Jan 2026',dt:'2026-01-30',stars:4,
  q:"Identity, packaging and a template kit our own team runs now. The handover was the part I did not expect \u2014 guidelines detailed enough that we are not calling them for every post."}
];
function rvxCard(r,clone){
 var sch=clone?'':' itemprop="review" itemscope itemtype="https://schema.org/Review"';
 return '<article class="rvx-card"'+sch+(clone?' aria-hidden="true"':'')+'>'+
  '<span class="rvx-svc">'+r.s+'</span>'+
  '<div class="rvx-top">'+
   '<span class="rvx-st"'+(clone?'':' itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating"')+
     ' aria-label="'+r.stars+' out of 5 stars">'+
    (clone?'':'<meta itemprop="ratingValue" content="'+r.stars+'" /><meta itemprop="bestRating" content="5" />')+
    ICON.star.repeat(r.stars)+'<span class="off">'+ICON.star.repeat(5-r.stars)+'</span></span>'+
   '<time class="rvx-date"'+(clone?'':' itemprop="datePublished"')+' datetime="'+r.dt+'">'+r.d+'</time>'+
  '</div>'+
  '<span class="rvx-metric"><b>'+r.m+'</b><span>'+r.ml+'</span></span>'+
  '<p class="rvx-q"'+(clone?'':' itemprop="reviewBody"')+'>'+r.q+'</p>'+
  '<div class="rvx-who"'+(clone?'':' itemprop="author" itemscope itemtype="https://schema.org/Person"')+'>'+
   '<span class="rvx-pfp" style="background:'+r.bg+'" aria-hidden="true">'+r.ini+'</span>'+
   '<div><b>'+(clone?r.n:'<span itemprop="name">'+r.n+'</span>')+
     '<span class="rvx-vf">'+ICON.vf+'</span></b><small>'+r.r+' &middot; '+r.loc+'</small></div>'+
  '</div></article>';
}
document.getElementById('rvxTrack').innerHTML=
  REVIEWS.map(function(r){return rvxCard(r,false);}).join('')+
  REVIEWS.map(function(r){return rvxCard(r,true);}).join('');


/* ═════ OFFICES ═════ */
var FLAGS={
 ca:'<svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#fff"/><rect width="15" height="40" fill="#D52B1E"/><rect x="45" width="15" height="40" fill="#D52B1E"/><path d="M30 9l2.6 5.1 5.3-1.4-1.6 5.2 4.2.4-4.6 3.6 1.2 2.4-5.1-.9.4 5.6h-1.6l.4-5.6-5.1.9 1.2-2.4L22 18.3l4.2-.4-1.6-5.2 5.3 1.4z" fill="#D52B1E"/></svg>',
 pk:'<svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#01411C"/><rect width="15" height="40" fill="#fff"/><circle cx="38" cy="20" r="10" fill="#fff"/><circle cx="41.5" cy="17.5" r="9" fill="#01411C"/><path d="m47 12 1 2.8 2.9.2-2.3 1.8.8 2.8-2.4-1.6-2.4 1.6.8-2.8-2.3-1.8 2.9-.2L47 12Z" fill="#fff"/></svg>',
 us:'<svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#fff"/><g fill="#B22234"><rect width="60" height="3.08"/><rect y="6.15" width="60" height="3.08"/><rect y="12.3" width="60" height="3.08"/><rect y="18.46" width="60" height="3.08"/><rect y="24.6" width="60" height="3.08"/><rect y="30.7" width="60" height="3.08"/><rect y="36.9" width="60" height="3.08"/></g><rect width="26" height="21.5" fill="#3C3B6E"/><g fill="#fff"><circle cx="5" cy="5" r="1.5"/><circle cx="13" cy="5" r="1.5"/><circle cx="21" cy="5" r="1.5"/><circle cx="9" cy="11" r="1.5"/><circle cx="17" cy="11" r="1.5"/><circle cx="5" cy="17" r="1.5"/><circle cx="13" cy="17" r="1.5"/><circle cx="21" cy="17" r="1.5"/></g></svg>',
 qa:'<svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#8A1538"/><path d="M0 0h18l6 2.5-6 2.5 6 2.5-6 2.5 6 2.5-6 2.5 6 2.5-6 2.5 6 2.5-6 2.5 6 2.5-6 2.5 6 2.5-6 2.5 6 2.5-6 2.5H0Z" fill="#fff"/></svg>',
 au:'<svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#00247D"/><path d="M0 0l26 18M26 0L0 18" stroke="#fff" stroke-width="3"/><path d="M0 0l26 18M26 0L0 18" stroke="#CF142B" stroke-width="1.4"/><path d="M13 0v18M0 9h26" stroke="#fff" stroke-width="5"/><path d="M13 0v18M0 9h26" stroke="#CF142B" stroke-width="2.4"/><g fill="#fff"><path d="m13 22 1.4 3.6 3.8.2-3 2.4 1 3.7-3.2-2.1-3.2 2.1 1-3.7-3-2.4 3.8-.2L13 22Z"/><circle cx="44" cy="9" r="2.2"/><circle cx="38" cy="20" r="2"/><circle cx="50" cy="20" r="2"/><circle cx="44" cy="30" r="2.2"/><circle cx="46" cy="19" r="1.2"/></g></svg>',
 bh:'<svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#CE1126"/><path d="M0 0h14l8 4-8 4 8 4-8 4 8 4-8 4 8 4-8 4 8 4-8 4H0Z" fill="#fff"/></svg>'
};
var OFFICES=[
 {hq:true,f:'pk',city:'Karachi',country:'Pakistan',tz:'Asia/Karachi',
  addr:'Head office · Shahrah-e-Faisal, Karachi. Strategy, design, engineering and the content studio all sit here.'},
 {f:'us',city:'Austin, Texas',country:'United States',tz:'America/Chicago',
  addr:'North America client team — product strategy, media buying and account management for US ventures.'},
 {f:'ca',city:'Toronto, Ontario',country:'Canada',tz:'America/Toronto',
  addr:'Fashion marketing and creative team, helping Canadian fashion brands build their presence through content, strategy and digital marketing.'},
 {f:'qa',city:'Doha',country:'Qatar',tz:'Asia/Qatar',
  addr:'Gulf operations, bilingual Arabic and English research and content, and regional partnerships across the GCC.'},
 {f:'au',city:'Sydney',country:'Australia',tz:'Australia/Sydney',
  addr:'APAC support and account management, covering Australian and New Zealand business hours.'},
 {f:'bh',city:'Manama',country:'Bahrain',tz:'Asia/Bahrain',
  addr:'Regional sales and onboarding for Bahrain, Saudi Arabia and the wider Gulf market.'}
];
document.getElementById('officeGrid').innerHTML=OFFICES.map(function(o){
 return '<article class="card office rv'+(o.hq?' hq':'')+'"><div class="office-top">'+FLAGS[o.f]+
  '<div><b>'+o.city+'</b><small>'+o.country+'</small></div>'+(o.hq?'<span class="hq-flag">Head office</span>':'')+
  '</div><p>'+o.addr+'</p><div class="office-foot">'+
  '<span class="clock"><span class="dot"></span><span data-tz="'+o.tz+'">--:--</span></span><small>local time</small></div></article>';}).join('');
document.querySelectorAll('#officeGrid .rv').forEach(function(el){io.observe(el);});
function ticks(){document.querySelectorAll('[data-tz]').forEach(function(el){
 try{el.textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:el.dataset.tz}).format(new Date());}
 catch(e){el.textContent='--:--';}});}
ticks();setInterval(ticks,15000);

/* ═════ FAQ ═════ */
var FAQS=[
 {q:'I only have an idea. Is that enough to start?',
  a:"That's exactly where we prefer to start. Stage one is discovery and stage two is validation, so you find out whether the idea holds up before committing to a build. Plenty of clients arrive with a single sentence and a hunch."},
 {q:'How long does a project take?',
  a:"Discovery and validation take two to three weeks. A first product build typically runs eight to sixteen weeks depending on scope. The AI agent goes live in about seven days once we have your catalogue. You get a dated plan before we begin."},
 {q:'Is the AI agent safe for my Instagram account?',
  a:"Yes. Ideonix AI runs on the official Meta Messenger API with a reviewed app — the same infrastructure Meta gives large brands. We never use browser automation or unofficial scrapers, which is what actually gets accounts restricted. You can revoke our access in one click."},
 {q:'What languages does Ideonix AI handle?',
  a:"English, Urdu, Roman Urdu, Arabic and Hindi out of the box, plus most major European languages. It detects what a customer is writing in and replies in the same language, including in voice notes."},
 {q:'Can I hire you for just one service?',
  a:"Yes. Some clients take the full journey from idea to launch, others come to us only for market research, a design system or a product build. Nothing is bundled — we scope only what you need."},
 {q:'Do you work with clients outside Pakistan?',
  a:"Most of our clients are outside Pakistan. We have teams in New York, Doha, Sydney and Manama, so you get someone in or near your timezone. Contracts, invoicing and calls all run in your local hours."},
 {q:'Who owns the work when we finish?',
  a:"You do — code, designs, research, ad accounts, content and the trained agent configuration. Everything is handed over in your own accounts, not ours. There's no hostage situation if you ever want to leave."}
];
var plus='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
var faqList=document.getElementById('faqList');
faqList.innerHTML=FAQS.map(function(f,i){
 return '<div class="faq-item"><button class="faq-q" aria-expanded="false" aria-controls="fa'+i+'"><span>'+f.q+'</span><span class="pm">'+plus+'</span></button>'+
  '<div class="faq-a" id="fa'+i+'"><div><p>'+f.a+'</p></div></div></div>';}).join('');
faqList.querySelectorAll('.faq-q').forEach(function(btn){
 btn.addEventListener('click',function(){
  var body=document.getElementById(btn.getAttribute('aria-controls')),open=!body.classList.contains('open');
  faqList.querySelectorAll('.faq-a').forEach(function(b){b.classList.remove('open');});
  faqList.querySelectorAll('.faq-q').forEach(function(b){b.setAttribute('aria-expanded','false');});
  if(open){body.classList.add('open');btn.setAttribute('aria-expanded','true');}});});

/* ═════ IDEONIX AI — multilingual chat ═════ */
function ideoChatInit(){
var cw=document.getElementById('cw'),launch=document.getElementById('cwLaunch'),
    body=document.getElementById('cwBody'),chips=document.getElementById('cwChips'),
    form=document.getElementById('cwForm'),input=document.getElementById('cwInput'),
    greet=document.getElementById('botGreet');
if(!cw||!launch)return;

/* ── 1 · which language is the visitor writing in ── */
function detect(s){
 if(/[\u0600-\u06FF]/.test(s)){                    /* Arabic script covers both */
  return /(ہ|ے|ں|ٹ|ڈ|ڑ|کیا|ہیں|آپ|کریں)/.test(s) ? 'ur' : 'ar';
 }
 if(/\b(merhaba|selam|nasil|nasıl|fiyat|ne kadar|hizmet|siteniz|tesekkur|teşekkür|yapar|misiniz|mısınız)\b/i.test(s)) return 'tr';
 if(/\b(kya|kaise|kitna|kitne|hai|hain|chahiye|banwana|karna|bhai|salam|assalam|shukriya|acha|theek|batao|dain|den)\b/i.test(s)) return 'rom';
 return 'en';
}

/* ── 2 · what are they asking about ── */
var INTENTS=[
 {id:'about',    kw:['what is ideonix','about ideonix','who are you','tell me about','what do you do as a company','your company','aap kaun','ideonix co kya','کمپنی','آپ کون','من أنتم','الشركة','şirket','kimsiniz']},
 {id:'software',  kw:['custom software','software development','bespoke software','internal tool','internal tools','erp','crm system','custom product']},
 {id:'flutter',   kw:['flutter']},
 {id:'react',     kw:['react native','reactjs','react js','react']},
 {id:'whatsapp',  kw:['whatsapp integration','whatsapp api','whatsapp business','whatsapp solution','whatsapp par','integrate whatsapp','whatsapp into','whatsapp for my business','whatsapp setup','whatsapp automation','واتساب','واٹس ایپ']},
 {id:'uiux',      kw:['ui/ux','ui ux','ux design','user experience','wireframe','wireframes','prototype','prototypes','figma','design my app','design my website','design before','before development','design first','user flow','user flows','mockup']},
 {id:'idea',      kw:['i have an idea','i have a idea','my idea','app idea','business idea','startup idea','idea but','idea hai','soch raha','آئیڈیا','خیال','فكرة','لدي فكرة','fikir','fikrim']},
 {id:'mvp',       kw:['mvp','minimum viable','minimum viable product','build an mvp','build a mvp','mvp for my startup','mvp for a startup']},
 {id:'startup',   kw:['startup','start-up','start up','entrepreneur','founder']},
 {id:'apis',      kw:['api integration','third party api','third-party api','integrate api','payment gateway','integrations']},
 {id:'process',   kw:['development process','how do you develop','your process','methodology','work process','how you work','step by step','طریقہ کار','مراحل','عملية','süreç']},
 {id:'docs',      kw:['documentation','documents','scope of work','technical document','user manual']},
 {id:'updates',   kw:['progress update','project update','updates during','milestone','track progress','progress dekh']},
 {id:'revisions', kw:['revision','revisions','request changes','change request','modify later','changes during']},
 {id:'support',   kw:['maintenance','after launch','post launch','post-launch','after the project','bug fix','ongoing support','مینٹیننس','سپورٹ','صيانة','الدعم','bakım','destek']},
 {id:'start',     kw:['start a project','how to start','how do i start','begin a project','get started','project shuru','kaise shuru','شروع','کیسے شروع','ابدأ','كيف أبدأ','başla','nasıl başlarım']},
 {id:'everything', kw:['can you do everything','complete project','end to end','end-to-end','handle everything','full project','sab kuch']},
 {id:'offtopic',  kw:['weather','joke','president','prime minister','cricket','football','song','recipe','mausam']},
 {id:'media',     kw:['photo','photos','picture','image','voice note','voice notes','voice message','audio','screenshot','send a photo','blurry photo','تصویر','وائس نوٹ','صورة','رسالة صوتية','fotoğraf','sesli']},
 {id:'greet',   kw:['hi','hello','hey','good morning','good evening','salam','assalam','aoa','merhaba','selam','مرحبا','السلام','سلام','ہیلو']},
 {id:'chatbot', kw:['chatbot','chat bot','bot','whatsapp','dm','instagram','messenger','automation','agent','روبوت','واتساب','بوت','چیٹ','واٹس','sohbet','otomasyon']},
 {id:'services',kw:['service','services','offer','do you do','what do you','provide','خدمات','تقدمون','خدمت','سروس','hizmet','hizmetler','kaam','kam karte']},
 {id:'price',   kw:['price','cost','budget','charge','fee','how much','rate','quote','سعر','التكلفة','كم','قیمت','کتنے','قیمتیں','fiyat','ücret','ne kadar','kitna','kitne','paise']},
 {id:'ecom',    kw:['cash on delivery','cash-on-delivery','online store','online stores','e-commerce','ecommerce','shopify store','cod order','cod orders','fake order','fake orders','checkout','abandoned cart','دفع عند الاستلام','متجر إلكتروني','آن لائن اسٹور','کیش آن ڈیلیوری','kapıda ödeme','online magaza','online mağaza']},
 {id:'time',    kw:['how long','timeline','duration','deliver','deadline','weeks','days','مدة','كم يستغرق','وقت','kitne din','kitna time','süre','ne zaman','zaman']},
 {id:'web',     kw:['website','web','shopify','wordpress','ecommerce','store','موقع','متجر','ویب سائٹ','ویب','site','web sitesi','magaza','mağaza']},
 {id:'app',     kw:['app','mobile app','ios','android','application','تطبيق','ایپ','uygulama','mobil']},
 {id:'design',  kw:['design','logo','branding','ui','ux','graphic','graphic design','graphic designing','graphic designer','graphic design service','graphic designing services','logo design','brand identity','social media design','marketing creative','تصميم','التصميم الجرافيكي','شعار','ڈیزائن','گرافک ڈیزائن','لوگو','tasarim','tasarım','grafik tasarım']},
 {id:'ads',     kw:['ads','advertis','marketing','meta','facebook','tiktok','campaign','اعلان','إعلانات','تسويق','اشتہار','مارکیٹنگ','reklam','pazarlama']},
 {id:'offices', kw:['office','location','where are you','based','address','country','مكتب','أين','دفتر','کہاں','ofis','nerede','karachi','dubai','doha','qatar','saudi','riyadh']},
 {id:'contact', kw:['contact','call','meeting','book','talk','email','number','اتصال','تواصل','رابطہ','بات','iletisim','iletişim','ara','baat']},
 {id:'thanks',  kw:['thanks','thank you','shukriya','shukran','شكرا','شکریہ','tesekkur','teşekkür','mehrbani']}
];
function intentOf(s){
 var t=' '+s.toLowerCase()+' ',best=null;
 INTENTS.forEach(function(it){
  it.kw.forEach(function(k){
   if(t.indexOf(k)>-1 && (!best || k.length>best.len)) best={id:it.id,len:k.length};
  });
 });
 return best?best.id:'fallback';
}

/* ── 3 · the answers · several phrasings each so it never repeats ── */
var R={
 media:{
  en:["Yes \u2014 it reads photos and hears voice notes. Customers send a blurry product photo or a rambling voice note in Roman Urdu, and it understands both and answers properly.",
      "Photos and voice notes are handled the same as text. Someone can snap the product they want or record a voice note in Roman Urdu, and the agent replies with the right stock, price and timing."],
  rom:["Ji haan \u2014 photo bhi parhta hai aur voice note bhi sunta hai. Customer dhundhli si product photo ya Roman Urdu mein lambi voice note bheje, dono samajh kar sahi jawab deta hai."],
  ur:["\u062c\u06cc \u06c1\u0627\u06ba \u2014 \u06cc\u06c1 \u062a\u0635\u0648\u06cc\u0631 \u0628\u06be\u06cc \u067e\u0691\u06be\u062a\u0627 \u06c1\u06d2 \u0627\u0648\u0631 \u0648\u0627\u0626\u0633 \u0646\u0648\u0679 \u0628\u06be\u06cc \u0633\u0646\u062a\u0627 \u06c1\u06d2\u060c \u0627\u0648\u0631 \u062f\u0648\u0646\u0648\u06ba \u06a9\u0627 \u0635\u062d\u06cc\u062d \u062c\u0648\u0627\u0628 \u062f\u06cc\u062a\u0627 \u06c1\u06d2\u06d4"]},

 about:{
  en:["Ideonix Co. is a product-based software and digital solutions company. We design, develop and deliver websites, mobile applications, custom software products, AI chatbots, WhatsApp solutions and digital marketing services.\n\nOur goal is to help businesses turn their ideas into reliable, scalable digital products."],
  rom:["Ideonix Co. ek product-based software company hai. Websites, mobile apps, custom software, AI chatbots, WhatsApp solutions aur digital marketing — idea se le kar launch tak sab ek hi team karti hai."],
  ur:["Ideonix Co. ایک پروڈکٹ بیسڈ سافٹ ویئر کمپنی ہے۔ ویب سائٹس، موبائل ایپس، کسٹم سافٹ ویئر، AI چیٹ بوٹس، واٹس ایپ سلوشنز اور ڈیجیٹل مارکیٹنگ — آئیڈیا سے لانچ تک۔"]},

 software:{
  en:["Yes. We specialise in custom software and product development.\n\nShare your business idea, requirements or workflow with us and our team can help plan and develop a solution specifically for your business."],
  rom:["Ji haan — custom software aur product development hamara core kaam hai. Apna workflow batayein, hum usko plan mein badal dete hain."],
  ur:["جی ہاں — کسٹم سافٹ ویئر اور پروڈکٹ ڈویلپمنٹ ہمارا بنیادی کام ہے۔ اپنا ورک فلو بتائیں، ہم اسے ایک پلان میں ڈھال دیں گے۔"]},

 flutter:{
  en:["Yes. Flutter is one of the technologies we work with for cross-platform mobile application development.\n\nIt lets us build for Android and iOS from a shared codebase, depending on the project requirements."]},

 react:{
  en:["Yes. We work with React and related technologies for modern web and application development.\n\nThe stack is selected based on your project's functionality, scalability, performance and business requirements."]},

 whatsapp:{
  en:["Yes. We can develop and integrate WhatsApp-based solutions according to your business requirements.\n\nPossible solutions include customer communication, automated responses, lead collection, notifications and business workflow automation.\n\nThe exact solution depends on your required WhatsApp setup and API requirements."],
  rom:["Ji haan. Official WhatsApp Business API par solutions banate hain — automated replies, lead capture, order aur COD verification, aur zaroorat par insaan ko handover."],
  ur:["جی ہاں۔ آفیشل واٹس ایپ بزنس API پر سلوشنز بناتے ہیں — خودکار جوابات، لیڈ کیپچر، آرڈر اور COD تصدیق، اور ضرورت پر ٹیم کو منتقلی۔"]},

 uiux:{
  en:["Yes. We can create UI/UX designs before development, so you can review the visual experience and user flow before the development phase begins."]},

 idea:{
  en:["Absolutely! You don't need to have everything technically figured out.\n\nSimply tell us:\n\u2022 Your idea\n\u2022 What problem it solves\n\u2022 Who will use it\n\u2022 Main features you have in mind\n\nOur team can help convert your idea into a structured product plan and development roadmap."],
  rom:["Aapko technically sab pata hona zaroori nahi. Idea, problem, users aur main features batayein — hum usko product plan aur roadmap bana dete hain."],
  ur:["آپ کو تکنیکی تفصیل معلوم ہونا ضروری نہیں۔ آئیڈیا، مسئلہ، صارفین اور اہم فیچرز بتائیں — ہم اسے پروڈکٹ پلان اور روڈ میپ بنا دیں گے۔"]},

 mvp:{
  en:["Yes. Ideonix Co. can help startups turn an idea into a Minimum Viable Product (MVP).\n\nWe help define the core features, design the product, develop the MVP, integrate the required services, test it and prepare it for launch."]},

 startup:{
  en:["Yes. We work with startups, businesses, entrepreneurs and individuals looking to build digital products.\n\nWhether you have a complete specification or just an initial idea, you can discuss it with our team."]},

 apis:{
  en:["Yes. We can integrate third-party APIs and services according to your project requirements.\n\nExamples include payment gateways, maps, authentication, communication platforms, CRM systems, AI services and other business APIs."]},

 process:{
  en:["Our typical process is:\n1. Requirement discussion\n2. Project analysis\n3. Scope & documentation\n4. UI/UX design\n5. Development\n6. API & third-party integrations\n7. Testing & quality assurance\n8. Client review\n9. Deployment\n10. Post-launch support\n\nThe process can be customised according to the project."],
  rom:["Process saat stages mein chalta hai: discovery, strategy, UX/UI design, development, QA, product identity, phir launch aur growth."],
  ur:["ہمارا عمل سات مراحل میں چلتا ہے: ڈسکوری، حکمت عملی، UX/UI ڈیزائن، ڈویلپمنٹ، کوالٹی اشورنس، پروڈکٹ آئیڈینٹیٹی، پھر لانچ اور گروتھ۔"]},

 docs:{
  en:["Yes. Depending on the project, documentation can include:\n\n\u2022 Project requirements\n\u2022 Scope of work\n\u2022 Feature documentation\n\u2022 UI/UX specifications\n\u2022 Technical documentation\n\u2022 API documentation\n\u2022 Database and architecture documentation\n\u2022 Development milestones\n\u2022 Testing documentation\n\u2022 Deployment documentation\n\u2022 User and admin documentation\n\nThe exact documentation provided depends on the project scope."]},

 updates:{
  en:["Yes. Project progress can be shared through agreed milestones and regular updates.\n\nThe exact communication and review process is defined during project planning."]},

 revisions:{
  en:["Yes. Changes and revisions can be handled according to the agreed project scope.\n\nAny major feature additions or requirements outside the original scope may need a separate discussion and estimation."]},

 support:{
  en:["Yes. Post-launch support and maintenance can be provided depending on the project and the support arrangement you select.\n\nThis can include bug fixes, updates, technical assistance and other agreed maintenance services."],
  ur:["جی ہاں۔ لانچ کے بعد سپورٹ اور مینٹیننس دستیاب ہے — بگ فکس، اپڈیٹس اور تکنیکی مدد۔"]},

 start:{
  en:["Great! \ud83d\ude80\n\nPlease share:\n1. Your project idea\n2. Required platform \u2014 Website / Android / iOS / Web App\n3. Main features\n4. Any reference website or app\n5. Your expected timeline\n6. Any existing designs or documentation\n\nOur team can review the requirements and guide you through the next steps."],
  rom:["Shuru karne ke liye batayein: idea, platform (website / Android / iOS / web app), main features, koi reference product, expected timeline aur jo designs ya documents pehle se hain. Team review kar ke next steps bhejegi."],
  ur:["شروع کرنے کے لیے بتائیں: آئیڈیا، پلیٹ فارم (ویب سائٹ / اینڈرائیڈ / iOS)، اہم فیچرز، کوئی ریفرنس، متوقع ٹائم لائن اور موجودہ ڈیزائن یا دستاویزات۔"]},

 everything:{
  en:["Yes. Ideonix Co. can provide end-to-end digital product development, from idea and UI/UX design through to development, integrations, testing, deployment and post-launch support.\n\nWe also provide complementary services such as graphic design, branding, AI chatbot development, WhatsApp solutions and digital marketing."]},

 offtopic:{
  en:["I'm Ideo, the virtual assistant for Ideonix Co. \ud83d\ude0a\n\nI'm primarily here to help with Ideonix Co.'s services, projects, development solutions and business inquiries.\n\nHow can I help you with your website, app, software, AI chatbot, WhatsApp solution or digital product?"],
  rom:["Main Ideo hoon, Ideonix Co. ka assistant. Website, app, software, chatbot ya marketing ke baare mein poochein — us mein zyada kaam aaunga."]},

 greet:{
  en:["Hello! \ud83d\udc4b Welcome to Ideonix Co.\n\nI'm Ideo, the virtual assistant of Ideonix Co. We're a product-based software development company providing complete digital solutions for businesses, startups and individuals.\n\nWe specialise in:\n\u2022 Website Development\n\u2022 Mobile App Development\n\u2022 Flutter Development\n\u2022 React / React Native Development\n\u2022 AI Chatbots & Automation\n\u2022 WhatsApp Integration & Solutions\n\u2022 UI/UX Design\n\u2022 Graphic Design\n\u2022 Digital Marketing\n\u2022 Custom Software & Product Development\n\nHow can I help you today?",
      "Hi! I'm Ideo, the virtual assistant of Ideonix Co. \ud83d\udc4b\n\nWe build websites, mobile apps, custom software, AI chatbots, WhatsApp solutions and digital marketing.\n\nWhat would you like to build?"],
  rom:["Assalam-o-alaikum! Main Ideonix AI hoon. Services, timeline ya pricing — kya jaanna chahenge?",
       "Salam! Ideonix ke baare mein kuch bhi poochein — chatbot, website, app ya ads."],
  ur:["السلام علیکم! میں Ideonix AI ہوں۔ سروسز، ٹائم لائن یا قیمت — آپ کیا جاننا چاہیں گے؟",
      "خوش آمدید۔ Ideonix کے بارے میں کچھ بھی پوچھیں — چیٹ بوٹ، ویب سائٹ، ایپ یا اشتہارات۔"],
  ar:["أهلاً بك! أنا Ideonix AI. يمكنني شرح خدماتنا أو المدة الزمنية أو الأسعار — بماذا أبدأ؟",
      "مرحباً! اسألني أي شيء عن Ideonix — روبوتات المحادثة، المواقع، التطبيقات أو الإعلانات."],
  tr:["Merhaba! Ben Ideonix AI. Hizmetlerimiz, süreler veya fiyatlar hakkında yardımcı olabilirim.",
      "Hoş geldiniz! Ideonix hakkında her şeyi sorabilirsiniz — chatbot, web sitesi, uygulama veya reklam."]},

 ecom:{
  en:["Yes — storefronts with card payments and cash on delivery, built on Shopify or WooCommerce. Every COD order is verified by phone before it reaches the courier, which is what stops the fake ones.",
      "We build online stores that handle COD properly: automatic phone verification before dispatch, courier booking and tracking wired into the order flow, and reporting that shows margin rather than just revenue.",
      "Cash on delivery is where most stores here lose money. We verify each order automatically within minutes, so genuine buyers confirm and go straight to the courier while the fake ones never ship. Typically 4–8 weeks to build."],
  rom:["Ji haan — Shopify ya WooCommerce par store, card payment aur COD dono ke saath. Har COD order dispatch se pehle phone par verify hota hai, is liye fake orders ruk jate hain.",
       "COD wala nuqsan hum verification se rokte hain: order minute mein confirm hota hai, courier booking aur tracking bhi order flow mein shamil hai. Build 4–8 hafte."],
  ur:["جی ہاں — کارڈ پیمنٹ اور کیش آن ڈیلیوری دونوں کے ساتھ آن لائن اسٹور۔ ہر COD آرڈر کوریئر تک جانے سے پہلے فون پر تصدیق ہوتا ہے، اسی لیے جعلی آرڈر رک جاتے ہیں۔",
      "ہم اسٹور ایسے بناتے ہیں جو COD صحیح طرح سنبھالیں: خودکار تصدیق، کوریئر بکنگ اور ٹریکنگ۔ عام طور پر 4 سے 8 ہفتے۔"],
  ar:["نعم — متاجر إلكترونية بالدفع بالبطاقة والدفع عند الاستلام. يتم التحقق من كل طلب دفع عند الاستلام هاتفياً قبل الشحن، وهو ما يوقف الطلبات الوهمية.",
      "نبني متاجر تتعامل مع الدفع عند الاستلام بشكل صحيح: تحقق تلقائي قبل الإرسال، حجز شركة الشحن والتتبع ضمن مسار الطلب. عادة من 4 إلى 8 أسابيع."],
  tr:["Evet — kart ödemesi ve kapıda ödeme ile çalışan mağazalar kuruyoruz. Her kapıda ödeme siparişi kargoya verilmeden önce telefonla doğrulanır, sahte siparişler böylece durur.",
      "Mağazayı kapıda ödemeyi doğru yönetecek şekilde kuruyoruz: otomatik doğrulama, kargo kaydı ve takip sipariş akışının içinde. Genelde 4–8 hafta."]},

 chatbot:{
  en:["Absolutely. Ideonix Co. can develop customised AI chatbots for websites, applications and business workflows.\n\nA chatbot can be designed to:\n\u2022 Answer customer questions\n\u2022 Provide product and service information\n\u2022 Collect leads\n\u2022 Handle FAQs\n\u2022 Assist customers\n\u2022 Connect with business systems\n\u2022 Automate repetitive communication\n\u2022 Integrate with websites, apps or messaging platforms\n\nWe customise it around your business requirements."],
  rom:["Hum official API par AI chat agents banate hain — Instagram DM, WhatsApp Business chatbot aur website live chat. Aapke catalogue par train hota hai aur 4 second mein jawab deta hai.",
       "Chatbot DMs, comments aur voice notes handle karta hai, phir order seedha Shopify mein daal deta hai. Setup taqreeban 7 din leta hai."],
  ur:["ہم آفیشل API پر AI چیٹ ایجنٹ بناتے ہیں — انسٹاگرام ڈی ایم، واٹس ایپ بزنس چیٹ بوٹ اور ویب سائٹ لائیو چیٹ۔ یہ آپ کے کیٹلاگ پر ٹرین ہوتا ہے اور چار سیکنڈ میں جواب دیتا ہے۔",
      "چیٹ بوٹ پیغامات، کمنٹس اور وائس نوٹس سنبھالتا ہے اور آرڈر براہِ راست آپ کے اسٹور میں بنا دیتا ہے۔ سیٹ اپ تقریباً سات دن میں مکمل ہوتا ہے۔"],
  ar:["نبني وكلاء محادثة بالذكاء الاصطناعي عبر واجهات API الرسمية: إنستغرام، واتساب بيزنس، ماسنجر والدردشة المباشرة على الموقع. يتم تدريبه على كتالوجك ويرد خلال أربع ثوانٍ تقريباً.",
      "يتعامل الروبوت مع الرسائل والتعليقات والملاحظات الصوتية، ثم ينشئ الطلب مباشرة في متجرك. مدة الإعداد سبعة أيام تقريباً."],
  tr:["Resmî API'ler üzerinde yapay zekâ sohbet ajanları geliştiriyoruz: Instagram DM, WhatsApp Business, Messenger ve web sitesi canlı sohbeti. Kataloğunuzla eğitilir ve yaklaşık dört saniyede yanıt verir.",
      "Bot mesajları, yorumları ve sesli notları yönetir, ardından siparişi doğrudan mağazanıza yazar. Kurulum yaklaşık yedi gün sürer."]},

 services:{
  en:["We provide complete end-to-end digital services, including:\n1. Website Development\n2. E-commerce Development\n3. Mobile App Development\n4. Flutter Development\n5. React & React Native Development\n6. Custom Software Development\n7. AI Chatbots\n8. Website & App Chatbot Integration\n9. WhatsApp API & WhatsApp Integration\n10. Business Automation\n11. UI/UX Design\n12. Graphic Design\n13. Digital Marketing\n14. Custom Product Development\n\nIf you tell me what you're looking to build, I can guide you toward the most suitable solution."],
  rom:["Ideonix das services deta hai: custom software, product development, web development, mobile apps, UI/UX design, e-commerce stores, AI automation, SaaS platforms, API integration aur digital marketing.",
       "Idea validation se le kar design, development aur launch tak — aap ek service le sakte hain ya poora safar."],
  ur:["Ideonix دس سروسز فراہم کرتا ہے: کسٹم سافٹ ویئر، پروڈکٹ ڈویلپمنٹ، ویب ڈویلپمنٹ، موبائل ایپس، UI/UX ڈیزائن، ای کامرس اسٹورز، AI آٹومیشن، SaaS پلیٹ فارمز، API انٹیگریشن اور ڈیجیٹل مارکیٹنگ۔",
      "ہم آئیڈیا کی جانچ سے لے کر ڈیزائن، ڈویلپمنٹ اور لانچ تک سب کچھ سنبھالتے ہیں۔ آپ ایک سروس بھی لے سکتے ہیں۔"],
  ar:["تقدم Ideonix عشر خدمات: البرمجيات المخصصة، تطوير المنتجات، تطوير المواقع، تطبيقات الجوال، تصميم UI/UX، المتاجر الإلكترونية، أتمتة الذكاء الاصطناعي، منصات SaaS، تكامل الأنظمة والتسويق الرقمي.",
      "نأخذ الفكرة من التحقق والاستراتيجية إلى التصميم والتطوير والإطلاق. يمكنك اختيار خدمة واحدة أو الرحلة كاملة."],
  tr:["Ideonix yedi hizmet sunar: web geliştirme, grafik tasarım, uygulama geliştirme, sosyal medya yönetimi, Meta & TikTok reklamları, yapay zekâ otomasyonu ve içerik üretimi.",
      "Fikri doğrulamadan stratejiye, tasarımdan geliştirmeye ve lansmana kadar götürüyoruz. Tek bir hizmet de alabilirsiniz."]},

 price:{
  en:["Project pricing depends on the scope, features, design requirements, technology, integrations and complexity.\n\nTo give you an accurate estimate, please share your requirements. Our team can then prepare a suitable proposal for your project."],
  rom:["Price scope par depend karti hai, is liye hum free audit ke baad written quote dete hain — andaaza nahi lagate.",
       "Fixed packages nahi hain. Free discovery call book karein, aap ko likhit figure mil jayega."],
  ur:["قیمت کا انحصار کام کے دائرہ کار پر ہوتا ہے، اس لیے ہم مفت آڈٹ کے بعد تحریری تخمینہ دیتے ہیں۔",
      "ہمارے پاس مقررہ پیکجز نہیں ہیں۔ مفت ڈسکوری کال بک کریں، آپ کو تحریری قیمت مل جائے گی۔"],
  ar:["يعتمد السعر على نطاق العمل، لذلك نقدم عرضاً بعد التدقيق المجاني بدلاً من التخمين. ستحصل دائماً على رقم مكتوب قبل الالتزام.",
      "لا ننشر باقات ثابتة — إعداد روبوت محادثة يختلف كثيراً عن بناء منتج كامل. احجز مكالمة مجانية وستصلك التكلفة كتابةً."],
  tr:["Fiyat kapsama göre değişir; bu yüzden tahmin yerine ücretsiz analiz sonrası teklif veriyoruz. Taahhütten önce her zaman yazılı bir rakam alırsınız.",
      "Sabit paketler yayınlamıyoruz. Ücretsiz keşif görüşmesi ayırtın, fiyatı yazılı olarak alın."]},

 time:{
  en:["The development timeline depends on the project's scope, features, technology, integrations and complexity.\n\nOnce we understand your requirements, Ideonix Co. can provide an estimated timeline along with the project scope."],
  rom:["Chatbot 7 din mein live ho jata hai. Website 3–4 hafte, app 6–12 hafte scope ke hisaab se. Shuru karne se pehle dated plan milta hai.",
       "Discovery 2–3 hafte, phir product build 8–16 hafte. Schedule tay hone ke baad hi kaam shuru hota hai."],
  ur:["چیٹ بوٹ تقریباً سات دن میں فعال ہو جاتا ہے۔ ویب سائٹ تین سے چار ہفتے اور ایپ چھ سے بارہ ہفتے لیتی ہے۔",
      "ڈسکوری دو سے تین ہفتے، پھر پروڈکٹ بلڈ آٹھ سے سولہ ہفتے۔ کام شروع کرنے سے پہلے مکمل شیڈول دیا جاتا ہے۔"],
  ar:["يبدأ تشغيل روبوت المحادثة خلال سبعة أيام تقريباً. المواقع من ثلاثة إلى أربعة أسابيع، والتطبيقات من ستة إلى اثني عشر أسبوعاً.",
      "التحقق والاكتشاف من أسبوعين إلى ثلاثة، ثم بناء المنتج من ثمانية إلى ستة عشر أسبوعاً، وفق جدول متفق عليه."],
  tr:["Chatbot yaklaşık yedi günde yayına girer. Web siteleri üç–dört hafta, uygulamalar kapsama göre altı–on iki hafta sürer.",
      "Keşif iki–üç hafta, ardından ürün geliştirme sekiz–on altı hafta. Başlamadan önce tarihli bir plan alırsınız."]},

 web:{
  en:["Yes. Ideonix Co. develops modern, responsive and business-focused websites.\n\nWe can build:\n\u2022 Business websites\n\u2022 Corporate websites\n\u2022 E-commerce websites\n\u2022 Landing pages\n\u2022 Custom web applications\n\u2022 Admin dashboards\n\u2022 SaaS platforms\n\u2022 API-integrated websites\n\nThe technology stack depends on your project requirements."],
  rom:["Hum Shopify, WordPress ya Next.js par custom websites banate hain — tez load hoti hain, SEO ready aur conversion ke liye design ki gayi.",
       "Website taqreeban 3–4 hafte leti hai. Code aur accounts handover par aapke hote hain."],
  ur:["ہم Shopify، WordPress یا Next.js پر ویب سائٹس بناتے ہیں — تیز، SEO کے لیے تیار اور فروخت بڑھانے کے لیے ڈیزائن شدہ۔",
      "ویب سائٹ عموماً تین سے چار ہفتوں میں مکمل ہوتی ہے اور کوڈ آپ کی ملکیت ہوتا ہے۔"],
  ar:["نبني متاجر ومواقع أعمال على Shopify أو WordPress أو Next.js — سريعة التحميل، جاهزة لتحسين محركات البحث ومصممة للتحويل.",
      "تستغرق المواقع من ثلاثة إلى أربعة أسابيع، وتملك الكود والحسابات عند التسليم."],
  tr:["Shopify, WordPress veya Next.js üzerinde hızlı, SEO uyumlu ve dönüşüm odaklı siteler geliştiriyoruz.",
      "Web siteleri genellikle üç–dört hafta sürer; teslimde kod ve hesaplar size aittir."]},

 app:{
  en:["Yes. We develop modern mobile applications for both Android and iOS.\n\nWe can build using technologies such as Flutter or React Native, depending on the project's requirements.\n\nWe handle the complete process \u2014 UI/UX, development, API integration, testing, deployment and post-development support."],
  rom:["Hum native iOS aur Android, ya dono ke liye ek React Native codebase banate hain. Store submission aur maintenance bhi hum dekhte hain.",
       "App 6–12 hafte leti hai scope ke hisaab se, aur har hafte staging par progress dikhti hai."],
  ur:["ہم نیٹو iOS اور اینڈرائیڈ، یا دونوں کے لیے ایک ری ایکٹ نیٹو کوڈ بیس بناتے ہیں، اسٹور سبمیشن اور مینٹیننس سمیت۔",
      "ایپ عام طور پر چھ سے بارہ ہفتے لیتی ہے اور ہر ہفتے پیش رفت نظر آتی ہے۔"],
  ar:["نطوّر تطبيقات أصلية لنظامي iOS وAndroid، أو قاعدة كود واحدة بـ React Native للاثنين، مع النشر في المتاجر والصيانة.",
      "تستغرق التطبيقات عادة من ستة إلى اثني عشر أسبوعاً مع متابعة أسبوعية للتقدم."],
  tr:["Yerel iOS ve Android ya da ikisi için tek bir React Native kod tabanı geliştiriyoruz; mağaza yayını ve bakım dahil.",
      "Uygulamalar kapsama göre altı–on iki hafta sürer, ilerlemeyi her hafta görürsünüz."]},

 design:{
  en:["Yes. Ideonix Co. also provides graphic design services.\n\nWe can help with:\n\u2022 Brand identity\n\u2022 Logos\n\u2022 Social media designs\n\u2022 Marketing creatives\n\u2022 Banners\n\u2022 Product graphics\n\u2022 UI graphics\n\u2022 Promotional materials"],
  rom:["Brand identity, packaging, ad creative aur social templates — aisa system jo aapki team aage bhi use kar sake.",
       "Design mein user journeys, wireframes aur clickable prototype shamil hain, build se pehle."],
  ur:["برانڈ آئیڈینٹی، پیکجنگ، اشتہاری کریئیٹو اور سوشل ٹیمپلیٹس — ایک ایسا سسٹم جو آپ کی ٹیم آگے بھی استعمال کر سکے۔",
      "ڈیزائن میں یوزر جرنی، وائرفریم اور کلک ایبل پروٹوٹائپ شامل ہیں۔"],
  ar:["هوية العلامة التجارية، التغليف، التصاميم الإعلانية وقوالب التواصل — كنظام متكامل يستمر فريقك في استخدامه.",
      "يشمل التصميم رحلات المستخدم والمخططات الأولية ونموذجاً تفاعلياً قبل البناء."],
  tr:["Marka kimliği, ambalaj, reklam görselleri ve sosyal medya şablonları — ekibinizin kullanmaya devam edebileceği bir sistem olarak.",
      "Tasarım; kullanıcı akışları, tel çerçeveler ve tıklanabilir prototip içerir."]},

 ads:{
  en:["Yes. We provide digital marketing solutions designed around your business goals.\n\nDepending on your requirements that can include social media marketing, creative content, advertising support, branding and other digital marketing activities."],
  rom:["Hum Meta aur TikTok campaigns end to end chalate hain — creative, copy, media buying aur scaling, har hafte review ke saath.",
       "Har campaign wahan point karti hai jahan AI agent conversion kar sake, is liye ad spend zaya nahi hota."],
  ur:["ہم میٹا اور ٹک ٹاک مہمات مکمل طور پر چلاتے ہیں — کریئیٹو، کاپی، میڈیا بائنگ اور اسکیلنگ، ہفتہ وار جائزے کے ساتھ۔",
      "ہر مہم وہاں لے جاتی ہے جہاں AI ایجنٹ سیل مکمل کر سکے، اس لیے اشتہاری خرچ ضائع نہیں ہوتا۔"],
  ar:["ندير حملات Meta وTikTok بالكامل: التصاميم، النصوص، شراء الإعلانات وتوسيع الجمهور، مع مراجعة أسبوعية.",
      "كل حملة توجّه العميل إلى مكان يستطيع فيه الوكيل الذكي إتمام البيع، فلا تضيع ميزانية الإعلانات."],
  tr:["Meta ve TikTok kampanyalarını uçtan uca yönetiyoruz: kreatif, metin, medya satın alma ve ölçekleme; haftalık incelemelerle.",
      "Her kampanya, yapay zekâ ajanının satışa dönüştürebileceği bir noktaya yönlendirir."]},

 offices:{
  en:["Our head office is in Karachi, Pakistan, with teams in New York, Doha, Sydney and Manama — so someone is usually working in your timezone.",
      "Karachi is home base. We also cover North America from New York, the Gulf from Doha and Manama, and APAC from Sydney."],
  rom:["Head office Karachi, Pakistan mein hai, aur teams New York, Doha, Sydney aur Manama mein hain — koi na koi aapke timezone mein hota hai.",
       "Karachi base hai. Gulf ke liye Doha aur Manama, APAC ke liye Sydney aur North America ke liye New York."],
  ur:["ہمارا مرکزی دفتر کراچی، پاکستان میں ہے، جبکہ ٹیمیں نیویارک، دوحہ، سڈنی اور منامہ میں موجود ہیں۔",
      "کراچی ہمارا مرکز ہے۔ خلیج کے لیے دوحہ اور منامہ، ایشیا پیسیفک کے لیے سڈنی اور شمالی امریکہ کے لیے نیویارک۔"],
  ar:["مقرنا الرئيسي في كراتشي، باكستان، ولدينا فرق في نيويورك والدوحة وسيدني والمنامة — لذا يوجد دائماً من يعمل في توقيتك.",
      "كراتشي هي المقر الأساسي، ونغطي الخليج من الدوحة والمنامة، وآسيا والمحيط الهادئ من سيدني."],
  tr:["Merkez ofisimiz Karaçi, Pakistan'da; New York, Doha, Sidney ve Manama'da ekiplerimiz var — genellikle sizin saat diliminizde biri çalışıyor.",
      "Karaçi ana merkezimiz. Körfez'i Doha ve Manama'dan, Asya-Pasifik'i Sidney'den yönetiyoruz."]},

 contact:{
  en:["You can reach the Ideonix Co. team directly:\n\n\u2022 Email \u2014 talhushaikhu@gmail.com\n\u2022 WhatsApp / phone \u2014 +92 336 0187339\n\u2022 Or use the form on this page to book a free discovery call\n\nIf your project needs a detailed discussion, we can arrange a meeting with the team \u2014 just share a suitable time."],
  rom:["Sab se tez tareeqa is page ka booking form hai — 30 minute strategist ke saath, aur plan aap ka.",
       "Neeche form bhar dein, hum call se pehle aapki site, ad account aur DMs ka audit kar lete hain."],
  ur:["سب سے تیز طریقہ اس صفحے پر موجود بکنگ فارم ہے — تیس منٹ ماہر کے ساتھ، اور منصوبہ آپ کا۔",
      "نیچے فارم بھر دیں، ہم کال سے پہلے آپ کی سائٹ، ایڈ اکاؤنٹ اور پیغامات کا جائزہ لے لیں گے۔"],
  ar:["أسرع طريقة هي نموذج الحجز في هذه الصفحة — ثلاثون دقيقة مع مختص، وتخرج بخطة سواء تعاقدت معنا أم لا.",
      "املأ النموذج أدناه وسنراجع موقعك وحسابك الإعلاني ورسائلك قبل المكالمة."],
  tr:["En hızlı yol bu sayfadaki randevu formu — bir uzmanla otuz dakika, bizi seçseniz de seçmeseniz de bir planla ayrılırsınız.",
      "Aşağıdaki formu doldurun; görüşmeden önce sitenizi, reklam hesabınızı ve mesajlarınızı inceleyelim."]},

 thanks:{
  en:["Happy to help. Anything else you'd like to know before booking a call?",
      "My pleasure — ask away if anything else comes to mind."],
  rom:["Khushi hui madad kar ke. Aur kuch poochna chahenge?","Zaroor! Koi aur sawal ho to bataiye."],
  ur:["مدد کر کے خوشی ہوئی۔ کیا کچھ اور پوچھنا چاہیں گے؟","ضرور! کوئی اور سوال ہو تو بتائیے۔"],
  ar:["سعيد بمساعدتك. هل لديك سؤال آخر قبل حجز المكالمة؟","على الرحب والسعة — اسأل ما تشاء."],
  tr:["Yardımcı olabildiysem ne mutlu. Başka bir sorunuz var mı?","Rica ederim — aklınıza başka bir şey gelirse sorun."]},

 fallback:{
  en:["I can help with our services, timelines, pricing, offices or booking a call. Which of those is closest to what you need?",
      "I didn't quite catch that. Try asking about chatbots, websites, apps, ads, pricing or how to book a call.",
      "Let me point you the right way — are you asking about what we build, how long it takes, or what it costs?"],
  rom:["Main services, timeline, pricing, offices ya call booking mein madad kar sakta hoon. In mein se kya chahiye?",
       "Samajh nahi aaya. Chatbot, website, app, ads ya pricing ke baare mein poochein."],
  ur:["میں سروسز، ٹائم لائن، قیمت، دفاتر یا کال بکنگ میں مدد کر سکتا ہوں۔ ان میں سے کیا درکار ہے؟",
      "میں سمجھ نہیں سکا۔ چیٹ بوٹ، ویب سائٹ، ایپ، اشتہارات یا قیمت کے بارے میں پوچھیں۔"],
  ar:["يمكنني المساعدة في الخدمات أو المدة أو الأسعار أو المكاتب أو حجز مكالمة. أي منها الأقرب لما تحتاجه؟",
      "لم أفهم تماماً. جرّب السؤال عن روبوتات المحادثة أو المواقع أو التطبيقات أو الأسعار."],
  tr:["Hizmetler, süreler, fiyatlar, ofisler veya randevu konusunda yardımcı olabilirim. Hangisi size en yakın?",
      "Tam anlayamadım. Chatbot, web sitesi, uygulama, reklam veya fiyat hakkında sorabilirsiniz."]}
};

/* never repeat a phrasing until the pool runs out */
var used={};
function pick(intent,lang){
 var pool=(R[intent]&&(R[intent][lang]||R[intent].en))||R.fallback.en;
 var key=intent+':'+lang;
 used[key]=used[key]||[];
 if(used[key].length>=pool.length)used[key]=[];
 var open=pool.filter(function(_,i){return used[key].indexOf(i)<0;});
 var idx=Math.floor(Math.random()*open.length);
 var text=open[idx];
 used[key].push(pool.indexOf(text));
 return text;
}

/* suggestion chips, shuffled and never shown twice */
var SUGGEST=[["What services do you offer?",'services'],["Do you build WhatsApp chatbots?",'chatbot'],
 ["How much does it cost?",'price'],["How long does a project take?",'time'],
 ["Where are your offices?",'offices'],["Can you build a mobile app?",'app'],
 ["Do you run Meta ads?",'ads'],["How do I book a call?",'contact'],
 ["قیمت کیا ہوگی؟",'price'],["ما هي خدماتكم؟",'services'],["Fiyat ne kadar?",'price']];
var shown=[];
function renderChips(){
 var open=SUGGEST.filter(function(_,i){return shown.indexOf(i)<0;});
 if(open.length<3){shown=[];open=SUGGEST;}
 var picks=[];
 while(picks.length<3&&open.length){
  var i=Math.floor(Math.random()*open.length);
  picks.push(open[i]); shown.push(SUGGEST.indexOf(open[i])); open.splice(i,1);
 }
 chips.innerHTML=picks.map(function(p){
  return '<button type="button" data-q="'+p[0].replace(/"/g,'&quot;')+'">'+p[0]+'</button>';}).join('');
}

/* ── 4 · rendering ── */
function say(who,text,lang){
 var d=document.createElement('div');
 d.className='msg '+who; d.textContent=text;
 if(lang==='ur'||lang==='ar')d.setAttribute('dir','rtl');
 body.appendChild(d); body.scrollTop=body.scrollHeight;
}
function reply(text){
 var lang=detect(text), intent=intentOf(text);
 if(reduce){say('us',pick(intent,lang),lang);renderChips();return;}
 var t=document.createElement('div');
 t.className='typing'; t.innerHTML='<i></i><i></i><i></i>';
 body.appendChild(t); body.scrollTop=body.scrollHeight;
 setTimeout(function(){
  t.remove(); say('us',pick(intent,lang),lang); renderChips();
 },700+Math.random()*500);
}
function ask(text){ say('them',text,detect(text)); reply(text); }

chips.addEventListener('click',function(e){
 var b=e.target.closest('button'); if(!b)return; ask(b.dataset.q);
});
form.addEventListener('submit',function(e){
 e.preventDefault();
 var v=input.value.trim(); if(!v)return;
 input.value=''; ask(v);
});

/* ── 5 · open / close ── */
var greeted=false;
function open(){
 cw.classList.add('open'); launch.setAttribute('aria-expanded','true');
 launch.style.display='none'; if(greet)greet.classList.remove('on');
 if(!greeted){
  greeted=true; renderChips();
  say('us',"Hello! I'm Ideonix AI. I answer in English, Urdu, Roman Urdu, Arabic and Turkish — ask me anything about what we build, how long it takes or what it costs.");
 }
 setTimeout(function(){input.focus();},260);
}
function close(){
 cw.classList.remove('open'); launch.setAttribute('aria-expanded','false'); launch.style.display='';
 if(greet)greet.classList.add('on');
}
launch.addEventListener('click',open);
document.getElementById('cwClose').addEventListener('click',close);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&cw.classList.contains('open'))close();});

/* the greeting stays visible the whole time — it only steps aside
   while the chat panel itself is open */
if(greet)greet.classList.add('on');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ideoChatInit);
else ideoChatInit();

/* ═════ LEAD FORM ═════ */
var form=document.getElementById('leadForm'),sent=document.getElementById('sent');
form.addEventListener('submit',function(e){
 e.preventDefault();var ok=true;
 form.querySelectorAll('input,select').forEach(function(input){
  var field=input.closest('.field'),valid=input.value.trim()!=='';
  if(input.type==='email')valid=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
  field.classList.toggle('bad',!valid);
  if(!valid&&ok){input.focus();ok=false;}});
 if(!ok)return;
 var first=document.getElementById('f-name').value.trim().split(' ')[0];
 document.getElementById('sentMsg').textContent='Thanks '+first+" — check your inbox for a calendar link within one business day.";
 form.style.display='none';sent.classList.add('on');
 sent.scrollIntoView({block:'center',behavior:reduce?'auto':'smooth'});});
form.querySelectorAll('input,select').forEach(function(i){
 i.addEventListener('input',function(){i.closest('.field').classList.remove('bad');});});
})();

/* ═════ mobile: progress bar, carousel dots, swipe, back-to-top ═════ */
(function(){
 /* page scroll progress */
 var pb=document.getElementById('pageProg');
 var top=document.getElementById('toTop');
 function onDoc(){
  var d=document.documentElement,
      max=d.scrollHeight-window.innerHeight,
      p=max>0?window.scrollY/max:0;
  if(pb)pb.style.transform='scaleX('+p+')';
  if(top)top.classList.toggle('on',window.scrollY>1200);
 }
 window.addEventListener('scroll',onDoc,{passive:true});
 window.addEventListener('resize',onDoc); onDoc();
 if(top)top.addEventListener('click',function(){
  window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
 });

 /* services carousel dots (mobile only) */
 var rail=document.getElementById('svcGrid'),dots=document.getElementById('svcDots');
  if(!rail||!dots)return;
 if(rail&&dots){
  function build(){
   var cards=rail.children.length;
   dots.innerHTML=Array.from({length:cards},function(_,i){
    return '<i class="'+(i===0?'on':'')+'"></i>';}).join('');
  }
  build();
  var mo=new MutationObserver(build); mo.observe(rail,{childList:true});
  rail.addEventListener('scroll',function(){
   var w=rail.scrollWidth-rail.clientWidth;
   if(w<=0)return;
   var i=Math.round(rail.scrollLeft/w*(rail.children.length-1));
   [].forEach.call(dots.children,function(d,k){d.classList.toggle('on',k===i);});
  },{passive:true});
 }

})();

/* full-screen video banners: tell the CSS how much of the video width is visible at this window shape */
(function(){
  function vf(){var W=window.innerWidth;
    var cw=W-48,h=Math.max(520,0.38*W);                  /* banner card size, same rule as the CSS */
    var f=Math.min(1,(cw/h)/2.743);                      /* share of the video's width that is visible */
    document.documentElement.style.setProperty('--vf',f.toFixed(4));}
  vf();window.addEventListener('resize',vf);
})();
