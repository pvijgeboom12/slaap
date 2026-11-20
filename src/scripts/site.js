// Overgenomen uit het ontwerp: mobiel menu en dagtabs programma.
// Het contactformulier heeft een eigen script in components/pages/Contact.astro.
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
})();
