/* MonTirSportif – navigation : menu ☰ sur mobile, fil d'Ariane, bouton « haut de page » */
(function () {
  var me = document.currentScript || document.querySelector('script[src$="js/nav.js"]');
  var base = me ? me.src.replace(/js\/nav\.js(\?.*)?$/, '') : '';
  var here = location.href.split('#')[0].split('?')[0];
  var key = base && here.indexOf(base) === 0 ? here.slice(base.length) : '';
  if (key === '' || /\/$/.test(key)) key += 'index.html';
  function rel(p) { return base + p; }

  var P = {
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9 16.2 7.8"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>'
  };
  function ico(k) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + P[k] + '</svg>'; }

  var T = {
    'index.html': ['Accueil', null],
    'epreuves.html': ['Les épreuves', 'index.html'],
    'deroulement.html': ['Le déroulement d’une épreuve', 'index.html'],
    'c-est-nouveau.html': ["C'est nouveau", 'index.html'],
    'plan-du-site.html': ['Plan du site', 'index.html']
  };

  var css = '' +
    /* fil d'Ariane */
    '.crumbs{font-size:.82rem;color:var(--mut,#667);margin:0 0 .7rem;line-height:1.5}' +
    '.crumbs a{color:var(--mut,#667);text-decoration:none}.crumbs a:hover{color:var(--acc);text-decoration:underline}' +
    '.crumbs .sep{margin:0 .35rem;opacity:.6}.crumbs [aria-current]{color:var(--txt,#1b2430);font-weight:600}' +
    '.site-sw{display:inline-flex;align-items:stretch;border:1px solid var(--line,#d5dbe3);border-radius:99px;overflow:hidden;vertical-align:middle;background:var(--card,#fff);margin-right:.1rem}' +
    '.site-sw>*{padding:.1rem .6rem;line-height:1.5;display:inline-flex;align-items:center;gap:.35rem}' +
    '.site-sw .sw-ico{width:16px;height:16px;border-radius:50%}.site-sw .on .sw-ico{background:#fff}' +
    '.crumbs .site-sw .on{background:var(--txt,#1b2430);color:#fff;font-weight:600}' +
    '.crumbs .site-sw a{color:var(--mut,#667);text-decoration:none;font-weight:500}.crumbs .site-sw a:hover{color:var(--acc);background:var(--bg2,#f4f6f8);text-decoration:none}' +
    /* fil d'Ariane */
    '.crumbs{font-size:.82rem;color:var(--mut,#667);margin:0 0 .7rem;line-height:1.5}' +
    '.crumbs a{color:var(--mut,#667);text-decoration:none}.crumbs a:hover{color:var(--acc);text-decoration:underline}' +
    '.crumbs .sep{margin:0 .35rem;opacity:.6}.crumbs [aria-current]{color:var(--txt,#1b2430);font-weight:600}' +
    /* menu ☰ */
    '.burger{display:none;border:1px solid var(--line,#d5dbe3);background:var(--card,#fff);color:var(--txt,#1b2430);border-radius:99px;height:38px;padding:0 .8rem;font:inherit;font-size:.9rem;font-weight:600;cursor:pointer;align-items:center;gap:0;margin-left:auto}' +
    '.mnav{position:fixed;left:0;right:0;bottom:0;z-index:60;background:var(--bg,#e9ecf0);overflow-y:auto;padding:.6rem 1rem 2rem;border-top:1px solid var(--line,#d5dbe3)}' +
    '.mnav[hidden]{display:none}' +
    '.mnav a{display:flex;align-items:center;gap:.6rem;padding:.7rem .8rem;margin:.15rem 0;border-radius:10px;background:var(--card,#fff);color:var(--txt,#1b2430);text-decoration:none;font-size:1rem}' +
    '.mnav a.cur{outline:2px solid var(--acc);font-weight:600}' +
    '.mnav a .ico{margin-right:0;width:1.2rem;height:1.2rem}.mnav a span{display:inline-grid;place-items:center;width:1.5rem;height:1.5rem;border-radius:6px;color:#fff;font-size:.8rem;font-weight:700}' +
    '.mnav a.sub{margin-left:1.2rem;font-size:.92rem}' +
    '.mnav h4{margin:1rem 0 .3rem;font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--mut,#667)}' +
    '@media (max-width:1000px){header #nav{display:none!important}.burger{display:inline-flex}}' +
    'body.mnav-open{overflow:hidden}' +
    '@media print{.crumbs,.burger,.mnav,.totop{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- Fil d'Ariane + bouton Retour vers la page parente ---------- */
  function crumbs() {
    var back = document.querySelector('.back');
    var hero = !back && key === 'index.html' ? document.querySelector('.hero > div') : null;
    if ((!back && !hero) || !T[key]) return;
    var chain = [], k = key, guard = 0;
    while (k && T[k] && guard++ < 8) { chain.unshift(k); k = T[k][1]; }
    var d = document.createElement('div');
    d.className = 'crumbs'; d.setAttribute('role', 'navigation'); d.setAttribute('aria-label', "Fil d'Ariane");
    /* site où l'on est + changement de site */
    var sw = document.createElement('span'); sw.className = 'site-sw'; sw.setAttribute('role', 'group'); sw.setAttribute('aria-label', 'Changer de site');
    sw.innerHTML = '<span class="on" aria-current="true" title="Vous êtes sur le site TAR"><img class="sw-ico" src="' + rel('img/picto-tar-fftir.png') + '" alt="">Site TAR</span><a href="https://pistol.montirsportif.com/" title="Aller sur le site Pistolet"><img class="sw-ico" src="' + rel('img/picto-pistolet-fftir.png') + '" alt="">Pistolet</a><a href="https://rifle.montirsportif.com/" title="Aller sur le site Carabine"><img class="sw-ico" src="' + rel('img/picto-carabine-fftir.png') + '" alt="">Carabine</a><a href="https://edt.montirsportif.com/" title="Aller sur le site École de tir"><img class="sw-ico" src="' + rel('img/fftir-ecole-de-tir.png') + '" alt="">École de tir</a><a href="https://sq.montirsportif.com/" title="Aller sur SQ (cible électronique Sport Quantum)"><img class="sw-ico" src="' + rel('img/picto-sq.png') + '" alt="">SQ</a><a href="https://thot.montirsportif.com/" title="Aller sur le site Thot"><img class="sw-ico" src="' + rel('img/picto-thot.png') + '" alt="">Thot</a>';
    d.appendChild(sw);
    var s0 = document.createElement('span'); s0.className = 'sep'; s0.textContent = '›'; d.appendChild(s0);
    chain.forEach(function (c, i) {
      if (i) { var s = document.createElement('span'); s.className = 'sep'; s.textContent = '›'; d.appendChild(s); }
      if (i === chain.length - 1) {
        var cur = document.createElement('span'); cur.setAttribute('aria-current', 'page'); cur.textContent = T[c][0]; d.appendChild(cur);
      } else {
        var a = document.createElement('a'); a.href = rel(c); a.textContent = T[c][0]; d.appendChild(a);
      }
    });
    if (hero) { hero.insertBefore(d, hero.firstChild); return; }
    back.parentNode.insertBefore(d, back);
    var parent = T[key][1];
    if (parent) { back.href = rel(parent); back.title = 'Retour : ' + T[parent][0]; }
  }

  /* ---------- Menu ☰ (téléphone et tablette) ---------- */
  function burger() {
    var bar = document.querySelector('header .bar'), nav = document.getElementById('nav');
    if (!bar || !nav) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'burger'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', 'mnav');
    b.innerHTML = ico('menu') + 'Menu';
    bar.appendChild(b);

    var m = document.createElement('div'); m.className = 'mnav'; m.id = 'mnav'; m.hidden = true;
    function add(href, html, cls) {
      var a = document.createElement('a'); a.href = href; a.innerHTML = html; if (cls) a.className = cls;
      var k = a.href.split('#')[0]; if (k === here && !/#/.test(href)) a.classList.add('cur');
      m.appendChild(a); return a;
    }
    function h(t) { var e = document.createElement('h4'); e.textContent = t; m.appendChild(e); }
    add(rel('index.html'), ico('home') + 'Accueil');
    Array.prototype.forEach.call(nav.children, function (el) {
      if (el.tagName === 'A') {
        if (el.textContent.trim() === 'Accueil' || /^https?:/.test(el.getAttribute('href'))) return;
        add(el.getAttribute('href'), el.innerHTML);
      } else if (el.tagName === 'BUTTON' && el.getAttribute('aria-controls')) {
        var mm = document.getElementById(el.getAttribute('aria-controls')); if (!mm) return;
        h(el.textContent.replace('▾', '').trim());
        Array.prototype.forEach.call(mm.querySelectorAll('a'), function (a) {
          var x = add(a.getAttribute('href'), a.innerHTML, a.classList.contains('sub') ? 'sub' : '');
          if (a.target) { x.target = a.target; x.rel = 'noopener'; }
        });
      }
    });
    h('Se repérer');
    add(rel('c-est-nouveau.html'), ico('star') + "C'est nouveau");
    add(rel('plan-du-site.html'), ico('map') + 'Plan du site');
    h('Aussi chez MonTirSportif');
    [['https://pistol.montirsportif.com/', 'Le site Pistolet ↗'], ['https://rifle.montirsportif.com/', 'Le site Carabine ↗'], ['https://edt.montirsportif.com/', 'Le site École de tir ↗'], ['https://sq.montirsportif.com/', 'SQ ↗'], ['https://thot.montirsportif.com/', 'Le site Thot ↗']].forEach(function (x) { var l = add(x[0], x[1]); l.target = '_blank'; l.rel = 'noopener'; });
    document.body.appendChild(m);

    function place() { var r = document.querySelector('header').getBoundingClientRect(); m.style.top = Math.max(0, r.bottom) + 'px'; }
    function open(o) {
      m.hidden = !o; b.setAttribute('aria-expanded', String(o));
      b.innerHTML = o ? ico('close') + 'Fermer' : ico('menu') + 'Menu';
      document.body.classList.toggle('mnav-open', o); if (o) place();
    }
    b.addEventListener('click', function (e) { e.stopPropagation(); open(m.hidden); });
    m.addEventListener('click', function (e) { if (e.target.closest('a')) open(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') open(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1000) open(false); else if (!m.hidden) place(); });
  }

  /* ---------- Bouton « haut de page » ---------- */
  function totop() {
    var t = document.querySelector('.totop');
    if (!t) {
      t = document.createElement('button'); t.type = 'button'; t.className = 'totop';
      t.setAttribute('aria-label', 'Revenir en haut de la page'); t.title = 'Haut de page'; t.textContent = '↑';
      document.body.appendChild(t);
    }
    t.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    function upd() { t.classList.toggle('on', window.scrollY > 600); }
    window.addEventListener('scroll', upd, { passive: true }); upd();
  }

  /* ---------- Sommaires : 3 premières entrées + « Voir plus » ---------- */
  function sommMore() {
    if (!document.getElementById('somm-more-css')) {
      var st = document.createElement('style'); st.id = 'somm-more-css';
      st.textContent = '.somm li.somm-hide{display:none}.somm.somm-open li.somm-hide{display:list-item}.somm.somm-more:not(.somm-open) ul,.somm.somm-more:not(.somm-open) .somm-cols{columns:auto}' +
        '.somm-btn{margin:.45rem 0 0;font:inherit;font-size:.82rem;font-weight:600;color:var(--acc);background:none;border:1px solid var(--line,#d5dbe3);border-radius:99px;padding:.25rem .8rem;cursor:pointer}' +
        '.somm-btn:hover{border-color:var(--acc)}@media print{.somm li.somm-hide{display:list-item!important}.somm-btn{display:none!important}}';
      document.head.appendChild(st);
    }
    Array.prototype.forEach.call(document.querySelectorAll('.somm'), function (s) {
      if (s.dataset.more) return; s.dataset.more = '1';
      var items = Array.prototype.filter.call(s.querySelectorAll('li'), function (li) {
        var p = li.parentElement && li.parentElement.closest('li'); return !(p && s.contains(p));
      });
      if (items.length <= 3) return;
      s.classList.add('somm-more');
      items.forEach(function (li, i) { if (i >= 3) li.classList.add('somm-hide'); });
      var b = document.createElement('button'); b.type = 'button'; b.className = 'somm-btn';
      var n = items.length - 3;
      var lab = function () { b.textContent = s.classList.contains('somm-open') ? 'Voir moins ▲' : 'Voir plus (' + n + ') ▼'; b.setAttribute('aria-expanded', s.classList.contains('somm-open') ? 'true' : 'false'); };
      b.addEventListener('click', function () { s.classList.toggle('somm-open'); lab(); });
      lab(); s.appendChild(b);
    });
  }
  function init() { crumbs(); burger(); totop(); sommMore(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
