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
    'securite-pas-de-tir.html': ['Sécurité et gestion du pas de tir', 'index.html'],
    'moniteur-tar.html': ['Devenir moniteur TAR', 'index.html'],
    'technique.html': ['La technique de base', 'index.html'],
    'techniques-tar.html': ['Les techniques propres au TAR', 'index.html'],
    'encadrer.html': ['Accueillir et encadrer une séance', 'moniteur-tar.html'],
    'le-club.html': ['Le moniteur dans son club', 'moniteur-tar.html'],
    'c-est-nouveau.html': ["C'est nouveau", 'index.html'],
    'navigation.html': ['Naviguer dans le site', 'index.html'],
    'annonce.html': ['Mon annonce', 'index.html'],
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
    '@media(max-width:600px){.site-sw{display:flex;flex-wrap:wrap;width:fit-content;max-width:100%;border-radius:12px;margin-bottom:.25rem}}' +
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
    add(rel('navigation.html'), ico('compass') + 'Naviguer dans le site');
    add(rel('plan-du-site.html'), ico('map') + 'Plan du site');
    h('Aussi chez MonTirSportif');
    [['https://pistol.montirsportif.com/', 'Le site Pistolet ↗'], ['https://rifle.montirsportif.com/', 'Le site Carabine ↗'], ['https://edt.montirsportif.com/', 'Le site École de tir ↗'], ['https://sq.montirsportif.com/', 'SQ ↗'], ['https://thot.montirsportif.com/', 'Le site Thot ↗'], ['https://club.montirsportif.com/', 'Le site Club ↗']].forEach(function (x) { var l = add(x[0], x[1]); l.target = '_blank'; l.rel = 'noopener'; });
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

