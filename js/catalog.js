import { calc } from './pricing.js';
export const ID = /^[a-z0-9-]{1,40}$/;
const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

export async function fetchJson(url, ms = 8000) {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctl.signal, cache: 'no-cache', credentials: 'omit' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } catch (e) { throw new Error(e.name === 'AbortError' ? 'Waktu habis saat memuat data.' : 'Gagal memuat data: ' + e.message); }
  finally { clearTimeout(t); }
}

export function validateCatalog(c) {
  const bad = m => { throw new Error('Katalog tidak valid: ' + m); };
  if (!c || typeof c !== 'object' || c.currency !== 'IDR' || !c.products || typeof c.products !== 'object') bad('format');
  for (const [pid, p] of Object.entries(c.products)) {
    if (!ID.test(pid) || typeof p.name !== 'string' || !p.packages) bad('produk ' + pid);
    for (const [kid, k] of Object.entries(p.packages)) {
      if (!ID.test(kid) || typeof k.name !== 'string' || !Number.isInteger(k.price) || k.price < 0) bad(`paket ${pid}/${kid}`);
      const d = k.discount;
      if (d && (!['percent', 'amount'].includes(d.type) || !Number.isInteger(d.value) || d.value < 0 ||
        (d.type === 'percent' && d.value > 100) || (d.type === 'amount' && d.value > k.price))) bad(`diskon ${pid}/${kid}`);
    }
  }
  return c;
}

// Katalog hanya boleh berasal dari: (1) nama terdaftar di config/sites.json ("sites"), atau
// (2) alamat website dengan origin yang ada di "allowedOrigins" (katalog selalu di <alamat>/data/products.json).
export async function loadCatalog(siteParam) {
  const cfg = await fetchJson('config/sites.json');
  let id, name, url;
  if (ID.test(siteParam || '')) {
    if (!own(cfg.sites || {}, siteParam)) throw new Error('Website belum terdaftar di Fixs.Arts Checkout.');
    const s = cfg.sites[siteParam]; id = siteParam; name = String(s.name || siteParam); url = new URL(s.catalog, location.href);
  } else {
    let u; try { u = new URL(siteParam); } catch { throw new Error('Alamat website tidak valid.'); }
    if (!Array.isArray(cfg.allowedOrigins) || !cfg.allowedOrigins.includes(u.origin)) throw new Error('Website belum terdaftar di Fixs.Arts Checkout.');
    if (!/^\/([A-Za-z0-9._-]+\/?)?$/.test(u.pathname)) throw new Error('Alamat website tidak valid.');
    const base = u.origin + u.pathname.replace(/\/$/, '');
    id = name = base.replace(/^https?:\/\//, ''); url = new URL(base + '/data/products.json');
  }
  if (url.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(url.hostname)) throw new Error('Alamat katalog harus HTTPS.');
  const catalog = validateCatalog(await fetchJson(url.href));
  if (typeof catalog.siteName === 'string' && catalog.siteName.trim()) name = catalog.siteName.trim().slice(0, 60);
  return { site: { id, name }, catalog };
}

const newId = () => {
  const d = new Date(), a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = crypto.getRandomValues(new Uint8Array(5));
  const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  return `FA-${ymd}-${[...r].map(x => a[x % a.length]).join('')}`;
};
export const stableId = key => { try { return sessionStorage.getItem(key) || (sessionStorage.setItem(key, newId()), sessionStorage.getItem(key)); } catch { return newId(); } };

// Harga SELALU dihitung dari katalog, tidak ada angka dari URL.
export function buildOrder(site, catalog, pid, kid, prev = {}) {
  if (!ID.test(pid || '') || !ID.test(kid || '')) throw new Error('ID produk atau paket tidak valid.');
  const p = own(catalog.products, pid) && catalog.products[pid];
  const k = p && own(p.packages, kid) && p.packages[kid];
  if (!k) throw new Error('Produk atau paket tidak ditemukan di katalog website.');
  const base = `catalog.products.${pid}`;
  return {
    id: prev.id || stableId(`fa-order:${site.id}:${pid}:${kid}`), site,
    product: { id: pid, name: p.name, path: base + '.name' },
    pkg: { id: kid, name: k.name, path: `${base}.packages.${kid}.name`, pp: `${base}.packages.${kid}`, discount: k.discount },
    pricing: calc(k),
    state: prev.state || { step: 0, method: null },
    customer: prev.customer || { name: '', wa: '', email: '', platform: 'instagram', handle: '' }
  };
}
