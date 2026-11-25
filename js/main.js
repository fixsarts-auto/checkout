import './theme.js';
import { loadCatalog, buildOrder, fetchJson, validateCatalog } from './catalog.js';
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
    let admin = fromJs, s, catalog;
    if (local) { admin = admin || structuredClone(DEFAULTS.admin); s = DEFAULTS.site; catalog = validateCatalog(structuredClone(DEFAULTS.catalog)); }
    else { const r = await Promise.all([admin || fetchJson('config/admin.json'), loadCatalog(site)]); admin = r[0]; s = r[1].site; catalog = r[1].catalog; }
    document.title = `Checkout · ${admin.brand}`;
    render(root, { order: buildOrder(s, catalog, pid, kid), admin, toast });
    if (local) { const n = el('p', 'note', (fromJs ? 'Pratinjau lokal: pengaturan dari config/admin.js, produk memakai data contoh.' : 'Pratinjau lokal: memakai data contoh.')); root.append(n); }
  } catch (e) { renderError(root, 'Checkout tidak dapat dibuka', e.message); }
})();
