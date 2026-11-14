// Overgenomen uit het ontwerp: mobiel menu, dagtabs programma, contactformulier.
// Het contactformulier (mailto) wordt in stap 5 vervangen door de Cloudflare-functie.
(function () {
  var en = document.documentElement.lang === 'en';
  var b = document.querySelector('[data-menu-btn]'), n = document.getElementById('mnav');
  if (b && n) {
    b.addEventListener('click', function () {
      var open = n.hidden;
      n.hidden = !open;
      b.setAttribute('aria-expanded', String(open));
      b.setAttribute('aria-label', open ? (en ? 'Close menu' : 'Menu sluiten') : (en ? 'Open menu' : 'Menu openen'));
    });
  }
  var tabs = [].slice.call(document.querySelectorAll('button.tab')), panels = [].slice.call(document.querySelectorAll('[data-daypanel]'));
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x, j) { x.classList.toggle('on', i === j); x.setAttribute('aria-pressed', String(i === j)); });
      panels.forEach(function (p, j) { p.hidden = i !== j; });
    });
  });
  var s = document.getElementById('f-submit');
  if (s) {
    var v = function (id) { return (document.getElementById(id).value || '').trim(); }, err = document.getElementById('form-error');
    s.addEventListener('click', function () {
      var miss = []; if (!v('f-first')) miss.push('voornaam'); if (!v('f-last')) miss.push('achternaam'); if (!v('f-email')) miss.push('e-mailadres');
      var msg = ''; if (miss.length) msg = 'Vul nog in: ' + miss.join(', ') + '.'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('f-email'))) msg = 'Controleer je e-mailadres, bijvoorbeeld naam@ziekenhuis.nl.';
      if (msg) { err.querySelector('p').textContent = msg; err.hidden = false; return; }
      err.hidden = true;
      var body = 'Naam: ' + v('f-first') + ' ' + v('f-last') + '\nE-mail: ' + v('f-email') + '\nOrganisatie: ' + v('f-org') + '\n\n' + v('f-msg');
      window.location.href = 'mailto:info@jcc-congressen.nl?subject=' + encodeURIComponent('Vraag over SLAAP2027') + '&body=' + encodeURIComponent(body);
      document.querySelector('[data-f="first"]').textContent = v('f-first');
      document.getElementById('form-view').hidden = true; document.getElementById('sent-view').hidden = false;
    });
    document.getElementById('f-reset').addEventListener('click', function () {
      ['f-first', 'f-last', 'f-email', 'f-org', 'f-msg'].forEach(function (id) { document.getElementById(id).value = ''; });
      document.getElementById('sent-view').hidden = true; document.getElementById('form-view').hidden = false;
    });
  }
})();
