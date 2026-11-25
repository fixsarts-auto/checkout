import './theme.js';
import { loadCatalog, buildOrder, fetchJson, validateCatalog, orderKey, safeReturn } from './catalog.js';
import { DEFAULTS } from './defaults.js';
import { render, renderError, el } from './render.js';

const root = document.getElementById('app');
root.classList.add('page');
const toastEl = el('div', 'toast'); document.body.append(toastEl);
let tm; const toast = m => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(tm); tm = setTimeout(() => toastEl.classList.remove('show'), 2400); };

(async () => {
  const local = location.protocol === 'file:'; // pratinjau lokal: browser tidak mengizinkan fetch file JSON
  const q = new URLSearchParams(location.search);
  let site = q.get('site'), pid = q.get('product'), kid = q.get('package');
  if (local && !(site && pid && kid)) { site = 'demo'; pid = 'logo-design'; kid = 'premium'; }
  if (!site || !pid || !kid) return renderError(root, 'Pesanan belum dipilih', 'Buka halaman ini lewat tombol Beli di website Fixs.Arts.');
  try {
    // Pengaturan dibaca dari config/admin.js (jalan juga di file://). Cadangan: config/admin.json.
    const fromJs = window.FA_ADMIN ? structuredClone(window.FA_ADMIN) : null;
    let admin = fromJs, s, catalog, origins = null, home = '';
    if (local) { admin = admin || structuredClone(DEFAULTS.admin); s = DEFAULTS.site; catalog = validateCatalog(structuredClone(DEFAULTS.catalog)); }
    else { const r = await Promise.all([admin || fetchJson('config/admin.json'), loadCatalog(site)]); admin = r[0]; s = r[1].site; catalog = r[1].catalog; origins = r[1].origins; home = r[1].home; }
    document.title = `Checkout · ${admin.brand}`;
    const o = buildOrder(s, catalog, pid, kid, undefined, admin), sk = 'fa:o:' + o.id;
    // Pulihkan pesanan yang sedang berjalan (mis. setelah kembali dari WhatsApp). Data hanya ada di browser ini.
    try {
      const d = JSON.parse(localStorage.getItem(sk) || 'null');
      if (d && Date.now() - d.t < 72 * 36e5) { Object.assign(o.state, d.state); Object.assign(o.customer, d.customer); }
      const pf = JSON.parse(sessionStorage.getItem('fa:prefill') || 'null'); if (pf) { Object.assign(o.customer, pf); sessionStorage.removeItem('fa:prefill'); }
    } catch {}
    const clear = () => { try { localStorage.removeItem(sk); sessionStorage.removeItem(orderKey(s, pid, kid)); } catch {} };
    const returnUrl = (origins && safeReturn(q.get('ret'), origins)) || home || null;
    render(root, { order: o, admin, toast, showSamples: local, returnUrl,
      onChange: x => { try { const { anim, reveal, ...st } = x.state; localStorage.setItem(sk, JSON.stringify({ t: Date.now(), state: st, customer: x.customer })); } catch {} },
      onFinish: clear,
      onRestart: () => { try { sessionStorage.setItem('fa:prefill', JSON.stringify(o.customer)); } catch {} clear(); location.reload(); } });
    if (local) { const n = el('p', 'note', (fromJs ? 'Pratinjau lokal: pengaturan dari config/admin.js, produk memakai data contoh.' : 'Pratinjau lokal: memakai data contoh.')); root.append(n); }
  } catch (e) { renderError(root, 'Checkout tidak dapat dibuka', e.message); }
})();
