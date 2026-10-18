/* ══════════════════════════════════════════════════════════════
   Budget in the client's own currency, and a choice of channel
   once the form is sent.

   ⚠ REPLACE THESE TWO before going live — they are placeholders.
   The WhatsApp number is the same dummy already used by the
   social links in this file (wa.me/923360187339).
   ══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var CONTACT = {
    whatsapp: '923360187339',        // Ideonix WhatsApp
    email:    'talhushaikhu@gmail.com'   // Ideonix inbox
  };

  /* ⚠ Indicative bands only — set these to your own numbers. */
  var BUDGETS = {
    'Pakistan':      {cur:'PKR', bands:['Under ₨500,000','₨500,000 – 1,500,000','₨1,500,000 – 4,000,000','₨4,000,000+']},
    'United States': {cur:'USD', bands:['Under $2,000','$2,000 – 6,000','$6,000 – 15,000','$15,000+']},
    'Qatar':         {cur:'QAR', bands:['Under QAR 7,000','QAR 7,000 – 22,000','QAR 22,000 – 55,000','QAR 55,000+']},
    'Australia':     {cur:'AUD', bands:['Under A$3,000','A$3,000 – 9,000','A$9,000 – 22,000','A$22,000+']},
    'Bahrain':       {cur:'BHD', bands:['Under BD 750','BD 750 – 2,300','BD 2,300 – 5,600','BD 5,600+']},
    'Somewhere else':{cur:'USD', bands:['Under $2,000','$2,000 – 6,000','$6,000 – 15,000','$15,000+']}
  };

  var country = document.getElementById('f-country');
  var budget  = document.getElementById('f-budget');
  var curTag  = document.getElementById('curTag');
  var form    = document.getElementById('leadForm');
  if (!country || !budget || !form) return;

  function fillBudget(){
    var pick = BUDGETS[country.value];
    budget.innerHTML = '';
    if (!pick){
      budget.appendChild(new Option('Choose a country first', ''));
      budget.disabled = true;
      if (curTag) curTag.textContent = 'select a country';
      return;
    }
    budget.disabled = false;
    budget.appendChild(new Option('Select', ''));
    pick.bands.forEach(function(b){ budget.appendChild(new Option(b, b)); });
    budget.appendChild(new Option('Not sure yet', 'Not sure yet'));
    if (curTag) curTag.textContent = pick.cur;
  }

  country.addEventListener('change', fillBudget);
  fillBudget();

  /* ── build the handoff message from what they typed ─────── */
  function val(id){
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function summary(){
    var lines = [
      'Hi Ideonix — I just submitted the discovery form.',
      '',
      'Name: '     + (val('f-name')   || '—'),
      'Brand: '    + (val('f-brand')  || '—'),
      'Site/IG: '  + (val('f-handle') || '—'),
      'Email: '    + (val('f-email')  || '—'),
      'Country: '  + (val('f-country')|| '—'),
      'Stage: '    + (val('f-stage')  || '—'),
      'Service: '  + (val('f-svc')    || '—'),
      'Budget: '   + (val('f-budget') || '—')
    ];
    var notes = val('f-notes');
    if (notes) lines.push('', 'About the project:', notes);
    return lines.join('\n');
  }

  /* our listener is added after the site's own, so it runs once
     that one has validated and revealed the confirmation panel */
  form.addEventListener('submit', function(){
    var text = summary();
    var wa   = document.getElementById('pickWa');
    var mail = document.getElementById('pickMail');
    var name = val('f-name').split(' ')[0] || 'there';

    if (wa){
      wa.href = 'https://wa.me/' + CONTACT.whatsapp + '?text=' + encodeURIComponent(text);
    }
    if (mail){
      var subject = 'Discovery call — ' + (val('f-brand') || name) +
                    (val('f-svc') ? ' · ' + val('f-svc') : '');
      mail.href = 'mailto:' + CONTACT.email +
                  '?subject=' + encodeURIComponent(subject) +
                  '&body='    + encodeURIComponent(text);
    }
  });
})();
