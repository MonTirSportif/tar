/* MonTirSportif – bouton « Partager » (e-mail, réseaux sociaux, copie du lien) */
(function () {
  var css = '' +
    '.share-wrap{position:relative;display:inline-block;margin-left:.5rem;vertical-align:middle}' +
    '.share-btn{border:1px solid var(--line,#d5dbe3);background:var(--card,#fff);color:var(--txt,#1b2430);border-radius:99px;padding:.35rem .85rem;font:inherit;font-size:.85rem;cursor:pointer}' +
    '.share-btn:hover{border-color:var(--acc,#e5473d)}' +
    '.share-menu{position:absolute;z-index:50;top:calc(100% + .35rem);left:0;min-width:210px;background:var(--card,#fff);border:1px solid var(--line,#d5dbe3);border-radius:12px;box-shadow:0 8px 24px rgba(27,36,48,.14);padding:.35rem;display:flex;flex-direction:column}' +
    '.share-menu[hidden]{display:none}' +
    '.share-menu a,.share-menu button{display:flex;align-items:center;gap:.55rem;padding:.45rem .6rem;border:0;background:none;border-radius:8px;font:inherit;font-size:.88rem;color:var(--txt,#1b2430);text-decoration:none;text-align:left;cursor:pointer;white-space:nowrap}' +
    '.share-menu a:hover,.share-menu button:hover{background:rgba(127,140,155,.12)}' +
    '.share-menu i{font-style:normal;width:1.3rem;display:inline-flex;justify-content:center}.share-menu i .ico{margin:0}' +
    '.share-badge{display:inline-grid;place-items:center;width:1.15rem;height:1.15rem;border-radius:5px;color:#fff;font-size:.62rem;font-weight:800;font-family:Inter,Arial,sans-serif}' +
    '.share-ok{color:#3d8f2a;font-size:.8rem;padding:.2rem .6rem}' +
    '.share-home{margin:.8rem 0 0}.share-home .share-wrap{margin-left:0}' +
    '@media print{.share-wrap{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var P = {
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>',
    sms: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    device: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>'
  };
  function ico(n) { return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">' + P[n] + '</svg>'; }
  function badge(txt, col) { return '<b class="share-badge" style="background:' + col + '">' + txt + '</b>'; }

  function build() {
    var url = location.href.split('#')[0];
    if (location.protocol === 'file:') url = 'https://rifle.montirsportif.com/';
    var title = document.title || 'MonTirSportif';
    var u = encodeURIComponent(url), t = encodeURIComponent(title);
    var links = [
      [ico('mail'), 'E-mail', 'mailto:?subject=' + t + '&body=' + encodeURIComponent(title + '\n' + url)],
      [badge('f', '#1877f2'), 'Facebook', 'https://www.facebook.com/sharer/sharer.php?u=' + u],
      [badge('W', '#25d366'), 'WhatsApp', 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url)],
      [badge('X', '#111'), 'X (Twitter)', 'https://twitter.com/intent/tweet?url=' + u + '&text=' + t],
      [badge('in', '#0a66c2'), 'LinkedIn', 'https://www.linkedin.com/sharing/share-offsite/?url=' + u],
      [badge('T', '#229ed9'), 'Telegram', 'https://t.me/share/url?url=' + u + '&text=' + t],
      [badge('B', '#1185fe'), 'Bluesky', 'https://bsky.app/intent/compose?text=' + encodeURIComponent(title + ' ' + url)],
      [ico('sms'), 'SMS', 'sms:?&body=' + encodeURIComponent(title + ' ' + url)]
    ];
    var wrap = document.createElement('span'); wrap.className = 'share-wrap';
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'share-btn'; btn.innerHTML = ico('share') + 'Partager';
    btn.setAttribute('aria-haspopup', 'true'); btn.setAttribute('aria-expanded', 'false');
    btn.title = 'Partager cette page par e-mail ou sur les réseaux sociaux';
    var menu = document.createElement('div'); menu.className = 'share-menu'; menu.hidden = true; menu.setAttribute('role', 'menu');
    if (navigator.share) {
      var n = document.createElement('button'); n.type = 'button'; n.innerHTML = '<i>' + ico('device') + '</i>Partager via l’appareil…';
      n.addEventListener('click', function () { navigator.share({ title: title, url: url }).catch(function () {}); close(); });
      menu.appendChild(n);
    }
    links.forEach(function (l) {
      var a = document.createElement('a'); a.href = l[2]; a.setAttribute('role', 'menuitem');
      if (!/^(mailto|sms):/.test(l[2])) { a.target = '_blank'; a.rel = 'noopener'; }
      a.innerHTML = '<i>' + l[0] + '</i>' + l[1];
      a.addEventListener('click', close);
      menu.appendChild(a);
    });
    var cp = document.createElement('button'); cp.type = 'button'; cp.innerHTML = '<i>' + ico('copy') + '</i>Copier le lien';
    var ok = document.createElement('div'); ok.className = 'share-ok'; ok.hidden = true; ok.textContent = 'Lien copié ✓';
    cp.addEventListener('click', function () {
      var done = function () { ok.hidden = false; setTimeout(function () { ok.hidden = true; close(); }, 1200); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copiez ce lien :', url); });
      else prompt('Copiez ce lien :', url);
    });
    menu.appendChild(cp); menu.appendChild(ok);
    function close() { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', String(!menu.hidden));
    });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    wrap.appendChild(btn); wrap.appendChild(menu);
    return wrap;
  }

  function init() {
    var pb = document.querySelector('.print-btn');
    if (pb) { pb.parentNode.insertBefore(build(), pb.nextSibling); return; }
    var bk = document.querySelector('.theme-head .back');
    if (bk) { bk.parentNode.insertBefore(build(), bk.nextSibling); return; }
    var pills = document.querySelector('.hero .pills');
    if (pills) { var d = document.createElement('div'); d.className = 'share-home'; d.appendChild(build()); pills.parentNode.insertBefore(d, pills); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
