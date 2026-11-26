/* Adaptor header/footer untuk halaman checkout.
   Link di headerfooter-config.js ditulis relatif ke website utama (index.html, services.html, ...).
   Di halaman /checkout/ link itu akan salah alamat, jadi di sini semuanya diarahkan ke website utama
   (dua folder di atas folder komponen: .../components/headerfooter/ -> .../).
   Harus dimuat SETELAH headerfooter-config.js dan SEBELUM headerfooter.js. */
(function () {
  'use strict';
  var tag = document.querySelector('script[src*="headerfooter-config.js"]'), root;
  try { root = new URL('../../', tag.src).href; } catch (e) { return; }

  var ABS = /^(#|\/|[a-z][a-z0-9+.-]*:)/i;                                   // sudah absolut / anchor / mailto: / https:
  var DOMAIN = /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}\//i, FILE = /^[^/]+\.(html?|php|aspx?|pdf|png|jpe?g|gif|webp|svg|css|js)\//i;
  function fix(v) {
    if (typeof v !== 'string') return v;
    var h = v.trim();
    if (!h || ABS.test(h) || (DOMAIN.test(h) && !FILE.test(h))) return v;     // "tr.ee/x" dianggap website luar
    try { return new URL(h, root).href; } catch (e) { return v; }
  }
  function walk(o) {
    if (!o || typeof o !== 'object') return;
    Object.keys(o).forEach(function (k) {
      if ((k === 'href' || k === 'action') && typeof o[k] === 'string') o[k] = fix(o[k]);
      else walk(o[k]);
    });
  }
  walk(window.HeaderConfig); walk(window.FooterConfig);
})();
