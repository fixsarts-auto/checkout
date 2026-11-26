/* AUTO-GENERATED oleh tools/build-demo.py, jangan diedit manual */
(()=>{
const K = 'fa-theme';
function initTheme() {
  let t; try { t = localStorage.getItem(K); } catch {}
  t = t || 'dark';
  document.documentElement.dataset.theme = t;
}
function toggleTheme() {
  const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(K, t); } catch {}
  return t;
}
initTheme();

const P = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  tiktok: '<path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.3 2.3 1.8 3.8 4 4"/>',
  facebook: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
  x: '<path d="M4 4l16 16M20 4L4 20"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z"/>',
  whatsapp: '<path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/><path d="M9 9c0 3 3 6 6 6"/>',
  email: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/>',
  other: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  qris: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h3M20 17v4"/>',
  bank: '<path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  download: '<path d="M12 4v11M7.5 11L12 15.5 16.5 11M5 20h14"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  grip: '<path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" stroke-width="3"/>',
  eye: '<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff: '<path d="M3 3l18 18M10.6 6.1A9.6 9.6 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.6 6.7C3.9 8.5 2 12 2 12s3.5 6 10 6c1.5 0 2.8-.3 4-.8M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  trash: '<path d="M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6"/>',
  upload: '<path d="M12 16V4M7.5 8.5L12 4l4.5 4.5M5 20h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H17v3M3 7.5V17a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H5.5A2.5 2.5 0 0 1 3 7.5zM16 13.5h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  home: '<path d="M4 11l8-7 8 7M6 9.5V20h12V9.5"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'
};
const PLATFORMS = ['instagram', 'tiktok', 'facebook', 'x', 'youtube', 'other'];
const LABEL = { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', x: 'X', youtube: 'YouTube', other: 'Lainnya' };
function icon(n) {
  const s = document.createElement('span');
  s.className = 'ico';
  s.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${P[n] || P.other}</svg>`;
  return s;
}

const rupiah = n => 'Rp ' + new Intl.NumberFormat('id-ID').format(n);
// Harga satu baris item. Diskon dihitung per unit, lalu dikali jumlah (qty).
function calc(pkg, code = 0, qty = 1) {
  const d = pkg.discount, unit = pkg.price;
  const discUnit = !d ? 0 : d.type === 'percent' ? Math.round(unit * d.value / 100) : Math.min(d.value, unit);
  const base = unit * qty, disc = discUnit * qty;
  return { unit, discUnit, base, disc, code, total: base - disc + code };
}
// Kode unik (maks 3 digit) yang stabil untuk satu nomor pesanan (hash FNV-1a), agar transfer mudah dicocokkan.
function uniqueCode(id, min = 1, max = 999) {
  min = Math.max(1, Math.min(999, Math.round(min) || 1)); max = Math.max(min, Math.min(999, Math.round(max) || 999));
  let h = 2166136261; for (const ch of String(id)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return min + h % (max - min + 1);
}

const normWa = v => { let d = String(v).replace(/\D/g, ''); if (d.startsWith('0')) d = '62' + d.slice(1); return d; };
function validateCustomer(c, f = { wa: true, email: true }) {
  const e = {}, n = c.name.trim(), wa = f.wa ? c.wa.trim() : '', em = f.email ? c.email.trim() : '';
  if (n.length < 2 || n.length > 60) e.name = 'Nama wajib diisi (2–60 karakter).';
  if ((f.wa || f.email) && !wa && !em) e.contact = f.wa && f.email ? 'Isi WhatsApp atau Email, minimal salah satu.' : 'Kolom ini wajib diisi.';
  if (wa) { const d = normWa(wa); if (d.length < 9 || d.length > 15) e.wa = 'Nomor WhatsApp tidak valid.'; }
  if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) e.email = 'Format email tidak valid.';
  if (c.handle.trim() && !/^[\w.@-]{1,50}$/.test(c.handle.trim())) e.handle = 'Username tidak valid.';
  return e;
}

// Data contoh untuk pratinjau lokal (file://) dan demo.html.
const DEFAULTS = {
  admin: {
    brand: 'Fixs.Arts', wa: '6281234567890', email: 'admin@fixsarts.com', instagram: 'fixs.arts', tiktok: 'fixs.arts',
    note: 'Pembayaran diverifikasi manual oleh admin, maksimal 1×24 jam.',
    payments: [
      { id: 'qris', name: 'QRIS', desc: 'Scan dengan aplikasi bank atau e-wallet', type: 'image', image: 'assets/payment/qris.jpg' },
      { id: 'bank', name: 'Transfer Bank', desc: 'Transfer manual ke rekening', type: 'account', banks: [
              { id: 'bca', name: 'BCA', short: 'BCA', color: '#0060af', number: '1234567890', holder: 'Nama Pemilik (contoh)', sample: true },
        { id: 'bri', name: 'BRI', short: 'BRI', color: '#00529c', number: '2345678901', holder: 'Nama Pemilik (contoh)', sample: true },
        { id: 'mandiri', name: 'Mandiri', short: 'MDR', color: '#003d79', number: '3456789012', holder: 'Nama Pemilik (contoh)', sample: true },
        { id: 'bni', name: 'BNI', short: 'BNI', color: '#f15a23', number: '4567890123', holder: 'Nama Pemilik (contoh)', sample: true } ] }
    ]
  },
  site: { id: 'demo', name: 'Demo Store' },
  catalog: { version: 1, currency: 'IDR', products: {
    'logo-design': { name: 'Desain Logo', packages: { basic: { name: 'Basic', price: 150000 }, premium: { name: 'Premium', price: 400000, discount: { type: 'percent', value: 10, label: 'Promo Launching' } } } },
    'social-kit': { name: 'Social Media Kit', packages: { starter: { name: 'Starter', price: 250000 } } } } }
};

const merge = (a, b) => { const o = Array.isArray(a) ? [...a] : { ...a };
  for (const k in b) o[k] = b[k] && typeof b[k] === 'object' && a && a[k] && typeof a[k] === 'object' ? merge(a[k], b[k]) : b[k]; return o; };

// Semua tampilan bisa diubah lewat admin.ui (opsional). Yang tidak diisi memakai nilai ini.
const DEFAULT_UI = {
  radius: 28,
  font: "'Plus Jakarta Sans',system-ui,sans-serif",
  features: { stepper: true, themeToggle: true, contact: true, socialMedia: true, orderNumber: true, discount: true, copyAmount: true,
    channelWhatsapp: true, channelInstagram: true, channelTiktok: true, channelEmail: true, collapsibleSummary: true, animations: true, uniqueCode: true, timer: true, cart: true },
  texts: {
    step1: 'Data', step2: 'Pembayaran', step3: 'Konfirmasi',
    t1: 'Data Pembeli', s1: 'Isi data kamu agar admin bisa menghubungi dan memproses pesanan.',
    t2: 'Metode Pembayaran', s2: 'Pilih metode, lalu bayar sesuai total pesanan.',
    t3: 'Konfirmasi Pembayaran', s3: 'Bayar sesuai total di bawah, lalu kirim bukti pembayaran ke admin.',
    name: 'Nama lengkap', namePh: 'Nama kamu', contact: 'WhatsApp/Email', contactPh: '0812 3456 7890 atau nama@email.com',
    social: 'Media Sosial (Opsional)', socialPh: '@username',
    toPay: 'Lanjut ke Pembayaran', toConfirm: 'Lanjut ke Konfirmasi', back: 'Kembali', done: 'Sudah bayar, lanjut',
    payHint: 'Pilih metode pembayaran yang kamu inginkan.',
    sumTitle: 'Ringkasan Pesanan', sumSub: 'Pesanan diverifikasi manual oleh admin.', totalLabel: 'Total pembayaran',
    subtotal: 'Subtotal', discount: 'Diskon', orderNo: 'Nomor pesanan', buyer: 'Pembeli', method: 'Metode',
    footer: 'Dengan melanjutkan, kamu menyetujui bahwa pembayaran diverifikasi manual oleh admin.',
    bankHint: 'Pilih bank tujuan transfer.', errMethod: 'Pilih metode pembayaran dulu.', errBank: 'Pilih bank tujuan dulu.', payTo: 'Tujuan pembayaran', accBank: 'Bank', accNo: 'No. rekening', accHolder: 'Atas nama', save: 'Simpan gambar', confirmVia: 'Kirim bukti pembayaran via', cartTitle: 'Pesananmu', addMore: 'Tambah layanan lain', closeMore: 'Tutup daftar layanan', doneMore: 'Selesai',
    tDone: 'Pesanan Terkirim', sDone: 'Terima kasih! Admin akan memverifikasi pembayaranmu secepatnya.',
    tl1: 'Pesanan dibuat', tl2: 'Bukti pembayaran dikirim', tl3: 'Verifikasi admin', tl3d: 'Maksimal 1×24 jam. Mohon tunggu kabar dari admin.', tl4: 'Pesanan diproses', tl4d: 'Kamu akan dihubungi lewat kontak yang kamu isi.',
    backSite: 'Kembali ke website', resend: 'Kirim ulang bukti',
    uniqueCode: 'Kode unik', uniqueNote: 'Transfer tepat sampai 3 digit terakhir agar pembayaranmu mudah diverifikasi.',
    timerLabel: 'Selesaikan pembayaran dalam', expiredT: 'Waktu pembayaran habis', expiredS: 'Pesanan ini sudah kedaluwarsa. Buat pesanan baru untuk melanjutkan.', newOrder: 'Buat pesanan baru',
    accLink: 'Link pembayaran', openLink: 'Buka tautan pembayaran', approx: 'Perkiraan', usdNote: 'Nominal USD hanya perkiraan karena PayPal tidak menerima Rupiah.',
    trust: 'Datamu hanya dikirim ke admin untuk memproses pesanan.'
  },
  colors: {
    dark: { bg: '#050505', panel: '#0c0c0d', side: '#171718', ink: '#f4f4f5', mut: '#85858d', ac: '#3b82f6', onac: '#ffffff', bd: '#27272b', fld: '#171718' },
    light: { bg: '#e9e9ec', panel: '#ffffff', side: '#f4f4f6', ink: '#16161a', mut: '#74747c', ac: '#2563eb', onac: '#ffffff', bd: '#e2e2e7', fld: '#f2f2f5' }
  }
};


const ID = /^[a-z0-9-]{1,40}$/;
const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

async function fetchJson(url, ms = 8000) {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctl.signal, cache: 'no-cache', credentials: 'omit' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } catch (e) { throw new Error(e.name === 'AbortError' ? 'Waktu habis saat memuat data.' : 'Gagal memuat data: ' + e.message); }
  finally { clearTimeout(t); }
}

function validateCatalog(c) {
  const bad = m => { throw new Error('Katalog tidak valid: ' + m); };
  if (!c || typeof c !== 'object' || c.currency !== 'IDR' || !c.products || typeof c.products !== 'object') bad('format');
  for (const [pid, p] of Object.entries(c.products)) {
    if (!ID.test(pid) || typeof p.name !== 'string' || !p.packages) bad('produk ' + pid);
    for (const [kid, k] of Object.entries(p.packages)) {
      if (!ID.test(kid) || typeof k.name !== 'string' || !Number.isInteger(k.price) || k.price < 0) bad(`paket ${pid}/${kid}`);
      if (k.maxQty !== undefined && (!Number.isInteger(k.maxQty) || k.maxQty < 1 || k.maxQty > 99)) bad(`maxQty ${pid}/${kid}`);
      const d = k.discount;
      if (d && (!['percent', 'amount'].includes(d.type) || !Number.isInteger(d.value) || d.value < 0 ||
        (d.type === 'percent' && d.value > 100) || (d.type === 'amount' && d.value > k.price))) bad(`diskon ${pid}/${kid}`);
    }
  }
  return c;
}

// Katalog hanya boleh berasal dari:
// (1) nama terdaftar di config/sites.json ("sites"). "catalog" boleh path relatif (di repo checkout) atau URL penuh
//     yang origin-nya ada di "allowedOrigins", atau
// (2) alamat halaman website dengan origin yang ada di "allowedOrigins". Folder di alamat itu boleh BERSARANG
//     (mis. /home/Section/Jadwal%20Kerja/). Katalog dicari dari folder paling dalam naik ke folder induk,
//     dan yang pertama ketemu dipakai:  <folder>/data/products.json, lalu <folder>/products.json.
const SEG = /^[\w.\- ()]{1,80}$/, FILE = /\.[a-z][a-z0-9]{0,4}$/i, MAX_DEPTH = 6;
function sitePath(u) {
  const bad = () => { throw new Error('Alamat website tidak valid.'); };
  const segs = u.pathname.split('/').filter(Boolean).map(x => { let d; try { d = decodeURIComponent(x); } catch { bad(); } return d; });
  if (segs.length && FILE.test(segs[segs.length - 1])) segs.pop(); // alamat halaman (…/index.html) -> foldernya
  if (segs.length > MAX_DEPTH || segs.some(d => d === '.' || d === '..' || !SEG.test(d))) bad();
  return segs;
}
const catalogCandidates = (origin, segs) => {
  const out = [];
  for (let k = segs.length; k >= 0; k--) {
    const dir = origin + segs.slice(0, k).map(x => '/' + encodeURIComponent(x)).join('');
    out.push(dir + '/data/products.json', dir + '/products.json');
  }
  return out;
};
const httpsOrLocal = url => url.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(url.hostname);

async function loadCatalog(siteParam) {
  const cfg = await fetchJson('config/sites.json'), allowed = Array.isArray(cfg.allowedOrigins) ? cfg.allowedOrigins : [];
  let id, name, catalog, home = '';
  if (ID.test(siteParam || '')) {
    if (!own(cfg.sites || {}, siteParam)) throw new Error('Website belum terdaftar di Fixs.Arts Checkout.');
    const s = cfg.sites[siteParam]; id = siteParam; name = String(s.name || siteParam);
    const url = new URL(s.catalog, location.href);
    if (url.origin !== location.origin && !allowed.includes(url.origin)) throw new Error('Alamat katalog tidak diizinkan.');
    if (!httpsOrLocal(url)) throw new Error('Alamat katalog harus HTTPS.');
    catalog = validateCatalog(await fetchJson(url.href));
  } else {
    let u; try { u = new URL(siteParam); } catch { throw new Error('Alamat website tidak valid.'); }
    if (!allowed.includes(u.origin)) throw new Error('Website belum terdaftar di Fixs.Arts Checkout.');
    if (!httpsOrLocal(u)) throw new Error('Alamat katalog harus HTTPS.');
    const segs = sitePath(u), cands = catalogCandidates(u.origin, segs);
    id = name = u.host + segs.map(x => '/' + x).join(''); home = u.origin + segs.map(x => '/' + encodeURIComponent(x)).join('') + '/';
    const res = await Promise.allSettled(cands.map(c => fetchJson(c))), i = res.findIndex(r => r.status === 'fulfilled');
    if (i < 0) throw new Error('Katalog produk tidak ditemukan. Taruh data/products.json (atau products.json) di folder halaman penjualan atau folder induknya.');
    try { catalog = validateCatalog(res[i].value); } catch (e) { throw new Error(e.message + ' (file: ' + cands[i].replace(u.origin, '') + ')'); }
  }
  if (typeof catalog.siteName === 'string' && catalog.siteName.trim()) name = catalog.siteName.trim().slice(0, 60);
  return { site: { id, name }, catalog, origins: allowed, home };
}
// Alamat "kembali ke website" hanya boleh ke origin yang terdaftar (mencegah open redirect).
function safeReturn(ret, origins = []) {
  try { const u = new URL(ret); return origins.includes(u.origin) && (u.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(u.hostname)) ? u.href : null; } catch { return null; }
}

const newId = () => {
  const d = new Date(), a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = crypto.getRandomValues(new Uint8Array(5));
  const ymd = String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
  return `FA-${ymd}-${[...r].map(x => a[x % a.length]).join('')}`;
};
const orderKey = (site, sig) => `fa-order:${site.id}:${sig}`;
const stableId = key => { try { return sessionStorage.getItem(key) || (sessionStorage.setItem(key, newId()), sessionStorage.getItem(key)); } catch { return newId(); } };

// ---- Keranjang (beberapa item dalam satu pesanan) ----
const MAX_LINES = 20, MAX_QTY = 99;
const maxQtyOf = k => Math.min(MAX_QTY, Math.max(1, Math.round(+k.maxQty) || 1));   // bawaan 1 = satu unit per paket
// "pid:kid:qty,pid:kid:qty" -> [{pid,kid,qty}] (ID divalidasi, duplikat digabung, jumlah dibatasi)
function parseItems(str) {
  const out = [];
  for (const part of String(str || '').split(',')) {
    const [pid, kid, q] = part.trim().split(':');
    if (!ID.test(pid || '') || !ID.test(kid || '')) continue;
    const qty = Math.min(MAX_QTY, Math.max(1, parseInt(q, 10) || 1)), hit = out.find(x => x.pid === pid && x.kid === kid);
    if (hit) hit.qty = Math.min(MAX_QTY, hit.qty + qty); else if (out.length < MAX_LINES) out.push({ pid, kid, qty });
  }
  return out;
}
// Item awal dari URL: ?items=a:b:2,c:d  atau bentuk lama ?product=a&package=b
function entryOf(q) {
  let items = parseItems(q.get('items'));
  if (!items.length && q.get('product') && q.get('package')) items = parseItems(`${q.get('product')}:${q.get('package')}:1`);
  return { items, sig: items.map(i => `${i.pid}.${i.kid}.${i.qty}`).join(',') };
}
// Harga SELALU dihitung dari katalog, tidak ada angka dari URL. Item yang tidak ada di katalog dibuang.
function priceOrder(catalog, items, admin, id) {
  const lines = [], kept = [];
  for (const it of items || []) {
    const p = ID.test(it.pid || '') && own(catalog.products, it.pid) && catalog.products[it.pid];
    const k = p && ID.test(it.kid || '') && own(p.packages, it.kid) && p.packages[it.kid];
    if (!k) continue;
    const mq = maxQtyOf(k), qty = Math.min(mq, Math.max(1, Math.round(+it.qty) || 1)), base = `catalog.products.${it.pid}`, c = calc(k, 0, qty);
    lines.push({ pid: it.pid, kid: it.kid, qty,
      product: { id: it.pid, name: p.name, path: base + '.name' },
      pkg: { id: it.kid, name: k.name, path: `${base}.packages.${it.kid}.name`, pp: `${base}.packages.${it.kid}`, discount: k.discount, maxQty: mq },
      unit: c.unit, discUnit: c.discUnit, base: c.base, disc: c.disc, total: c.base - c.disc });
    kept.push({ pid: it.pid, kid: it.kid, qty });
  }
  const sum = f => lines.reduce((s, l) => s + l[f], 0), r = admin?.uniqueCode || {}, base = sum('base'), disc = sum('disc');
  const code = lines.length && admin && admin.ui?.features?.uniqueCode !== false ? uniqueCode(id, +r.min || 1, +r.max || 999) : 0;
  return { items: kept, lines, pricing: { base, disc, code, total: base - disc + code, count: sum('qty') } };
}
// Hitung ulang harga setelah isi keranjang berubah.
function refresh(o, catalog, admin) {
  const r = priceOrder(catalog, o.state.items, admin, o.id);
  if (!r.lines.length) throw new Error('Produk atau paket tidak ditemukan di katalog website.');
  Object.assign(o, r); o.state.items = r.items; return o;
}
function buildOrder(site, catalog, entry, prev = {}, admin = null) {
  const id = prev.id || stableId(orderKey(site, entry.sig)), state = prev.state || { step: 0, method: null };
  if (state.sig !== entry.sig) { state.sig = entry.sig; state.items = entry.items.map(i => ({ ...i })); }
  return refresh({ id, site, state, customer: prev.customer || { name: '', wa: '', email: '', platform: 'instagram', handle: '' } }, catalog, admin);
}



const q = encodeURIComponent, dg = s => String(s).replace(/\D/g, '');

function buildMessage(o, a, pay = '') {
  const c = o.customer, p = o.pricing;
  return ['Halo Admin ' + a.brand + ', saya sudah melakukan pembayaran.', '',
    `No. Pesanan: ${o.id}`, `Website: ${o.site.name === o.site.id ? o.site.id : o.site.name + ' (' + o.site.id + ')'}`,
    'Pesanan:', ...o.lines.map((l, i) => `${i + 1}. ${l.product.name} · ${l.pkg.name}${l.qty > 1 ? ' ×' + l.qty : ''} = ${rupiah(l.base)} [${l.pid}/${l.kid}]`),
    `Subtotal: ${rupiah(p.base)}`, p.disc > 0 ? `Diskon: -${rupiah(p.disc)}` : null, p.code > 0 ? `Kode unik: ${rupiah(p.code)}` : null, `Total Bayar: ${rupiah(p.total)}`, pay ? `Metode: ${pay}` : null, '',
    `Nama: ${c.name.trim() || '-'}`,
    c.wa.trim() ? `WhatsApp: ${c.wa.trim()}` : null,
    c.email.trim() ? `Email: ${c.email.trim()}` : null,
    c.handle.trim() ? `${LABEL[c.platform]}: ${c.handle.trim()}` : null,
    '', 'Bukti transfer saya lampirkan. Mohon diverifikasi, terima kasih.'
  ].filter(x => x !== null).join('\n');
}

const channels = a => [
  { id: 'whatsapp', label: 'WhatsApp', url: m => `https://wa.me/${dg(a.wa)}?text=${q(m)}` },
  { id: 'instagram', label: 'Instagram', copy: true, url: () => `https://ig.me/m/${q(a.instagram)}` },
  { id: 'tiktok', label: 'TikTok', copy: true, url: () => `https://www.tiktok.com/@${q(a.tiktok)}` },
  { id: 'email', label: 'Email', url: (m, o) => `mailto:${a.email}?subject=${q('Konfirmasi Pembayaran ' + o.id)}&body=${q(m)}` }
];
async function copy(t) { try { await navigator.clipboard.writeText(t); return true; } catch { return false; } }
const go = u => u.startsWith('mailto:') ? (location.href = u) : window.open(u, '_blank', 'noopener');

// Pencatatan pesanan ke Google Sheets lewat Google Apps Script (gratis, tanpa API key berbayar).
// Pengaturan: admin.sheets = { enabled: true, url: "https://script.google.com/macros/s/.../exec" }
// Pengiriman memakai sendBeacon / fetch no-cors (permintaan sederhana, tanpa preflight CORS), jadi tetap terkirim
// walau halaman langsung berpindah ke WhatsApp. Respons tidak bisa dibaca; ini murni catatan, bukan bukti pembayaran.
function sheetsPayload(ev, { order: o, method = '', bank = '', via = '' }) {
  const c = o.customer, S = o.state;
  return { v: 1, event: ev, orderId: o.id, site: o.site.id, siteName: o.site.name, created: S.created || Date.now(), ts: Date.now(),
    customer: { name: c.name.trim(), contact: (c.wa || c.email || '').trim(), social: c.handle.trim() ? c.platform + ': ' + c.handle.trim() : '' },
    items: o.lines.map(l => ({ pid: l.pid, kid: l.kid, name: l.product.name, pkg: l.pkg.name, qty: l.qty, unit: l.unit, disc: l.disc, total: l.total })),
    pricing: { base: o.pricing.base, disc: o.pricing.disc, code: o.pricing.code, total: o.pricing.total },
    payment: { method, bank }, via };
}
function sheetsSend(a, payload) {
  const u = a?.sheets?.url;
  if (!u || a.sheets.enabled === false || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(u)) return false;
  const body = JSON.stringify(payload);
  try { if (navigator.sendBeacon && navigator.sendBeacon(u, new Blob([body], { type: 'text/plain;charset=UTF-8' }))) return true; } catch {}
  try { fetch(u, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body }).catch(() => {}); return true; } catch { return false; }
}








