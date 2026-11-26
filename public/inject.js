/*
  Dopamine launcher. Paste ONE line into any page:

    from GitHub (via jsDelivr):
      <script src="https://cdn.jsdelivr.net/gh/hacthable/dop4mine@main/public/inject.js" data-url="https://YOUR-SITE.onrender.com"></script>

    or straight from your Dopamine server (no data-url needed):
      <script src="https://YOUR-SITE.onrender.com/inject.js"></script>

  Options (attributes on the script tag):
    data-url     your Dopamine address
    data-open    "true" to open Dopamine right away instead of showing a button
    data-button  "false" to hide the floating button (open with Alt+D)
*/
(function () {
  if (window.__dopamine) return;   /* only once per page */
  window.__dopamine = true;

  var me = document.currentScript || (function () {
    var s = document.querySelectorAll('script[src*="inject.js"]'); return s[s.length - 1];
  })();
  var attr = function (k) { return me && me.getAttribute(k); };

  /* work out the Dopamine address */
  var url = attr('data-url') || '';
  if (!url && me && me.src && !/jsdelivr|githubusercontent|github\.io/.test(me.src)) url = new URL(me.src).origin;
  if (!url) { console.warn('Dopamine: add data-url="https://YOUR-SITE.onrender.com" to the script tag.'); return; }
  url = url.replace(/\/+$/, '');

  function start() {
    /* everything lives in a shadow root, so the page's styles cannot break it and it cannot break the page */
    var host = document.createElement('div');
    host.style.cssText = 'all:initial;position:fixed;inset:auto;z-index:2147483647';
    document.body.appendChild(host);
    var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;

    root.innerHTML =
      '<style>' +
      ':host{all:initial}' +
      '.btn{position:fixed;right:20px;bottom:20px;z-index:2147483646;display:flex;align-items:center;gap:8px;border:0;border-radius:16px;' +
      'padding:12px 18px;font:600 15px system-ui,-apple-system,Segoe UI,sans-serif;color:#fff;cursor:pointer;' +
      'background:linear-gradient(120deg,#ff4f9a,#8b5cff);box-shadow:0 10px 30px rgba(139,92,255,.45)}' +
      '.btn:hover{filter:brightness(1.1)}.btn svg{width:20px;height:20px}' +
      '.pop{position:fixed;inset:0;z-index:2147483647;display:none;background:rgba(7,4,13,.75);padding:14px}' +
      '.pop.on{display:block}' +
      '.box{position:relative;width:100%;height:100%;border-radius:18px;overflow:hidden;background:#07040d;' +
      'border:1px solid #2a1f3d;box-shadow:0 20px 60px rgba(0,0,0,.6)}' +
      'iframe{display:block;width:100%;height:100%;border:0}' +
      '.ctl{position:absolute;left:12px;bottom:12px;z-index:1;display:flex;gap:6px}' +
      '.ctl button{border:0;border-radius:10px;height:36px;padding:0 12px;font:600 13px system-ui,sans-serif;color:#fff;' +
      'background:rgba(18,12,29,.88);cursor:pointer}.ctl button:hover{background:#2a1f3d}' +
      '.x{width:36px;padding:0!important;font-size:18px!important}' +
      '</style>' +
      '<button class="btn" type="button" title="Open Dopamine (Alt+D)"><svg viewBox="0 0 32 32" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round">' +
      '<path d="M16 5.5l9.1 5.25v10.5L16 26.5l-9.1-5.25v-10.5z"/><circle cx="16" cy="16" r="4.2" stroke-width="2.2"/></svg>Dopamine</button>' +
      '<div class="pop" role="dialog" aria-label="Dopamine"><div class="box"><div class="ctl">' +
      '<button class="win" type="button" title="Open in its own window">Open in window</button>' +
      '<button class="x" type="button" aria-label="Close">&times;</button></div></div></div>';

    var btn = root.querySelector('.btn'), pop = root.querySelector('.pop'), box = root.querySelector('.box'), frame = null;
    if (attr('data-button') === 'false') btn.style.display = 'none';

    function open() {
      if (!frame) {
        frame = document.createElement('iframe');
        frame.src = url;
        frame.allow = 'fullscreen; autoplay; clipboard-write';
        box.appendChild(frame);
      }
      pop.classList.add('on');
    }
    function close() { pop.classList.remove('on'); }
    function toggle() { pop.classList.contains('on') ? close() : open(); }

    btn.addEventListener('click', open);
    root.querySelector('.x').addEventListener('click', close);
    root.querySelector('.win').addEventListener('click', function () {
      window.open(url, 'dopamine', 'width=1200,height=800'); close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pop.classList.contains('on')) close();
      if (e.altKey && (e.key === 'd' || e.key === 'D' || e.code === 'KeyD')) { e.preventDefault(); toggle(); }
    });

    window.Dopamine = { open: open, close: close, toggle: toggle, url: url };
    if (attr('data-open') === 'true') open();
  }

  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
