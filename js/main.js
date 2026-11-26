import './theme.js';
import { loadCatalog, buildOrder, refresh, entryOf, fetchJson, validateCatalog, orderKey, safeReturn } from './catalog.js';
import { sheetsPayload, sheetsSend } from './sheets.js';
import { DEFAULTS } from './defaults.js';
import { render, renderError, el } from './render.js';

const root = document.getElementById('app');
root.classList.add('page');
const toastEl = el('div', 'toast'); document.body.append(toastEl);
let tm; const toast = m => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(tm); tm = setTimeout(() => toastEl.classList.remove('show'), 2400); };

(async () => {
  const local = location.protocol === 'file:'; // pratinjau lokal: browser tidak mengizinkan fetch file JSON
  const q = new URLSearchParams(location.search);
  let site = q.get('site'), entry = entryOf(q);
  if (local) { site = site || 'demo'; if (!entry.items.length) entry = entryOf(new URLSearchParams({ items: 'logo-design:premium' })); }
  if (!site || !entry.items.length) return renderError(root, 'Pesanan belum dipilih', 'Buka halaman ini lewat tombol Beli di website Fixs.Arts.');
  try {
    // Pengaturan dibaca dari config/admin.js (jalan juga di file://). Cadangan: config/admin.json.
    const fromJs = window.FA_ADMIN ? structuredClone(window.FA_ADMIN) : null;
    let admin = fromJs, s, catalog, origins = null, home = '';
    if (local) { admin = admin || structuredClone(DEFAULTS.admin); s = DEFAULTS.site; catalog = validateCatalog(structuredClone(DEFAULTS.catalog)); }
    else { const r = await Promise.all([admin || fetchJson('config/admin.json'), loadCatalog(site)]); admin = r[0]; s = r[1].site; catalog = r[1].catalog; origins = r[1].origins; home = r[1].home; }
    document.title = `Checkout · ${admin.brand}`;
    let o = buildOrder(s, catalog, entry, undefined, admin); const sk = 'fa:o:' + o.id;
    // Pulihkan pesanan yang sedang berjalan (mis. setelah kembali dari WhatsApp). Data hanya ada di browser ini.
    try {
      const d = JSON.parse(localStorage.getItem(sk) || 'null');
      if (d && Date.now() - d.t < 72 * 36e5) { Object.assign(o.state, d.state); Object.assign(o.customer, d.customer); refresh(o, catalog, admin); }
      const pf = JSON.parse(sessionStorage.getItem('fa:prefill') || 'null'); if (pf) { Object.assign(o.customer, pf); sessionStorage.removeItem('fa:prefill'); }
    } catch { try { localStorage.removeItem(sk); } catch {} o = buildOrder(s, catalog, entry, undefined, admin); }
    const clear = () => { try { localStorage.removeItem(sk); sessionStorage.removeItem(orderKey(s, entry.sig)); } catch {} };
    const returnUrl = (origins && safeReturn(q.get('ret'), origins)) || home || null;
    render(root, { order: o, admin, catalog, toast, showSamples: local, returnUrl,
      onEvent: local ? undefined : (ev, x) => sheetsSend(admin, sheetsPayload(ev, x)),
      onChange: x => { try { const { anim, reveal, ...st } = x.state; localStorage.setItem(sk, JSON.stringify({ t: Date.now(), state: st, customer: x.customer })); } catch {} },
      onFinish: clear,
      onRestart: () => { try { sessionStorage.setItem('fa:prefill', JSON.stringify(o.customer)); } catch {} clear(); location.reload(); } });
    if (local) { const n = el('p', 'note', (fromJs ? 'Pratinjau lokal: pengaturan dari config/admin.js, produk memakai data contoh.' : 'Pratinjau lokal: memakai data contoh.')); root.append(n); }
  } catch (e) { renderError(root, 'Checkout tidak dapat dibuka', e.message); }
})();
