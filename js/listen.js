/* MonTirSportif – bouton « Écouter cette page » (synthèse vocale du navigateur, rien n'est envoyé) */
(function () {
  if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) return;
  var synth = window.speechSynthesis;
  var css = '' +
    '.lis-wrap{position:relative;display:inline-flex;align-items:center;gap:.35rem;margin-left:.5rem;vertical-align:middle;flex-wrap:wrap}' +
    '.lis-btn{border:1px solid var(--line,#d5dbe3);background:var(--card,#fff);color:var(--txt,#1b2430);border-radius:99px;padding:.35rem .85rem;font:inherit;font-size:.85rem;cursor:pointer;display:inline-flex;align-items:center;gap:.35rem}' +
    '.lis-btn:hover{border-color:var(--acc,#e5473d)}' +
    '.lis-btn[aria-pressed="true"]{background:var(--acc,#e5473d);border-color:var(--acc,#e5473d);color:#fff}' +
    '.lis-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.lis-ctl{display:inline-flex;align-items:center;gap:.3rem}.lis-ctl[hidden]{display:none}' +
    '.lis-ctl select{font:inherit;font-size:.82rem;border:1px solid var(--line,#d5dbe3);border-radius:99px;padding:.3rem .5rem;background:var(--card,#fff);color:var(--txt,#1b2430)}' +
    '.lis-cur{outline:3px solid var(--acc,#e5473d);outline-offset:4px;border-radius:4px;background:rgba(255,214,0,.18)}' +
    '.lis-home{margin:.6rem 0 0}.lis-home .lis-wrap{margin-left:0}' +
    '@media print{.lis-wrap{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var I = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    stop: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="1"/></svg>'
  };
  var SKIP = 'script,style,svg,nav,header,footer,button,select,input,textarea,.lis-wrap,.share-wrap,.somm,.print-btn,.back,.yt,.srch,[aria-hidden="true"],.print-src';
  var blocks = [], pos = 0, state = 'idle', voice = null, rate = 1, cur = null, btn, ctl, pauseBtn, sel;

  function pickVoice() {
    var vs = synth.getVoices().filter(function (v) { return /^fr(-|_|$)/i.test(v.lang); });
    if (!vs.length) return null;
    var pref = [/natural|neural|online/i, /google/i, /amélie|amelie|thomas|denise|henri|audrey|marie/i];
    for (var i = 0; i < pref.length; i++) { for (var j = 0; j < vs.length; j++) if (pref[i].test(vs[j].name) && /fr-FR/i.test(vs[j].lang)) return vs[j]; }
    for (var k = 0; k < vs.length; k++) if (/fr-FR/i.test(vs[k].lang)) return vs[k];
    return vs[0];
  }
  function collect() {
    var root = document.querySelector('main') || document.body, out = [];
    root.querySelectorAll('h1,h2,h3,h4,p,li,td,th,figcaption,blockquote,dt,dd,.card > b,.mini-tiles > div').forEach(function (el) {
      if (el.closest(SKIP)) return;
      if (el.matches('li,td,th,dd,.mini-tiles > div') && el.querySelector('p,li,h3')) return; // évite les doublons
      if (el.matches('p') && el.closest('li,td,blockquote')) return;
      if (el.offsetParent === null && getComputedStyle(el).position !== 'fixed') return; // masqué
      var t = (el.innerText || '').replace(/[↗→←▾▶]/g, '').replace(/\s+/g, ' ').trim();
      if (t.length < 2) return;
      out.push({ el: el, t: t });
    });
    return out;
  }
  function mark(el) { if (cur) cur.classList.remove('lis-cur'); cur = el; if (el) { el.classList.add('lis-cur'); var r = el.getBoundingClientRect(); if (r.top < 80 || r.bottom > innerHeight - 40) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); } }
  function speakNext() {
    if (state !== 'play') return;
    if (pos >= blocks.length) { stop(); return; }
    var b = blocks[pos], u = new SpeechSynthesisUtterance(b.t);
    u.lang = 'fr-FR'; if (voice) u.voice = voice; u.rate = rate;
    u.onend = function () { if (state === 'play') { pos++; speakNext(); } };
    u.onerror = function (e) { if (e.error !== 'interrupted' && e.error !== 'canceled' && state === 'play') { pos++; speakNext(); } };
    mark(b.el); synth.speak(u);
  }
  function setUI() {
    btn.setAttribute('aria-pressed', state === 'idle' ? 'false' : 'true');
    btn.innerHTML = I.play + (state === 'idle' ? 'Écouter' : 'Écoute en cours');
    ctl.hidden = state === 'idle';
    pauseBtn.innerHTML = state === 'pause' ? I.play + 'Reprendre' : I.pause + 'Pause';
  }
  function start(fromEl) {
    synth.cancel(); voice = pickVoice(); blocks = collect(); pos = 0;
    if (fromEl) { for (var i = 0; i < blocks.length; i++) if (fromEl.contains(blocks[i].el) || blocks[i].el === fromEl) { pos = i; break; } }
    state = 'play'; setUI(); speakNext();
  }
  function stop() { state = 'idle'; synth.cancel(); mark(null); setUI(); }
  function togglePause() {
    if (state === 'play') { state = 'pause'; synth.cancel(); }
    else if (state === 'pause') { state = 'play'; speakNext(); }
    setUI();
  }
  function build() {
    var wrap = document.createElement('span'); wrap.className = 'lis-wrap';
    btn = document.createElement('button'); btn.type = 'button'; btn.className = 'lis-btn';
    btn.title = 'Écouter cette page (lecture par la voix de votre appareil ; rien n’est envoyé)';
    btn.addEventListener('click', function () { if (state === 'idle') start(); else togglePause(); });
    ctl = document.createElement('span'); ctl.className = 'lis-ctl';
    pauseBtn = document.createElement('button'); pauseBtn.type = 'button'; pauseBtn.className = 'lis-btn'; pauseBtn.addEventListener('click', togglePause);
    var stopBtn = document.createElement('button'); stopBtn.type = 'button'; stopBtn.className = 'lis-btn'; stopBtn.innerHTML = I.stop + 'Arrêter'; stopBtn.addEventListener('click', stop);
    sel = document.createElement('select'); sel.setAttribute('aria-label', 'Vitesse de lecture');
    [['0.8', 'Lent'], ['1', 'Normal'], ['1.25', 'Rapide'], ['1.5', 'Très rapide']].forEach(function (o) { var op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (o[0] === '1') op.selected = true; sel.appendChild(op); });
    try { var sv = localStorage.getItem('mts-lis-rate'); if (sv) { sel.value = sv; rate = parseFloat(sv) || 1; } } catch (e) {}
    sel.addEventListener('change', function () { rate = parseFloat(sel.value) || 1; try { localStorage.setItem('mts-lis-rate', sel.value); } catch (e) {} if (state === 'play') { synth.cancel(); speakNext(); } });
    ctl.appendChild(pauseBtn); ctl.appendChild(stopBtn); ctl.appendChild(sel);
    wrap.appendChild(btn); wrap.appendChild(ctl);
    setUI();
    return wrap;
  }
  function init() {
    var w = build();
    var sh = document.querySelector('.share-wrap');
    if (sh) { sh.parentNode.insertBefore(w, sh.nextSibling); }
    else {
      var host = document.querySelector('main .theme-head, main .hero > div, main');
      if (!host) return;
      var d = document.createElement('div'); d.className = 'lis-home'; d.appendChild(w);
      var lead = host.querySelector('.lead');
      if (lead) lead.parentNode.insertBefore(d, lead.nextSibling); else host.insertBefore(d, host.firstChild);
    }
    // double-clic sur un titre de section : lire à partir de là
    document.querySelectorAll('main section h2').forEach(function (h) {
      h.title = h.title || 'Double-cliquez pour écouter à partir d’ici';
      h.addEventListener('dblclick', function () { start(h); });
    });
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = function () { voice = pickVoice(); };
    window.addEventListener('pagehide', function () { synth.cancel(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state !== 'idle') stop(); });
  }
  function go() { setTimeout(init, 0); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
