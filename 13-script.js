/* ══════════════════════════════════════════════════════════════
   Photo + voice note for the Ideo widget.
   The site is static, so there is nothing to upload to and no model
   to read the file. We preview what the visitor picked, say so
   plainly, and hand them to WhatsApp where the real agent receives
   the media. No pretending the widget understood it.
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';
  var WA = '923360187339';
  var body   = document.getElementById('cwBody');
  var photo  = document.getElementById('cwPhoto');
  var pBtn   = document.getElementById('cwPhotoBtn');
  var mBtn   = document.getElementById('cwMicBtn');
  if(!body || !photo || !pBtn || !mBtn) return;

  function bubble(node){
    var d = document.createElement('div');
    d.className = 'cw-att';
    d.appendChild(node);
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }
  /* it cannot hear or see the file, but it can still answer properly
     once it knows the subject: offer the topics and let the existing
     knowledge base reply when one is tapped */
  var TOPICS = [
    ['Website','Do you build websites?'],
    ['Mobile app','Do you develop mobile apps?'],
    ['AI chatbot','Can you build an AI chatbot for my business?'],
    ['WhatsApp','Can you integrate WhatsApp into my business?'],
    ['E-commerce','Do you build online stores with cash on delivery?'],
    ['Custom software','Can you build custom software for my business?'],
    ['Graphic design','Do you provide graphic designing services?'],
    ['Pricing','What is your price?'],
    ['Start a project','I want to start a project. What should I do?']
  ];
  function topics(){
    var form  = document.getElementById('cwForm');
    var input = document.getElementById('cwInput');
    if(!form || !input) return;
    var wrap = document.createElement('div');
    wrap.className = 'cw-topics';
    TOPICS.forEach(function(t){
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = t[0];
      btn.addEventListener('click', function(){
        wrap.remove();
        input.value = t[1];
        if(form.requestSubmit) form.requestSubmit();
        else form.dispatchEvent(new Event('submit', {cancelable:true, bubbles:true}));
      });
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function note(text, waText){
    var d = document.createElement('div');
    d.className = 'msg us';
    d.textContent = text;
    body.appendChild(d);
    var a = document.createElement('a');
    a.className = 'cw-send';
    a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(waText);
    a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>' +
      '<span>Send it on WhatsApp</span>';
    body.appendChild(a);
    body.scrollTop = body.scrollHeight;
    topics();
  }

  /* ── photo ── */
  pBtn.addEventListener('click', function(){ photo.click(); });
  photo.addEventListener('change', function(){
    var f = photo.files && photo.files[0];
    if(!f) return;
    if(!/^image\//.test(f.type)){ return; }
    var img = document.createElement('img');
    img.alt = 'Photo you attached';
    img.src = URL.createObjectURL(f);
    img.onload = function(){ body.scrollTop = body.scrollHeight; };
    var d = bubble(img);
    var cap = document.createElement('b');
    cap.textContent = f.name;
    d.appendChild(cap);
    note("Got your photo. I can't open images here on the website, but I can still help — tell me what it's about and I'll answer straight away. Or send it to the team on WhatsApp, where our agent reads photos properly.",
         'Hi Ideonix Co. — I have a photo to share about my project.');
    photo.value = '';
  });

  /* ── voice note ────────────────────────────────────────────
     The browser can transcribe speech itself, so the note is turned
     into text and answered from the knowledge base like any typed
     question. Where speech recognition is unavailable we fall back
     to recording a playable clip and offering the topics. ───── */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var sr = null, listening = false;
  var form  = document.getElementById('cwForm');
  var input = document.getElementById('cwInput');

  function say(text){
    var d = document.createElement('div');
    d.className = 'msg them';
    d.textContent = text;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }
  function askIt(text){
    if(!form || !input) return;
    input.value = text;
    if(form.requestSubmit) form.requestSubmit();
    else form.dispatchEvent(new Event('submit', {cancelable:true, bubbles:true}));
  }
  function stopUi(){
    listening = false;
    mBtn.classList.remove('is-rec');
    mBtn.setAttribute('aria-label', 'Record a voice note');
  }
  function micHelp(kind){
    var msg = {
      denied : "I need microphone permission to hear you. Allow it in the padlock menu of your browser's address bar, then tap the mic again.",
      insecure: "Microphone only works on a secure address. Open the site over https (or localhost) rather than straight from a file, then tap the mic again.",
      none   : "No speech reached me \u2014 try again a little closer to the mic.",
      net    : "Speech recognition needs an internet connection and couldn't reach it just now.",
      nosr   : "This browser can't transcribe speech. Chrome, Edge and Safari can \u2014 or just type your question below."
    }[kind];
    note(msg + " In the meantime, pick a topic and I'll answer now, or send your voice note to the team on WhatsApp.",
         'Hi Ideonix Co. \u2014 I have a voice note about my project.');
  }

  /* fallback: record something playable and offer the topics */
  var rec = null, chunks = [], t0 = 0;
  function recordClip(){
    if(!navigator.mediaDevices || !window.MediaRecorder){ micHelp('nosr'); return; }
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
      var types = ['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/ogg;codecs=opus',''];
      var type  = types.find(function(t){
        return !t || (window.MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t));
      }) || '';
      chunks = []; t0 = Date.now();
      rec = type ? new MediaRecorder(stream,{mimeType:type}) : new MediaRecorder(stream);
      rec.ondataavailable = function(e){ if(e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = function(){
        stream.getTracks().forEach(function(tr){ tr.stop(); });
        stopUi();
        var secs = Math.max(1, Math.round((Date.now() - t0)/1000));
        var blob = new Blob(chunks, {type: rec.mimeType || 'audio/webm'});
        var au = document.createElement('audio');
        au.controls = true; au.preload = 'metadata';
        au.src = URL.createObjectURL(blob);
        var d = bubble(au);
        var cap = document.createElement('b');
        cap.textContent = 'Voice note \u00b7 ' + secs + 's';
        d.appendChild(cap);
        note("Recorded \u2014 press play to hear it back. I couldn't turn this one into text, so pick what it was about and I'll answer now, or send it to the team on WhatsApp.",
             'Hi Ideonix Co. \u2014 I have a voice note about my project.');
      };
      rec.start();
      listening = true;
      mBtn.classList.add('is-rec');
      mBtn.setAttribute('aria-label','Stop recording');
    }).catch(function(err){
      stopUi();
      micHelp(!window.isSecureContext ? 'insecure'
            : (err && (err.name === 'NotAllowedError' || err.name === 'SecurityError')) ? 'denied' : 'denied');
    });
  }

  mBtn.addEventListener('click', function(){
    /* already running: stop and let the handlers finish */
    if(listening){
      if(sr){ try{ sr.stop(); }catch(e){} }
      else if(rec && rec.state === 'recording'){ rec.stop(); }
      return;
    }
    if(!window.isSecureContext){ micHelp('insecure'); return; }
    if(!SR){ recordClip(); return; }

    sr = new SR();
    sr.lang = (navigator.language && /^(en|ur|ar|tr)/.test(navigator.language)) ? navigator.language : 'en-US';
    sr.interimResults = false;
    sr.maxAlternatives = 1;
    sr.continuous = false;

    var heard = '';
    sr.onresult = function(e){
      for(var i = e.resultIndex; i < e.results.length; i++){
        if(e.results[i].isFinal) heard += e.results[i][0].transcript;
      }
    };
    sr.onerror = function(e){
      stopUi(); sr = null;
      var k = e && e.error;
      micHelp(k === 'not-allowed' || k === 'service-not-allowed' ? 'denied'
            : k === 'no-speech' ? 'none'
            : k === 'network' ? 'net' : 'denied');
    };
    sr.onend = function(){
      stopUi();
      if(!sr) return;
      sr = null;
      heard = (heard || '').trim();
      if(heard){ say(heard); askIt(heard); }   /* answered from what you said */
      else micHelp('none');
    };
    try{
      sr.start();
      listening = true;
      mBtn.classList.add('is-rec');
      mBtn.setAttribute('aria-label','Stop listening');
    }catch(err){ stopUi(); sr = null; recordClip(); }
  });
})();