const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const ed = (e, path) => { if (path) e.dataset.path = path; return e; };
const iconBtn = (name, label, fn, cls = '') => {
  const b = el('button', 'icon-btn ' + cls); b.type = 'button'; b.setAttribute('aria-label', label); b.append(icon(name));
  b.onclick = name !== 'copy' ? fn : async e => { await fn(e); const first = b.firstChild; b.classList.add('ok'); b.replaceChildren(icon('check')); setTimeout(() => { b.classList.remove('ok'); b.replaceChildren(first); }, 1400); };
  return b;
};
const FEAT = { whatsapp: 'channelWhatsapp', instagram: 'channelInstagram', tiktok: 'channelTiktok', email: 'channelEmail' };

function renderError(root, title, msg) {
  root.replaceChildren();
  const s = el('div', 'glass state'); s.append(el('h2', '', title), el('p', '', msg));
  const a = el('a', 'btn', 'Buka demo'); a.href = 'demo.html'; s.append(a); root.append(s);
}

function applyUi(root, ui) {
  const pal = ui.colors[document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'] || {};
  for (const k in pal) root.style.setProperty('--' + k, pal[k]);
  root.style.setProperty('--r', (+ui.radius || 0) + 'px'); root.style.setProperty('--font', ui.font);
  root.classList.toggle('noanim', !ui.features.animations);
}

// Daftar bank untuk metode transfer. Format lama (bank/number/holder langsung di metode) tetap didukung.
// Bank bertanda sample:true hanya tampil di demo/pratinjau lokal, tidak pernah di halaman checkout asli.
const banksOf = (m, sample) => (m.banks?.length ? m.banks.map((b, j) => ({ ...b, j })) : m.number ? [{ id: m.id, name: m.bank || m.name, number: m.number, holder: m.holder, j: -1 }] : [])
  .filter(b => !b.hidden && (sample || ((b.number || b.url) && !b.sample)));
const shapeCls = b => b.shape === 'circle' ? ' circle' : b.shape === 'square' ? ' square' : '';
const monogram = b => {
  const s = el('span', 'blogo mono' + shapeCls(b), (b.short || b.name || '?').slice(0, 3).toUpperCase());
  if (b.color) s.style.background = b.color; if (b.textColor) s.style.color = b.textColor; return s;
};
// Logo yang diunggah memenuhi badge dengan latar transparan. Latar bantuan (logoBg) dan bentuk (shape) bersifat opsional.
const bankLogo = b => {
  if (!b.logo) return monogram(b);
  const sh = b.shape || (b.logoBg ? 'rounded' : 'none'), w = el('span', 'blogo logo' + (b.logoBg ? ' bg' : '') + (sh === 'none' ? ' raw' : shapeCls({ shape: sh }))), i = el('img');
  if (b.logoBg) w.style.background = b.logoBgColor || '#ffffff';
  i.alt = ''; i.src = b.logo; i.onerror = () => w.replaceWith(monogram(b)); w.append(i); return w;
};

// Lightbox gambar: latar buram, tutup dengan klik di mana saja, tombol silang, atau Esc.
const zoomImg = (src, alt) => {
  const ov = el('div', 'ov zoom'), im = el('img'), x = el('button', 'zclose', '×'), keep = document.body.style.overflow;
  ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); im.src = src; im.alt = alt || ''; x.type = 'button'; x.setAttribute('aria-label', 'Tutup');
  const key = e => { if (e.key === 'Escape') close(); };
  const close = () => { document.removeEventListener('keydown', key); document.body.style.overflow = keep; ov.classList.add('out'); setTimeout(() => ov.remove(), 180); };
  ov.onclick = close; document.addEventListener('keydown', key); document.body.style.overflow = 'hidden';
  ov.append(im, x); document.body.append(ov); x.focus();
};