/* MonTirSportif – « Grand affichage » pour les personnes qui voient mal (texte, boutons et contrastes agrandis) */
(function () {
  var K = 'mts-big';
  function get() { try { return localStorage.getItem(K) === '1'; } catch (e) { return false; } }
  function put(v) { try { localStorage.setItem(K, v ? '1' : '0'); } catch (e) {} }
  if (!document.getElementById('mts-big-css')) {
    var st = document.createElement('style'); st.id = 'mts-big-css';
    st.textContent =
      '.big-btn{display:inline-flex;align-items:center;gap:.35rem;flex:none;margin-left:auto;border:1px solid var(--line,#d3d9e1);background:var(--card,#fff);color:var(--txt,#1b2430);border-radius:99px;height:38px;padding:0 .8rem;font:inherit;font-size:.88rem;font-weight:600;cursor:pointer}' +
      '.big-btn:hover{border-color:var(--mut,#5a6676)}.big-btn b{font-family:Georgia,serif;font-size:1.15em;line-height:1}' +
      '.big-btn[aria-pressed="true"]{background:var(--txt,#1b2430);color:var(--card,#fff);border-color:var(--txt,#1b2430)}' +
      '.big-btn+.burger,.big-btn+.srch-btn{margin-left:.4rem}' +
      '@media(max-width:1240px){.big-btn span{display:none}.big-btn{padding:0 .7rem}}' +
      'html.mts-big{font-size:125%;--mut:#2b3644;--line:#9aa5b4}' +
      'html.mts-big body{font-size:20px;line-height:1.7}' +
      'html.mts-big nav a{font-size:1rem;color:var(--txt)}' +
      'html.mts-big .muted,html.mts-big small,html.mts-big figcaption{color:var(--txt)}' +
      'html.mts-big a:focus-visible,html.mts-big button:focus-visible,html.mts-big select:focus-visible,html.mts-big input:focus-visible{outline:3px solid var(--acc,#e0601f);outline-offset:2px}' +
      'html.mts-big .grid3{grid-template-columns:repeat(2,minmax(0,1fr))}' +
      '@media(max-width:900px){html.mts-big .grid2,html.mts-big .grid3{grid-template-columns:minmax(0,1fr)}}' +
      'html.mts-big header .big-btn,html.mts-big header .burger,html.mts-big header .srch-btn{height:46px;font-size:1rem}' +
      '@media print{.big-btn{display:none!important}html.mts-big{font-size:100%}}';
    document.head.appendChild(st);
  }
  function apply(v) {
    document.documentElement.classList.toggle('mts-big', v);
    Array.prototype.forEach.call(document.querySelectorAll('.big-btn'), function (b) {
      b.setAttribute('aria-pressed', v ? 'true' : 'false');
      b.title = v ? 'Revenir à l’affichage normal' : 'Grand affichage : texte et boutons plus grands';
      b.querySelector('span').textContent = v ? 'Affichage normal' : 'Grand affichage';
    });
    try { document.dispatchEvent(new CustomEvent('mts-big', { detail: v })); } catch (e) {}
  }
  window.mtsBig = { get: get, set: function (v) { put(v); apply(v); } };
  apply(get());
  window.addEventListener('storage', function (e) { if (e.key === K) apply(get()); });
  function btn() {
    var bar = document.querySelector('header .bar');
    if (!bar || bar.querySelector('.big-btn')) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'big-btn';
    b.innerHTML = '<b aria-hidden="true">A+</b><span>Grand affichage</span>';
    b.addEventListener('click', function () { window.mtsBig.set(!get()); });
    bar.insertBefore(b, bar.querySelector('.burger') || bar.querySelector('.srch-btn') || null);
    apply(get());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', btn); else btn();
})();

/* MonTirSportif – fil d'Ariane : liste déroulante pour changer de site */
(function () {
  var me = document.currentScript || document.querySelector('script[src*="js/nav.js"]');
  var base = me ? me.src.replace(/js\/nav\.js(\?.*)?$/, '') : '';
  var S = [
    ['pistol', 'Pistolet', 'Pistolet ISSF', 'picto-pistolet-fftir.png'],
    ['rifle', 'Carabine', 'Carabine ISSF', 'picto-carabine-fftir.png'],
    ['edt', 'École de tir', 'Les jeunes de 7 à 14 ans', 'fftir-ecole-de-tir.png'],
    ['sq', 'SQ', 'Cible électronique Sport Quantum', 'picto-sq.png'],
    ['tar', 'TAR', 'Tir aux armes réglementaires', 'picto-tar-fftir.png'],
    ['handi', 'Handi', 'Handi-tir et para-tir', 'picto-handy.png'],
    ['club', 'Club', 'La vie du club', 'picto-club.png'],
    ['thot', 'Thot', 'Le dieu égyptien de l’écriture', 'picto-thot.png']
  ];
  if (!document.getElementById('mts-sitesw-css')) {
    var st = document.createElement('style'); st.id = 'mts-sitesw-css';
    st.textContent =
      '.site-dd{position:relative;display:inline-block;vertical-align:middle;margin-right:.1rem}' +
      '.site-dd>button{display:inline-flex;align-items:center;gap:.4rem;font:inherit;font-size:inherit;font-weight:600;color:#fff;background:var(--txt,#1b2430);border:1px solid var(--txt,#1b2430);border-radius:99px;padding:.15rem .7rem .15rem .35rem;cursor:pointer;line-height:1.5}' +
      '.site-dd>button:hover,.site-dd>button[aria-expanded="true"]{background:var(--acc,#e0601f);border-color:var(--acc,#e0601f)}' +
      '.site-dd .sw-ico{width:18px;height:18px;border-radius:50%;background:#fff;flex:none}' +
      '.site-dd .caret{font-size:.75em;opacity:.85}' +
      '.site-dd ul{position:absolute;z-index:40;top:calc(100% + 6px);left:0;min-width:260px;margin:0;padding:6px;list-style:none;background:var(--card,#fff);border:1px solid var(--line,#d5dbe3);border-radius:12px;box-shadow:0 10px 30px rgba(27,36,48,.18)}' +
      '.site-dd ul[hidden]{display:none}' +
      '.site-dd li a,.site-dd li span.cur{display:flex;align-items:center;gap:.6rem;padding:.45rem .6rem;border-radius:8px;color:var(--txt,#1b2430);text-decoration:none;line-height:1.25}' +
      '.site-dd li a:hover,.site-dd li a:focus{background:var(--bg2,#f4f6f8);outline:none}' +
      '.site-dd li span.cur{background:var(--bg2,#f4f6f8);font-weight:700}' +
      '.site-dd li small{display:block;color:var(--mut,#5a6676);font-size:.8em;font-weight:400}' +
      '.site-dd li .sw-ico{width:26px;height:26px;background:#fff;border:1px solid var(--line,#d5dbe3)}' +
      '.site-dd li .ok{margin-left:auto;color:var(--acc,#e0601f)}' +
      '@media print{.site-dd ul{display:none!important}}';
    document.head.appendChild(st);
  }
  function current(sw) {
    var h = (location.hostname || '').split('.')[0];
    for (var i = 0; i < S.length; i++) if (S[i][0] === h) return S[i][0];
    var t = (sw.querySelector('.on') || sw).textContent || '';
    for (var j = 0; j < S.length; j++) if (t.indexOf(S[j][1]) >= 0) return S[j][0];
    var m = location.pathname.match(/\/(pistol|rifle|edt|sq|thot|tar|handi|club)\//); return m ? m[1] : 'pistol';
  }
  function build() {
    var sw = document.querySelector('.crumbs .site-sw');
    if (!sw || sw.dataset.dd) return;
    var cur = current(sw), c = S.filter(function (s) { return s[0] === cur; })[0] || S[0];
    var dd = document.createElement('span'); dd.className = 'site-dd';
    var id = 'site-dd-list';
    var h = '<button type="button" aria-haspopup="true" aria-expanded="false" aria-controls="' + id + '" title="Changer de site MonTirSportif">' +
      '<img class="sw-ico" src="' + base + 'img/' + c[3] + '" alt="">Site ' + c[1] + '<span class="caret" aria-hidden="true">▾</span></button><ul id="' + id + '" hidden aria-label="Les sites MonTirSportif">';
    S.forEach(function (s) {
      var inner = '<img class="sw-ico" src="' + base + 'img/' + s[3] + '" alt=""><span>' + s[1] + '<small>' + s[2] + '</small></span>';
      h += s[0] === cur ? '<li><span class="cur" aria-current="true">' + inner + '<span class="ok" aria-hidden="true">✓</span></span></li>'
                        : '<li><a href="https://' + s[0] + '.montirsportif.com/">' + inner + '</a></li>';
    });
    dd.innerHTML = h + '</ul>';
    sw.dataset.dd = '1'; sw.parentNode.replaceChild(dd, sw);
    var b = dd.querySelector('button'), ul = dd.querySelector('ul');
    function open(v, focus) { ul.hidden = !v; b.setAttribute('aria-expanded', v ? 'true' : 'false'); if (v && focus) { var f = ul.querySelector('a'); if (f) f.focus(); } }
    b.addEventListener('click', function (e) { e.stopPropagation(); open(ul.hidden, false); });
    b.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown') { e.preventDefault(); open(true, true); } });
    ul.addEventListener('keydown', function (e) {
      var l = Array.prototype.slice.call(ul.querySelectorAll('a')), i = l.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); (l[i + 1] || l[0]).focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); (l[i - 1] || l[l.length - 1]).focus(); }
      else if (e.key === 'Escape') { open(false); b.focus(); }
    });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) open(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !ul.hidden) { open(false); b.focus(); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(build, 0); }); else setTimeout(build, 0);
})();
