// Alchemia Aesthetic · hub szkoleniowy. Zero zależności.
(function () {
  /* ---- 1) Mobilne menu ---- */
  function bindMenu() {
    var btn = document.querySelector('.menu-btn');
    var links = document.querySelector('.nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* ---- 3) Aktywny link w nawigacji ---- */
  function markActiveNav() {
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---- 4) Pasek postępu czytania + szyna ---- */
  function bindProgress() {
    var bar = document.querySelector('.progress');
    var railFill = document.querySelector('.rail .railprog i');
    if (!bar && !railFill) return;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop || window.scrollY) / max : 0;
      pct = Math.max(0, Math.min(1, pct));
      if (bar) bar.style.width = (pct * 100) + '%';
      if (railFill) railFill.style.width = (pct * 100) + '%';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---- 5) Scroll-spy szyny modułów ---- */
  function bindScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.rail a[href^="#"]'));
    if (!links.length) return;
    var targets = links.map(function (a) {
      var el = document.getElementById(a.getAttribute('href').slice(1));
      return el ? { a: a, el: el } : null;
    }).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var bestId = null, best = 0;
      targets.forEach(function (t) {
        var v = visible[t.el.id] || 0;
        if (v > best) { best = v; bestId = t.el.id; }
      });
      targets.forEach(function (t) { t.a.classList.toggle('active', t.el.id === bestId); });
    }, { rootMargin: '-15% 0px -70% 0px', threshold: [0, .25, .5, 1] });
    targets.forEach(function (t) { io.observe(t.el); });
  }

  /* ---- 6) Reveal przy scrollu ---- */
  function bindReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- 7) Kopiowanie kodu/promptów ---- */
  function bindCopy() {
    document.querySelectorAll('.code').forEach(function (box) {
      var pre = box.querySelector('pre');
      if (!pre) return;
      var btn = document.createElement('button');
      btn.className = 'copy'; btn.type = 'button'; btn.textContent = 'Kopiuj';
      btn.addEventListener('click', function () {
        var txt = pre.innerText;
        var done = function () { btn.textContent = 'Skopiowano ✓'; btn.classList.add('done'); setTimeout(function () { btn.textContent = 'Kopiuj'; btn.classList.remove('done'); }, 1600); };
        if (navigator.clipboard) { navigator.clipboard.writeText(txt).then(done).catch(done); }
        else { var t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t); done(); }
      });
      box.appendChild(btn);
    });
  }

  /* ---- 8) Wyszukiwarka słowniczka ---- */
  function bindGlossSearch() {
    var input = document.getElementById('gloss-search');
    if (!input) return;
    var entries = Array.prototype.slice.call(document.querySelectorAll('.gloss .entry'));
    var letters = Array.prototype.slice.call(document.querySelectorAll('.gloss .letter'));
    var noresult = document.querySelector('.gloss .noresult');
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var any = false;
      entries.forEach(function (en) {
        var hit = en.textContent.toLowerCase().indexOf(q) !== -1;
        en.style.display = hit ? '' : 'none';
        if (hit) any = true;
      });
      // ukryj nagłówki liter bez widocznych haseł
      letters.forEach(function (lt) {
        var n = lt.nextElementSibling, show = false;
        while (n && !n.classList.contains('letter')) { if (n.classList.contains('entry') && n.style.display !== 'none') show = true; n = n.nextElementSibling; }
        lt.style.display = show ? '' : 'none';
      });
      if (noresult) noresult.style.display = any ? 'none' : 'block';
    });
  }

  function init() {
    bindMenu(); markActiveNav(); bindProgress();
    bindScrollSpy(); bindReveal(); bindCopy(); bindGlossSearch();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