function render(root, args) {
  const { order: o, admin: a, demo = false, toast = () => {}, showSamples = false, onChange = () => {}, onFinish = () => {}, onRestart = null, returnUrl = null, catalog = null, onEvent = () => {} } = args;
  clearInterval(root._faTick);
  const ui = merge(DEFAULT_UI, a.ui || {}), T = ui.texts, F = ui.features, S = o.state, c = o.customer, p = o.pricing, errs = {};
  const tp = 'admin.ui.texts.', redraw = () => render(root, args);
  const tx = (k, tag = 'span', cls) => ed(el(tag, cls, T[k]), tp + k);
  S.created = S.created || Date.now();
  const save = () => { if (!demo) onChange(o); }, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Catat peristiwa pesanan (Google Sheets). Setiap peristiwa dikirim sekali per kombinasi data yang sama.
  const emit = ev => {
    if (demo) return; S.logged = S.logged || {};
    const key = [ev, S.method, S.bank, p.total, S.sentVia].join('|'); if (S.logged[ev] === key) return; S.logged[ev] = key;
    onEvent(ev, { order: o, method: curM()?.name || '', bank: curB()?.name || '', via: S.sentVia || '' });
  };
  // Ubah isi keranjang -> hitung ulang harga; timer dimulai ulang karena total berubah.
  const editCart = fn => { fn(); refresh(o, catalog, a); S.payStart = null; S.anim = false; redraw(); };
  const to = n => { S.done = false; S.step = n; S.anim = true; redraw(); if (!demo) window.scrollTo({ top: 0, behavior: 'smooth' }); };
  root.replaceChildren(); root.classList.add('fa'); root.classList.toggle('demo', demo); applyUi(root, ui);
  const sample = demo || showSamples, pays = a.payments || [];
  const curM = () => pays.find(x => x.id === S.method);
  const curB = () => { const m = curM(); return m && m.type === 'account' ? banksOf(m, sample).find(x => x.id === S.bank) : null; };
  const payLabel = () => { const m = curM(), b = curB(); return m ? (b ? m.name + ' ' + b.name : m.name) : ''; };
  let syncBuyer = () => {}, syncPay = () => {};
  if (demo && S.step === 2 && !S.method && pays.length) S.method = pays[0].id;
  if (demo && S.step === 2 && curM()?.type === 'account' && !curB()) S.bank = banksOf(curM(), sample)[0]?.id;

  // ---- panel kiri ----
  const left = el('main', 'left'), top = el('header', 'top'), tb = el('button', 'icon-btn'); tb.type = 'button'; tb.setAttribute('aria-label', 'Ganti tema');
  const sync = () => tb.replaceChildren(icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon'));
  sync(); tb.onclick = () => { toggleTheme(); applyUi(root, ui); sync(); };
  top.append(ed(el('div', 'brand', a.brand), 'admin.brand')); if (F.themeToggle) top.append(tb);
  left.append(top);
  if (F.stepper) {
    const st = el('nav', 'steps'), cs = S.done ? 3 : S.step;
    [1, 2, 3].forEach((n, i) => {
      const it = el('div', 'st' + (i === cs ? ' cur' : i < cs ? ' done' : '')); it.append(tx('step' + n));
      it.onclick = e => { if ((demo || (i < cs && !S.done)) && !e.target.isContentEditable) to(i); }; st.append(it);
      if (i < 2) st.append(el('i', 'ln' + (i < cs ? ' on' : '')));
    });
    left.append(st);
  }
  const entering = S.anim, box = el('div', 'stepbox' + (entering ? ' in' : '')); S.anim = false;
  const dur = (+a.timer?.minutes > 0 ? +a.timer.minutes : 1440) * 60000;
  if (F.timer && S.step === 2 && !S.done) S.payStart = S.payStart || Date.now();
  const expired = !!(F.timer && S.step === 2 && !S.done && S.payStart && S.payStart + dur - Date.now() <= 0);
  const hk = S.done ? ['tDone', 'sDone'] : expired ? ['expiredT', 'expiredS'] : ['t' + (S.step + 1), 's' + (S.step + 1)];
  box.append(tx(hk[0], 'h1'), tx(hk[1], 'p', 'sub'));
  const back = n => { const b = el('button', 'btn ghost'); b.type = 'button'; b.append(tx('back')); b.onclick = e => { if (!e.target.isContentEditable) to(n); }; return b; };
  const primary = (k, fn) => { const b = el('button', 'btn pri'); b.type = 'button'; b.append(tx(k)); b.onclick = e => { if (e.target.isContentEditable) { e.preventDefault(); return; } fn(); }; return b; };

  // Input dengan placeholder yang bisa diedit langsung di demo (overlay saat mode edit)
  const inp = (key, type, phKey, auto, labelKey, val, onin) => {
    const w = el('div', 'fld'), iw = el('div', 'iw'), i = el('input'), er = el('small', 'err'), ph = ed(el('span', 'phx', T[phKey]), tp + phKey);
    i.type = type; i.value = val; i.placeholder = T[phKey]; i.autocomplete = auto; i.maxLength = 80; i.setAttribute('aria-label', T[labelKey] || T[phKey]);
    const sp = () => { ph.className = 'phx' + (i.value ? ' off' : ''); }; sp();
    i.oninput = () => { onin(i.value); sp(); save(); }; errs[key] = er; iw.append(i, ph);
    if (labelKey) w.append(tx(labelKey, 'span', 'lb')); w.append(iw, er); return w;
  };
  const validate = () => {
    const e = validateCustomer(c, { wa: F.contact, email: F.contact }); Object.values(errs).forEach(x => x.textContent = '');
    if (errs.name && e.name) errs.name.textContent = e.name;
    const cm = e.contact || e.wa || e.email; if (errs.contact && cm) errs.contact.textContent = cm;
    if (errs.handle && e.handle) { errs.handle.textContent = e.handle; S.socialOpen = true; box.querySelector('.acc')?.classList.add('open'); }
    const bad = box.querySelector('.err:not(:empty)'); if (bad) bad.parentElement.querySelector('input')?.focus(); return !Object.keys(e).length;
  };

  if (S.step === 0) {
    // ---- Keranjang: ubah jumlah, hapus, atau tambah layanan lain ----
    const all = catalog ? Object.entries(catalog.products).flatMap(([pid, pr]) => Object.entries(pr.packages).filter(([, k]) => !k.noAdd).map(([kid, k]) => ({ pid, kid, pr, k }))) : [];
    const inCart = (pid, kid) => S.items.find(i => i.pid === pid && i.kid === kid), canAdd = x => { const it = inCart(x.pid, x.kid); return it ? it.qty < maxQtyOf(x.k) : S.items.length < MAX_LINES; };
    if (F.cart !== false && catalog && (o.lines.length > 1 || o.lines.some(l => l.pkg.maxQty > 1) || all.some(canAdd))) {
      const cart = el('section', 'cart'), hd = el('div', 'cart-h'), list = el('div', 'cart-l');
      hd.append(tx('cartTitle', 'span', 'lb'), el('small', '', p.count + ' item'));
      const priceOf = (unit, du) => { const w = el('span', 'ci-p'); if (du) w.append(el('s', '', rupiah(unit)), ' ' + rupiah(unit - du)); else w.textContent = rupiah(unit); return w; };
      const qb = (t, label, fn, off) => { const b = el('button', 'qb', t); b.type = 'button'; b.setAttribute('aria-label', label); b.disabled = !!off; b.onclick = fn; return b; };
      o.lines.forEach(l => {
        const it = el('div', 'ci'), info = el('div', 'ci-i'), nm = el('strong'), sm = el('small'), ctl = el('div', 'ci-c');
        nm.append(ed(el('span', '', l.product.name), l.product.path), ' · ', ed(el('span', '', l.pkg.name), l.pkg.path));
        sm.append(priceOf(l.unit, l.discUnit), l.qty > 1 ? ' × ' + l.qty : ''); info.append(nm, sm);
        if (l.pkg.maxQty > 1) ctl.append(qb('−', 'Kurangi jumlah', () => editCart(() => { inCart(l.pid, l.kid).qty--; }), l.qty <= 1), el('span', 'qn', String(l.qty)), qb('+', 'Tambah jumlah', () => editCart(() => { inCart(l.pid, l.kid).qty++; }), l.qty >= l.pkg.maxQty));
        ctl.append(el('b', 'ci-t', rupiah(l.total)));
        const rm = iconBtn('trash', 'Hapus dari pesanan', () => editCart(() => { S.items = S.items.filter(i => !(i.pid === l.pid && i.kid === l.kid)); }), 'sm'); rm.disabled = o.lines.length < 2; if (rm.disabled) rm.classList.add('off');
        it.append(info, ctl, rm); list.append(it);
      });
      cart.append(hd, list);
      if (all.some(canAdd)) {
        const add = el('button', 'addi'), pk = el('div', 'picker' + (S.pickerOpen ? ' open' : '')), lb = el('span', '', S.pickerOpen ? T.closeMore : T.addMore); add.type = 'button'; add.append(icon('plus'), lb);
        // Buka/tutup daftar: label berganti jadi "Tutup daftar layanan", ikon + berputar jadi ×, dan ada tombol "Selesai" di dasar daftar.
        const setOpen = v => { S.pickerOpen = v; pk.classList.toggle('open', v); add.classList.toggle('on', v); add.setAttribute('aria-expanded', v); lb.textContent = v ? T.closeMore : T.addMore; };
        setOpen(!!S.pickerOpen); add.onclick = () => setOpen(!S.pickerOpen);
        pk.onkeydown = e => { if (e.key === 'Escape') { setOpen(false); add.focus(); } };
        const groups = {}; all.forEach(x => (groups[x.pid] = groups[x.pid] || { pr: x.pr, rows: [] }).rows.push(x));
        Object.values(groups).forEach(g => {
          pk.append(el('div', 'pg', g.pr.name));
          g.rows.forEach(x => {
            const r = el('div', 'pr'), t = el('span', 'pt'), d = x.k.discount ? (x.k.discount.type === 'percent' ? Math.round(x.k.price * x.k.discount.value / 100) : Math.min(x.k.discount.value, x.k.price)) : 0;
            t.append(el('span', '', x.k.name), priceOf(x.k.price, d));
            const b = el('button', 'pa'); b.type = 'button'; const full = !canAdd(x); b.disabled = full; b.textContent = full ? 'Maks' : inCart(x.pid, x.kid) ? '+1' : 'Tambah';
            b.onclick = () => editCart(() => { const it = inCart(x.pid, x.kid); if (it) it.qty++; else S.items.push({ pid: x.pid, kid: x.kid, qty: 1 }); });
            r.append(t, b); pk.append(r);
          });
        });
        const done = el('button', 'pdone', T.doneMore); done.type = 'button'; done.onclick = () => { setOpen(false); add.focus(); add.scrollIntoView({ block: 'nearest', behavior: still ? 'auto' : 'smooth' }); }; pk.append(done);
        cart.append(add, pk);
      }
      box.append(cart);
    }
    const f = el('form'); f.noValidate = true; f.onsubmit = e => { e.preventDefault(); if (demo) return to(1); if (validate()) { emit('data'); to(1); } else toast('Lengkapi data dulu.'); };
    f.append(inp('name', 'text', 'namePh', 'name', 'name', c.name, v => { c.name = v; syncBuyer(); }));
    if (F.contact) f.append(inp('contact', 'text', 'contactPh', 'off', 'contact', c.email || c.wa, v => { if (v.includes('@')) { c.email = v; c.wa = ''; } else { c.wa = v; c.email = ''; } }));
    if (F.socialMedia) {
      const acc = el('div', 'acc' + (S.socialOpen ? ' open' : '')), hd = el('div', 'acc-h'), bd = el('div', 'acc-b'), inner = el('div', 'acc-i');
      hd.tabIndex = 0; hd.setAttribute('role', 'button'); hd.append(tx('social', 'span', 'lb'), icon('chev'));
      const tgl = e => { if (e.target.isContentEditable) return; acc.classList.toggle('open'); S.socialOpen = acc.classList.contains('open'); };
      hd.onclick = tgl; hd.onkeydown = e => { if (e.key === 'Enter') tgl(e); };
      const pf = el('div', 'pf'), draw = () => { pf.replaceChildren(); PLATFORMS.forEach(k => {
        const b = el('button', 'pi' + (c.platform === k ? ' on' : '')); b.type = 'button'; b.title = LABEL[k]; b.setAttribute('aria-label', LABEL[k]); b.append(icon(k));
        b.onclick = () => { c.platform = k; draw(); }; pf.append(b); }); };
      draw(); inner.append(inp('handle', 'text', 'socialPh', 'off', null, c.handle, v => { c.handle = v; }), pf); bd.append(inner); acc.append(hd, bd); f.append(acc);
    }
    const sub = primary('toPay', () => {}), trust = el('p', 'trust'); sub.type = 'submit'; trust.append(icon('lock'), tx('trust')); f.append(sub, trust); box.append(f);
  } else if (S.step === 1) {
    box.append(tx('payHint', 'p', 'hint'));
    const list = el('div', 'methods'), er = el('small', 'err merr'); er.setAttribute('role', 'alert');
    pays.forEach((m, i) => {
      const wrap = el('div', 'mwrap'), b = el('div', 'method' + (S.method === m.id ? ' sel' : '')); b.tabIndex = 0; b.setAttribute('role', 'button'); b.setAttribute('aria-pressed', S.method === m.id);
      const t = el('span', 'mt'); t.append(ed(el('strong', '', m.name), `admin.payments.${i}.name`), ed(el('small', '', m.desc || ''), `admin.payments.${i}.desc`));
      b.append(icon(m.icon || (m.type === 'account' ? 'bank' : 'qris')), t, el('span', 'dot'));
      const pick = e => {
        if (e.target.isContentEditable || S.method === m.id) return;
        S.method = m.id; S.bank = null; S.anim = false;
        const bs = m.type === 'account' ? banksOf(m, sample) : []; if (bs.length === 1) S.bank = bs[0].id; S.reveal = bs.length > 0; redraw();
      };
      b.onclick = pick; b.onkeydown = e => { if (e.key === 'Enter') pick(e); }; wrap.append(b);
      if (S.method === m.id && m.type === 'account') {
        const bs = banksOf(m, sample), bp = el('div', 'banks' + (S.reveal ? ' in' : '')), g = el('div', 'bgrid'); S.reveal = false;
        bp.append(m.pickHint ? ed(el('p', 'bhint', m.pickHint), `admin.payments.${i}.pickHint`) : tx('bankHint', 'p', 'bhint'));
        bs.forEach(bk => {
          const t2 = el('div', 'bank' + (S.bank === bk.id ? ' sel' : '')), nm = el('span', 'bn'); t2.tabIndex = 0; t2.setAttribute('role', 'button'); t2.setAttribute('aria-pressed', S.bank === bk.id);
          const nn = el('span', '', bk.name); if (bk.j >= 0) ed(nn, `admin.payments.${i}.banks.${bk.j}.name`); nm.append(nn); if (bk.sample) nm.append(el('small', '', 'contoh'));
          t2.append(bankLogo(bk), nm, el('span', 'dot'));
          const sel = e => {
            if (e.target.isContentEditable) return; S.bank = bk.id; er.textContent = ''; save();
            g.querySelectorAll('.bank').forEach(x => { x.classList.toggle('sel', x === t2); x.setAttribute('aria-pressed', x === t2); }); syncPay();
          };
          t2.onclick = sel; t2.onkeydown = e => { if (e.key === 'Enter') sel(e); }; g.append(t2);
        });
        if (!bs.length) g.append(el('p', 'hint', 'Belum ada rekening bank yang diatur.'));
        bp.append(g); wrap.append(bp);
      }
      list.append(wrap);
    });
    const next = () => {
      const m = curM(), fail = msg => { er.textContent = msg; toast(msg); };
      if (demo) return to(2);
      if (!m) return fail(T.errMethod);
      if (m.type === 'account' && !curB()) return fail(T.errBank);
      to(2);
    };
    box.append(list, er, primary('toConfirm', next), back(0));
  } else if (S.done) {
    // ---- Halaman sukses + timeline ----
    const mk = el('div', 'okmark'); mk.append(icon('check')); box.prepend(mk);
    const fmt = t => t ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(t) : '';
    const tl = el('ol', 'tl');
    [['tl1', 'done', fmt(S.created)], ['tl2', 'done', (S.sentVia ? 'Lewat ' + S.sentVia + ' · ' : '') + fmt(S.sentAt)], ['tl3', 'cur', T.tl3d, 'tl3d'], ['tl4', 'todo', T.tl4d, 'tl4d']].forEach(([k, st, d, dk], i) => {
      const li = el('li', 'tli ' + st), dot = el('span', 'tdot'), tt = el('div', 'tt'), sm = el('small', '', d); li.style.setProperty('--i', i);
      if (st === 'done') dot.append(icon('check')); if (dk) ed(sm, tp + dk); tt.append(tx(k, 'strong'), sm); li.append(dot, tt); tl.append(li);
    });
    const rc = el('div', 'recap'), rw = (k, v) => { const r = el('div', 'row'); r.append(k, el('span', 'v', v)); rc.append(r); };
    o.lines.forEach(l => rw(l.product.name + ' · ' + l.pkg.name + (l.qty > 1 ? ' ×' + l.qty : ''), rupiah(l.total)));
    if (F.orderNumber) rw(tx('orderNo', 'span', 'k'), o.id);
    rw(tx('buyer', 'span', 'k'), c.name.trim() || '-'); rw(tx('totalLabel', 'span', 'k'), rupiah(p.total));
    const acts = el('div', 'acts');
    if (returnUrl || demo || showSamples) {
      const bk = returnUrl ? el('a', 'btn pri') : el('button', 'btn pri'); if (returnUrl) { try { const u = new URL(returnUrl); u.searchParams.set('fa_paid', o.id); bk.href = u.href; } catch { bk.href = returnUrl; } } else bk.type = 'button';
      bk.append(icon('home'), tx('backSite'));
      bk.onclick = e => { if (e.target.isContentEditable) { e.preventDefault(); return; } if (demo || !returnUrl) { e.preventDefault(); toast('Demo: kembali ke website.'); return; } onFinish(); };
      acts.append(bk);
    }
    const rs = el('button', 'btn ghost'); rs.type = 'button'; rs.append(tx('resend')); rs.onclick = e => { if (!e.target.isContentEditable) to(2); }; acts.append(rs);
    box.append(tl, rc, acts);
  } else if (expired) {
    // ---- Waktu pembayaran habis ----
    const ex = el('div', 'okmark exp'); ex.append(icon('clock')); box.prepend(ex); emit('kedaluwarsa');
    box.append(primary('newOrder', () => { if (onRestart) onRestart(); else { S.payStart = null; to(0); } }));
  } else {
    const m = curM(), bk = curB(), pay = payLabel(); emit('bayar');
    // 1) Total (dengan kode unik, timer, dan tombol salin)
    const hero = el('div', 'paytotal'), amt = el('div', 'amt'), big = el('b'); let tbar = null;
    if (F.timer) {
      const tr = el('div', 'timer'), tv = el('b', 'tv'), fill = el('i'); tbar = el('span', 'tbar'); tbar.append(fill);
      tr.append(icon('clock'), tx('timerLabel', 'span', 'tlb'), tv); hero.append(tr);
      const tick = () => {
        const r = S.payStart + dur - Date.now(); if (r <= 0) { clearInterval(root._faTick); return redraw(); }
        const s2 = Math.ceil(r / 1000); tv.textContent = [Math.floor(s2 / 3600), Math.floor(s2 % 3600 / 60), s2 % 60].map(x => String(x).padStart(2, '0')).join(':');
        fill.style.transform = `scaleX(${r / dur})`; hero.classList.toggle('warn', r < 600000);
      };
      tick(); root._faTick = setInterval(tick, 1000);
    }
    const fmtAmt = v => { const s2 = rupiah(v); big.replaceChildren(); if (p.code && v === p.total) big.append(s2.slice(0, -3), el('span', 'uc', s2.slice(-3))); else big.textContent = s2; };
    const counting = entering && !still && !root.classList.contains('noanim'); fmtAmt(counting ? 0 : p.total);
    if (counting) { const t0 = performance.now(), run = now => { const k = Math.min(1, (now - t0) / 800); fmtAmt(Math.round(p.total * (1 - Math.pow(1 - k, 3)))); if (k < 1 && big.isConnected) requestAnimationFrame(run); }; requestAnimationFrame(run); }
    amt.append(big);
    if (F.copyAmount) amt.append(iconBtn('copy', 'Salin nominal', async () => toast(await copy(String(p.total)) ? 'Nominal disalin.' : 'Gagal menyalin.'), 'sm'));
    hero.append(tx('totalLabel', 'span', 'k'), amt);
    if (p.code > 0) hero.append(tx('uniqueNote', 'p', 'unote'));
    if (tbar) hero.append(tbar);
    // 2) Tujuan pembayaran: gambar QRIS atau rekening/e-wallet yang dipilih
    const dest = el('section', 'dest'), dh = el('div', 'dh');
    if (m && m.type === 'account') dh.append(bk ? bankLogo(bk) : icon(m.icon || 'bank'), el('strong', '', bk ? m.name + ' · ' + bk.name : m.name));
    else dh.append(icon(m?.icon || 'qris'), el('strong', '', m ? m.name : '-'));
    dest.append(tx('payTo', 'span', 'lb'), dh);
    if (m && m.type === 'image') {
      const w = el('div', 'qris'), i = el('img'); i.alt = m.name; i.src = m.image;
      i.onerror = () => w.replaceChildren(el('span', '', 'Upload gambar ke ' + m.image)); w.append(i); dest.append(w);
      i.tabIndex = 0; i.title = 'Klik untuk memperbesar'; i.onclick = () => zoomImg(m.image, m.name); i.onkeydown = e => { if (e.key === 'Enter') zoomImg(m.image, m.name); };
      if (m.desc) dest.append(el('p', 'hint qh', m.desc));
      const dl = el('a', 'btn dsave'); dl.href = m.image; dl.download = (m.image || 'qris').split('/').pop(); dl.append(icon('download'), tx('save')); dest.append(dl);
    } else if (bk) {
      const link = /^https:\/\//i.test(bk.url || '') ? bk.url.replace(/\/+$/, '') : '', usd = bk.currency === 'USD' ? p.total / (+(bk.rate || a.usdRate) || 16500) : 0, rows = [];
      if (bk.number) rows.push([m.numberLabel || T.accNo, bk.number, 'num', 'Nomor disalin.']);
      if (link) rows.push([T.accLink, link.replace(/^https:\/\//i, ''), 'lnk', 'Link disalin.', link]);
      if (usd) rows.push([T.approx, 'US$ ' + usd.toFixed(2), 'num']);
      if (bk.holder) rows.push([T.accHolder, bk.holder]);
      rows.forEach(([k, v, cls, msg, raw]) => {
        const r = el('div', 'row'), g = el('span', 'rv');
        if (msg) g.append(iconBtn('copy', 'Salin', async () => toast(await copy(String(raw || v)) ? msg : 'Gagal menyalin.'), 'sm'));
        g.append(el('span', 'v ' + (cls || ''), v || '-')); r.append(el('span', 'k', k), g); dest.append(r);
      });
      if (usd) dest.append(el('p', 'hint qh', T.usdNote));
      if (link) { const ob = el('a', 'btn dsave'); ob.href = usd ? link + '/' + usd.toFixed(2) + 'USD' : link; ob.target = '_blank'; ob.rel = 'noopener'; ob.append(icon('external'), tx('openLink')); dest.append(ob); }
    } else dest.append(el('p', 'hint', 'Pilih metode pembayaran di langkah sebelumnya.'));
    // 3) Ringkas data pesanan
    const rc = el('div', 'recap'), rw = (k, v) => { const r = el('div', 'row'); r.append(k, el('span', 'v', v)); rc.append(r); };
    o.lines.forEach(l => rw(l.product.name + ' · ' + l.pkg.name + (l.qty > 1 ? ' ×' + l.qty : ''), rupiah(l.total)));
    if (F.orderNumber) rw(tx('orderNo', 'span', 'k'), o.id);
    rw(tx('buyer', 'span', 'k'), c.name.trim() || '-');
    // 4) Kanal konfirmasi: hanya ikon. Setelah diklik -> halaman sukses
    const chan = el('div', 'chan'), row2 = el('div', 'chrow'), msg = buildMessage(o, a, pay);
    chan.append(tx('confirmVia', 'span', 'lb'), row2);
    channels(a).filter(ch => F[FEAT[ch.id]]).forEach(ch => {
      const b = el('button', 'chb'); b.type = 'button'; b.title = ch.label; b.setAttribute('aria-label', ch.label); b.append(icon(ch.id));
      b.onclick = async () => {
        if (demo) return toast('Demo: pesan ' + ch.label + ' siap dikirim.');
        if (ch.copy) toast(await copy(msg) ? 'Pesan disalin, tempel di chat ' + ch.label + '.' : 'Gagal menyalin pesan.');
        S.done = true; S.sentVia = ch.label; S.sentAt = Date.now(); S.anim = true; emit('kirim'); save();
        go(ch.url(msg, o)); redraw(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
      row2.append(b);
    });
    box.append(hero, dest, rc, chan, ed(el('p', 'hint', a.note), 'admin.note'), back(1));
  }
  if (entering) [...box.children].forEach((x, i) => x.style.setProperty('--i', Math.min(i, 9)));
  left.append(box, tx('footer', 'p', 'foot'));

  // ---- panel kanan: ringkasan ----
  const side = el('aside', 'side' + (F.collapsibleSummary ? '' : ' static')), tg = el('button', 'sumtoggle'); tg.type = 'button';
  tg.append(el('span', '', T.sumTitle), el('b', '', rupiah(p.total)), icon('chev')); tg.onclick = () => side.classList.toggle('open');
  const sb = el('div', 'sbody');
  const row = (k, v, sub, cls) => { const r = el('div', 'row ' + (cls || '')), l = el('span'), vv = v instanceof Node ? v : el('span', 'v', v);
    l.append(k); if (sub) l.append(sub); vv.classList.add('v'); r.append(l, vv); return r; };
  sb.append(tx('sumTitle', 'h2'), tx('sumSub', 'p', 'sub'), tx('totalLabel', 'div', 'tl'), el('div', 'big', rupiah(p.total)));
  o.lines.forEach((l, i) => {
    const names = el('small'); names.append(ed(el('span', '', l.product.name), l.product.path), ' · ', ed(el('span', '', l.pkg.name), l.pkg.path));
    if (l.qty > 1) names.append(' × ' + l.qty);
    const price = l.qty === 1 ? ed(el('span', '', rupiah(l.base)), l.pkg.pp + '.price') : rupiah(l.base);
    sb.append(row(i === 0 ? tx('subtotal') : '', price, names));
  });
  const dl = o.lines.filter(l => l.discUnit > 0 && l.pkg.discount);
  if (F.discount && dl.length) {
    const sm = el('small');
    if (dl.length === 1) { const d = dl[0].pkg.discount, pp = dl[0].pkg.pp; sm.append(ed(el('span', '', d.label || 'Diskon'), pp + '.discount.label'), ' (', ed(el('span', '', d.type === 'percent' ? String(d.value) : rupiah(d.value)), pp + '.discount.value'), d.type === 'percent' ? '%)' : ')'); }
    else sm.textContent = [...new Set(dl.map(l => l.pkg.discount.label || 'Diskon'))].join(', ');
    sb.append(row(tx('discount'), '-' + rupiah(p.disc), sm, 'disc'));
  }
  if (p.code > 0) sb.append(row(tx('uniqueCode'), '+' + rupiah(p.code)));
  sb.append(el('hr'));
  if (F.orderNumber) sb.append(row(tx('orderNo'), o.id));
  const rBuyer = row(tx('buyer'), c.name.trim() || '-'), rPay = row(tx('method'), payLabel() || '-');
  syncBuyer = () => { rBuyer.hidden = !c.name.trim(); rBuyer.lastChild.textContent = c.name.trim() || '-'; };
  syncPay = () => { rPay.hidden = !curM(); rPay.lastChild.textContent = payLabel() || '-'; };
  syncBuyer(); syncPay();
  sb.append(rBuyer, rPay, el('hr'), row(tx('totalLabel'), rupiah(p.total)));
  side.append(tg, sb);

  const shell = el('div', 'shell'); shell.append(left, side); const stage = el('div', 'stage'); stage.append(shell); root.append(stage); save();
}







const $ = id => document.getElementById(id);
// Pengaman: demo.html dan js/demo.bundle.js harus berasal dari versi yang sama.
{ const miss = ['maxq', 'noadd', 'banks'].filter(id => !document.getElementById(id));
  if (miss.length) {
    const m = document.createElement('p'); m.setAttribute('role', 'alert');
    m.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:999;margin:0;padding:14px 18px;border-radius:12px;background:#b91c1c;color:#fff;font:600 14px/1.5 system-ui,sans-serif';
    m.textContent = 'Versi file tidak cocok: demo.html lama dipakai bersama JS baru. Timpa demo.html beserta folder js, css, dan config dengan versi terbaru dari zip, lalu tekan Ctrl+F5.';
    document.body.append(m); throw new Error('demo.html tidak cocok dengan demo.bundle.js, elemen hilang: ' + miss.join(', '));
  } }
const uid = p => p + '-' + Math.random().toString(36).slice(2, 6);
// Format lama (bank/number/holder langsung di metode) diubah menjadi daftar banks agar bisa diatur di tab Bank.
const norm = a => { for (const m of a.payments || []) if (m.type === 'account' && !Array.isArray(m.banks)) {
  m.banks = m.number ? [{ id: uid('bank'), name: m.bank || m.name, short: String(m.bank || m.name).slice(0, 3).toUpperCase(), number: m.number, holder: m.holder }] : []; delete m.bank; delete m.number; delete m.holder; } return a; };
const init = () => { const s = structuredClone(DEFAULTS); if (window.FA_ADMIN) s.admin = structuredClone(window.FA_ADMIN); s.admin.ui = merge(DEFAULT_UI, s.admin.ui || {}); norm(s.admin); return s; };
const parseCfg = t => JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
let S = init(), edit = true, pid = 'logo-design', kid = 'premium', prev = {}, tm, inputs = {};
const view = $('view'), t = el('div', 'toast'); document.body.append(t);
const toast = m => { t.textContent = m; t.classList.add('show'); clearTimeout(tm); tm = setTimeout(() => t.classList.remove('show'), 2200); };
const get = path => path.split('.').reduce((o, k) => o?.[k], S);
const put = (path, v) => { const k = path.split('.'), last = k.pop(); let o = S; for (const x of k) o = o[x]; o[last] = v; };
const fill = (sel, items, cur) => { sel.replaceChildren(); items.forEach(([v, n]) => { const o = el('option', '', n); o.value = v; o.selected = v === cur; sel.append(o); }); };
const FL = { stepper: ['Tampilan', 'Stepper langkah'], themeToggle: ['Tampilan', 'Tombol tema gelap/terang'], collapsibleSummary: ['Tampilan', 'Ringkasan bisa dilipat (mobile)'], animations: ['Tampilan', 'Animasi'],
  contact: ['Form', 'Kolom WhatsApp/Email'], socialMedia: ['Form', 'Media sosial'], orderNumber: ['Ringkasan', 'Nomor pesanan'], discount: ['Ringkasan', 'Baris diskon'], copyAmount: ['Pembayaran', 'Tombol salin nominal'],
  channelWhatsapp: ['Kanal konfirmasi', 'WhatsApp'], channelInstagram: ['Kanal konfirmasi', 'Instagram'], channelTiktok: ['Kanal konfirmasi', 'TikTok'], channelEmail: ['Kanal konfirmasi', 'Email'] };

function draw() {
  const P = S.catalog.products;
  if (!P[pid]) pid = Object.keys(P)[0];
  const K = P[pid]?.packages || {};
  if (!K[kid]) kid = Object.keys(K)[0];
  fill($('pid'), Object.entries(P).map(([k, v]) => [k, v.name]), pid);
  fill($('kid'), Object.entries(K).map(([k, v]) => [k, v.name]), kid);
  if (!pid || !kid) { view.textContent = 'Tambahkan produk dan paket di tab Produk.'; return; }
  const o = prev = buildOrder(S.site, S.catalog, { items: [{ pid, kid, qty: 1 }], sig: `${pid}.${kid}.1` }, prev, S.admin);
  render(view, { order: o, admin: S.admin, catalog: S.catalog, demo: true, toast });
  $('disc').checked = !!K[kid].discount; if (document.activeElement !== $('maxq')) $('maxq').value = K[kid].maxQty || 1; $('noadd').checked = !!K[kid].noAdd;
  view.classList.toggle('editing', edit);
  if (edit) view.querySelectorAll('[data-path]').forEach(e => { e.contentEditable = 'plaintext-only'; if (e.contentEditable !== 'plaintext-only') e.contentEditable = 'true'; });
  document.querySelectorAll('#stp button').forEach(b => b.classList.toggle('on', +b.dataset.s === (o.state.done ? 3 : o.state.step)));
  $('open').href = `index.html?site=demo&product=${pid}&package=${kid}`;
}
function syncInputs() {
  for (const [p, i] of Object.entries(inputs)) { const v = get(p); if (v === undefined) continue; if (i.type === 'checkbox') i.checked = v; else if (i.type === 'color') i.value = v || i.dataset.def || '#000000'; else if (document.activeElement !== i) i.value = v; }
}

// ---- pembuat kolom otomatis ----
const on = (p, i, ev, fn) => { inputs[p] = i; i['on' + ev] = () => { put(p, fn(i)); draw(); }; };
function tf(parent, label, p) { const w = el('label', 'tf'), i = el('input'); i.type = 'text'; i.value = get(p) ?? ''; on(p, i, 'input', x => x.value); w.append(label, i); parent.append(w); }
function sw(parent, label, p) { const w = el('label', 'swt'), i = el('input'); i.type = 'checkbox'; i.checked = !!get(p); on(p, i, 'change', x => x.checked); w.append(label, i); parent.append(w); }
function cf(parent, label, p) { const w = el('label'), i = el('input'); i.type = 'color'; i.value = get(p); on(p, i, 'input', x => x.value); w.append(i, label); parent.append(w); }
function fields(obj, path, parent, skip) {
  for (const [k, v] of Object.entries(obj)) {
    if (skip?.has(k) || k === 'banks') continue;
    const p = path + '.' + k;
    if (v && typeof v === 'object') { const d = el('details'); d.append(el('summary', '', k)); fields(v, p, d); parent.append(d); continue; }
    const l = el('label', 'cf'), i = el('input'); l.append(el('span', '', k), i);
    if (typeof v === 'boolean') { i.type = 'checkbox'; i.checked = v; on(p, i, 'change', x => x.checked); }
    else if (typeof v === 'number') { i.type = 'number'; i.value = v; on(p, i, 'input', x => +x.value); }
    else { i.type = 'text'; i.value = v ?? ''; on(p, i, 'input', x => x.value); }
    parent.append(l);
  }
}
function build() {
  inputs = {}; ['look', 'texts', 'feats', 'contact', 'cat'].forEach(id => $(id).replaceChildren());
  const ui = S.admin.ui, L = $('look');
  const rg = el('label', 'tf'), r = el('input'); r.type = 'range'; r.min = 0; r.max = 48; r.value = ui.radius; on('admin.ui.radius', r, 'input', x => +x.value); rg.append('Radius sudut', r); L.append(rg);
  tf(L, 'Font (CSS font-family)', 'admin.ui.font');
  for (const m of ['dark', 'light']) { L.append(el('h3', '', m === 'dark' ? 'Warna mode gelap' : 'Warna mode terang')); const g = el('div', 'cgrid'); for (const k in ui.colors[m]) cf(g, k, `admin.ui.colors.${m}.${k}`); L.append(g); }
  for (const k in ui.texts) tf($('texts'), k, 'admin.ui.texts.' + k);
  const groups = {};
  for (const k in ui.features) { const [g, lab] = FL[k] || ['Lainnya', k]; if (!groups[g]) { groups[g] = el('div'); groups[g].append(el('h3', '', g)); $('feats').append(groups[g]); } sw(groups[g], lab, 'admin.ui.features.' + k); }
  fields(S.admin, 'admin', $('contact'), new Set(['ui']));
  fields(S.catalog.products, 'catalog.products', $('cat'));
  $('json').value = JSON.stringify(S, null, 2);
  bkBuild();
}

// ================= Tab Bank: daftar bank (urut, sembunyi, hapus/tambah, logo, warna, bentuk) =================
const BK_STYLE = ['short', 'logo', 'color', 'textColor', 'shape', 'logoBg', 'logoBgColor'], bkOpen = new Set();
const accIdxs = () => S.admin.payments.map((p, i) => p.type === 'account' ? i : -1).filter(i => i >= 0);
const tplBanks = id => init().admin.payments.find(p => p.id === id)?.banks || [];

// Gambar diperkecil (maks 160px) lalu disimpan sebagai data URL di admin.js. SVG dipakai apa adanya.
const bkFile = f => new Promise((ok, no) => {
  if (!/^image\//.test(f.type)) return no(new Error('File harus berupa gambar.'));
  if (f.size > 1.5e6) return no(new Error('Ukuran gambar maksimal 1,5 MB.'));
  const r = new FileReader();
  r.onerror = () => no(new Error('File tidak bisa dibaca.'));
  r.onload = () => {
    if (f.type === 'image/svg+xml') return ok(r.result);
    const im = new Image();
    im.onerror = () => no(new Error('Gambar tidak bisa dibaca.'));
    im.onload = () => { const k = Math.min(1, 160 / Math.max(im.width, im.height)), c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(im.width * k)); c.height = Math.max(1, Math.round(im.height * k));
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); ok(c.toDataURL('image/webp', .9)); };
    im.src = r.result;
  };
  r.readAsDataURL(f);
});

// Urutkan dengan drag & drop (mouse dan sentuh). Pointer ditangkap di list agar tidak lepas saat elemen dipindah.
function bkSort(list, done) {
  list.addEventListener('pointerdown', e => {
    const h = e.target.closest('.grip'), item = h && h.closest('.bk'); if (!item || e.button > 0) return;
    e.preventDefault(); list.setPointerCapture(e.pointerId); item.classList.add('drag');
    const pane = list.closest('.pane'), before = [...list.children].map(x => x.dataset.id).join();
    const move = ev => {
      const r = pane.getBoundingClientRect(); if (ev.clientY < r.top + 40) pane.scrollTop -= 12; else if (ev.clientY > r.bottom - 40) pane.scrollTop += 12;
      const next = [...list.children].filter(x => x !== item).find(x => { const b = x.getBoundingClientRect(); return ev.clientY < b.top + b.height / 2; });
      if (next) { if (item.nextElementSibling !== next) list.insertBefore(item, next); } else if (list.lastElementChild !== item) list.append(item);
    };
    const end = () => { list.removeEventListener('pointermove', move); list.removeEventListener('pointerup', end); list.removeEventListener('pointercancel', end);
      item.classList.remove('drag'); const ids = [...list.children].map(x => x.dataset.id); if (ids.join() !== before) done(ids); };
    list.addEventListener('pointermove', move); list.addEventListener('pointerup', end); list.addEventListener('pointercancel', end);
  });
}

function bkCard(b, p, j, m) {
  const card = el('div', 'bk' + (bkOpen.has(b.id) ? ' open' : '')), h = el('div', 'bkh'), body = el('div', 'bkb'); card.dataset.id = b.id;
  const lg = el('span', 'bkl'), paint = () => lg.replaceChildren(bankLogo(b)); paint();
  const live = (path, i, ev, fn) => { on(path, i, ev, fn); const f = i['on' + ev]; i['on' + ev] = () => { f(); paint(); }; };
  const btn = (cls, ic, title, fn) => { const x = el('button', cls); x.type = 'button'; x.title = title; x.setAttribute('aria-label', title); if (ic) x.append(icon(ic)); x.onclick = fn; return x; };

  const gp = btn('grip', 'grip', 'Seret untuk memindah posisi', () => {});
  gp.onkeydown = e => { if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return; e.preventDefault();
    const to = j + (e.key === 'ArrowUp' ? -1 : 1); if (to < 0 || to >= m.banks.length) return;
    m.banks.splice(to, 0, m.banks.splice(j, 1)[0]); bkBuild(); draw(); $('banks').querySelector(`[data-id="${b.id}"] .grip`)?.focus(); };
  const nm = el('input', 'bkn'); nm.type = 'text'; nm.value = b.name || ''; nm.placeholder = 'Nama bank'; nm.setAttribute('aria-label', 'Nama bank'); live(p + '.name', nm, 'input', x => x.value);
  const eye = btn('ib eye', null, '', () => { if (b.hidden) delete b.hidden; else b.hidden = true; syncEye(); draw(); });
  const syncEye = () => { eye.replaceChildren(icon(b.hidden ? 'eyeoff' : 'eye')); const t = b.hidden ? 'Tampilkan di checkout' : 'Sembunyikan dari checkout'; eye.title = t; eye.setAttribute('aria-label', t); card.classList.toggle('off', !!b.hidden); };
  syncEye();
  const del = btn('ib x', 'trash', 'Hapus bank', () => { if (!confirm('Hapus bank "' + (b.name || 'tanpa nama') + '"?')) return; m.banks.splice(j, 1); bkOpen.delete(b.id); bkBuild(); draw(); toast('Bank dihapus.'); });
  const tg = btn('ib tgl', 'chev', 'Atur detail', () => { card.classList.toggle('open'); card.classList.contains('open') ? bkOpen.add(b.id) : bkOpen.delete(b.id); });
  h.append(gp, lg, nm, eye, del, tg);

  const fld = (label, path, ph, max) => { const w = el('label', 'tf'), i = el('input'); i.type = 'text'; i.value = get(path) ?? ''; i.placeholder = ph || ''; if (max) i.maxLength = max; live(path, i, 'input', x => x.value); w.append(label, i); body.append(w); };
  fld(m.numberLabel || 'Nomor rekening', p + '.number', m.numberLabel || 'Nomor rekening'); fld('Atas nama', p + '.holder', 'Nama pemilik');
  fld('Link pembayaran (opsional, mis. PayPal.me)', p + '.url', 'https://www.paypal.me/namakamu');
  const cur = el('label', 'tf'), cs = el('select'); [['', 'Rupiah (IDR)'], ['USD', 'Dolar (USD), dihitung dari kurs di tab Kontak']].forEach(([v, n]) => { const o2 = el('option', '', n); o2.value = v; o2.selected = (b.currency || '') === v; cs.append(o2); });
  live(p + '.currency', cs, 'change', x => x.value); cur.append('Mata uang tujuan', cs); body.append(cur); fld('Singkatan di badge (maks 3 huruf)', p + '.short', 'BCA', 3);

  // Logo
  body.append(el('h3', '', 'Logo'));
  const ur = el('div', 'ur'), fi = el('input'); fi.type = 'file'; fi.accept = 'image/*'; fi.hidden = true;
  const ub = btn('btn sm', 'upload', 'Unggah logo', () => fi.click()); ub.append(' Unggah logo');
  fi.onchange = async () => { const f = fi.files[0]; if (!f) return; try { b.logo = await bkFile(f); delete b.logoBg; bkOpen.add(b.id); bkBuild(); draw(); toast('Logo dipasang dengan latar transparan. Aktifkan "Latar bantuan" bila perlu.'); } catch (e) { toast(e.message); } fi.value = ''; };
  ur.append(ub, fi);
  if (b.logo) ur.append(btn('btn sm', null, 'Hapus logo', () => { delete b.logo; bkBuild(); draw(); })), ur.lastChild.textContent = 'Hapus logo';
  body.append(ur);
  if (b.logo?.startsWith('data:')) body.append(el('p', 'bkhint', 'Logo diunggah dan tertanam di admin.js (±' + Math.max(1, Math.round(b.logo.length * .75 / 1024)) + ' KB).'));
  else fld('Atau path file logo di repo', p + '.logo', 'assets/banks/bca.svg');

  // Warna & bentuk
  body.append(el('h3', '', 'Tampilan badge'));
  const col = (label, path, def) => { const w = el('div', 'cr'), i = el('input'); i.type = 'color'; i.dataset.def = def; i.value = get(path) || def; live(path, i, 'input', x => x.value);
    const r = btn('btn sm', null, 'Kembalikan ke default', () => { put(path, ''); i.value = def; paint(); draw(); }); r.textContent = 'Default'; w.append(el('span', '', label), i, r); body.append(w); };
  if (!b.logo) { col('Warna shape (latar)', p + '.color', '#52525b'); col('Warna teks', p + '.textColor', '#ffffff'); }
  else {
    const lw = el('label', 'swt'), li = el('input'); li.type = 'checkbox'; li.checked = !!b.logoBg; lw.append('Latar bantuan di belakang logo', li); body.append(lw);
    li.onchange = () => { if (li.checked) b.logoBg = true; else delete b.logoBg; bkOpen.add(b.id); bkBuild(); draw(); };
    if (b.logoBg) col('Warna latar bantuan', p + '.logoBgColor', '#ffffff');
  }
  const sw2 = el('label', 'tf'), sel = el('select'), shDef = b.logo && !b.logoBg ? 'none' : 'rounded';
  [...(b.logo ? [['none', 'Mengikuti logo (tanpa dipotong)']] : []), ['rounded', 'Persegi membulat'], ['circle', 'Lingkaran'], ['square', 'Persegi']].forEach(([v, n]) => { const o = el('option', '', n); o.value = v; o.selected = (b.shape || shDef) === v; sel.append(o); });
  live(p + '.shape', sel, 'change', x => x.value); sw2.append('Bentuk', sel); body.append(sw2);
  sw(body, 'Contoh (tidak tampil di checkout asli)', p + '.sample');
  const rs = btn('btn sm', null, 'Reset gaya bank ini', () => { const t = tplBanks(m.id).find(x => x.id === b.id); for (const k of BK_STYLE) { if (t && t[k] !== undefined) b[k] = t[k]; else delete b[k]; } bkBuild(); draw(); toast('Gaya bank dikembalikan ke template.'); });
  rs.textContent = 'Reset gaya bank ini'; rs.style.marginTop = '8px'; body.append(rs);

  card.append(h, body); return card;
}

function bkBuild() {
  for (const k of Object.keys(inputs)) if (k.includes('.banks.')) delete inputs[k];
  const root = $('banks'); root.replaceChildren();
  const idx = accIdxs(); if (!idx.length) return root.append(el('p', 'bkhint', 'Belum ada metode pembayaran bertipe "account" (Transfer Bank / E-Wallet) di tab Kontak.'));
  root.append(el('p', 'bkhint', 'Seret ikon titik-titik untuk mengurutkan (atau fokus lalu tekan panah atas/bawah). Ikon mata = tampil atau sembunyikan di checkout. Panah di kanan membuka pengaturan logo, warna, dan bentuk.'));
  idx.forEach(i => {
    const m = S.admin.payments[i], base = `admin.payments.${i}.banks`, sec = el('div', 'bksec');
    if (idx.length > 1) sec.append(el('h3', 'bkt', m.name));
    const list = el('div', 'bklist'); m.banks.forEach((b, j) => { if (!b.id) b.id = uid('bank'); list.append(bkCard(b, `${base}.${j}`, j, m)); }); sec.append(list);
    bkSort(list, ids => { m.banks = ids.map(id => m.banks.find(b => b.id === id)); bkBuild(); draw(); });
    if (!m.banks.length) sec.append(el('p', 'bkhint', 'Belum ada item. Klik "Tambah".'));
    const two = el('div', 'two'), add = el('button', 'btn sm'), rs = el('button', 'btn sm'); add.type = rs.type = 'button';
    add.append(icon('plus'), ' Tambah'); rs.textContent = 'Reset ke template awal';
    add.onclick = () => { const b = { id: uid('bank'), name: 'Baru', short: 'NEW', color: '#2563eb', textColor: '#ffffff', number: '', holder: '' }; m.banks.push(b); bkOpen.add(b.id); bkBuild(); draw();
      const c = $('banks').querySelector(`[data-id="${b.id}"]`); c?.scrollIntoView({ block: 'nearest' }); c?.querySelector('.bkn')?.select(); };
    rs.onclick = () => { if (!confirm('Kembalikan daftar "' + m.name + '" ke template awal? Perubahan di daftar ini akan hilang.')) return; m.banks = structuredClone(tplBanks(m.id)); bkOpen.clear(); bkBuild(); draw(); toast('Daftar dikembalikan ke template awal.'); };
    two.append(add, rs); sec.append(two); root.append(sec);
  });
}
function bkPreview() { const m = S.admin.payments[accIdxs()[0]]; if (m && prev.state) { prev.state.step = 1; prev.state.done = false; prev.state.method = m.id; prev.state.anim = false; draw(); } }

view.addEventListener('focusout', e => {
  const p = e.target.dataset?.path; if (!edit || !p) return;
  const text = e.target.textContent.trim(), cur = get(p);
  if (typeof cur === 'number') { const n = parseInt(text.replace(/\D/g, ''), 10); if (isNaN(n)) return draw(); put(p, n); } else put(p, text);
  draw(); syncInputs();
});
view.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.dataset?.path) { e.preventDefault(); e.target.blur(); } });

const pkgs = () => S.catalog.products[pid].packages, redo = () => { build(); draw(); }, keep = () => ({ customer: prev.customer, state: prev.state });
$('tabs').onclick = e => { const b = e.target.closest('button'); if (!b) return; document.querySelectorAll('#tabs button').forEach(x => x.classList.toggle('on', x === b)); document.querySelectorAll('.pane section').forEach(s => s.hidden = s.id !== 'tab-' + b.dataset.t); if (b.dataset.t === 'bank') bkPreview(); };
$('q').oninput = e => { const q = e.target.value.toLowerCase(); document.querySelectorAll('#texts .tf').forEach(w => { w.style.display = (w.firstChild.textContent + w.lastChild.value).toLowerCase().includes(q) ? '' : 'none'; }); };
$('edit').onchange = e => { edit = e.target.checked; draw(); };
$('pid').onchange = e => { pid = e.target.value; kid = ''; prev = keep(); draw(); };
$('kid').onchange = e => { kid = e.target.value; prev = keep(); draw(); };
$('disc').onchange = e => { const k = pkgs()[kid]; if (e.target.checked) k.discount = k.discount || { type: 'percent', value: 10, label: 'Diskon' }; else delete k.discount; redo(); };
$('addp').onclick = () => { pid = uid('produk'); kid = 'paket-1'; S.catalog.products[pid] = { name: 'Produk Baru', packages: { 'paket-1': { name: 'Paket Baru', price: 100000 } } }; redo(); };
$('maxq').oninput = e => { const k = pkgs()[kid], v = Math.max(1, Math.min(99, parseInt(e.target.value, 10) || 1)); if (v > 1) k.maxQty = v; else delete k.maxQty; draw(); };
$('noadd').onchange = e => { const k = pkgs()[kid]; if (e.target.checked) k.noAdd = true; else delete k.noAdd; draw(); };
$('addk').onclick = () => { kid = uid('paket'); pkgs()[kid] = { name: 'Paket Baru', price: 100000 }; redo(); };
$('delk').onclick = () => { if (Object.keys(pkgs()).length < 2) return toast('Sisakan minimal satu paket.'); delete pkgs()[kid]; kid = ''; redo(); };
$('reset').onclick = () => { S = init(); pid = 'logo-design'; kid = 'premium'; prev = {}; redo(); toast('Dikembalikan ke config tersimpan.'); };
const save = (name, obj) => { const txt = JSON.stringify(obj, null, 2), a = el('a'); a.href = URL.createObjectURL(new Blob([name.endsWith('.js') ? 'window.FA_ADMIN = ' + txt + ';\n' : txt], { type: 'text/plain' })); a.download = name;
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1500); toast(name + ' diunduh. Timpa file lama di repo.'); };
$('dadm').onclick = () => save('admin.js', S.admin);
$('dcat').onclick = () => save('products.json', S.catalog);
$('imp').onchange = async e => { const f = e.target.files[0]; if (!f) return;
  try { const j = parseCfg(await f.text());
    if (j.products) S.catalog = j; else if (j.brand) { j.ui = merge(DEFAULT_UI, j.ui || {}); S.admin = norm(j); } else throw 0;
    prev = {}; redo(); toast(f.name + ' dimuat.'); } catch { toast('File JSON tidak dikenali.'); } e.target.value = ''; };
$('jload').onclick = () => { $('json').value = JSON.stringify(S, null, 2); };
$('japply').onclick = () => { try { const n = JSON.parse($('json').value); if (!n.admin || !n.catalog || !n.site) throw 0; n.admin.ui = merge(DEFAULT_UI, n.admin.ui || {}); norm(n.admin); S = n; prev = {}; redo(); toast('JSON diterapkan.'); } catch { toast('JSON tidak valid.'); } };
$('theme').onclick = () => { toggleTheme(); draw(); };
$('dev').onclick = e => { const b = e.target.closest('button'); if (!b) return; $('frame').style.width = b.dataset.w; document.querySelectorAll('#dev button').forEach(x => x.classList.toggle('on', x === b)); };
$('stp').onclick = e => { const b = e.target.closest('button'); if (!b || !prev.state) return; const n = +b.dataset.s, st = prev.state;
  if (n === 3) Object.assign(st, { step: 2, done: true, sentVia: st.sentVia || 'WhatsApp', sentAt: st.sentAt || Date.now() }); else { st.done = false; st.step = n; }
  st.anim = true; draw(); };
redo();

})();
