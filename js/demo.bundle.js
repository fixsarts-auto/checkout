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
function calc(pkg) {
  const d = pkg.discount, base = pkg.price;
  const disc = !d ? 0 : d.type === 'percent' ? Math.round(base * d.value / 100) : Math.min(d.value, base);
  return { base, disc, total: base - disc };
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
      { id: 'bank', name: 'Transfer Bank (contoh)', desc: 'Transfer manual ke rekening', type: 'account', bank: 'BCA', number: '1234567890', holder: 'Fixs Arts' }
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
    channelWhatsapp: true, channelInstagram: true, channelTiktok: true, channelEmail: true, collapsibleSummary: true, animations: true },
  texts: {
    step1: 'Data', step2: 'Pembayaran', step3: 'Konfirmasi',
    t1: 'Data Pembeli', s1: 'Isi data kamu agar admin bisa menghubungi dan memproses pesanan.',
    t2: 'Metode Pembayaran', s2: 'Pilih metode, lalu bayar sesuai total pesanan.',
    t3: 'Konfirmasi Pembayaran', s3: 'Kirim bukti pembayaran ke admin lewat salah satu kanal di bawah.',
    name: 'Nama lengkap', namePh: 'Nama kamu', contact: 'WhatsApp/Email', contactPh: '0812 3456 7890 atau nama@email.com',
    social: 'Media Sosial (Opsional)', socialPh: '@username',
    toPay: 'Lanjut ke Pembayaran', toConfirm: 'Lanjut ke Konfirmasi', back: 'Kembali', done: 'Sudah bayar, lanjut',
    payHint: 'Ketuk metode untuk melihat detail pembayaran.',
    sumTitle: 'Ringkasan Pesanan', sumSub: 'Pesanan diverifikasi manual oleh admin.', totalLabel: 'Total pembayaran',
    subtotal: 'Subtotal', discount: 'Diskon', orderNo: 'Nomor pesanan', buyer: 'Pembeli', method: 'Metode',
    footer: 'Dengan melanjutkan, kamu menyetujui bahwa pembayaran diverifikasi manual oleh admin.'
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
      const d = k.discount;
      if (d && (!['percent', 'amount'].includes(d.type) || !Number.isInteger(d.value) || d.value < 0 ||
        (d.type === 'percent' && d.value > 100) || (d.type === 'amount' && d.value > k.price))) bad(`diskon ${pid}/${kid}`);
    }
  }
  return c;
}

// Katalog hanya boleh berasal dari: (1) nama terdaftar di config/sites.json ("sites"), atau
// (2) alamat website dengan origin yang ada di "allowedOrigins" (katalog selalu di <alamat>/data/products.json).
async function loadCatalog(siteParam) {
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
const stableId = key => { try { return sessionStorage.getItem(key) || (sessionStorage.setItem(key, newId()), sessionStorage.getItem(key)); } catch { return newId(); } };

// Harga SELALU dihitung dari katalog, tidak ada angka dari URL.
function buildOrder(site, catalog, pid, kid, prev = {}) {
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



const q = encodeURIComponent, dg = s => String(s).replace(/\D/g, '');

function buildMessage(o, a) {
  const c = o.customer, p = o.pricing;
  return ['Halo Admin ' + a.brand + ', saya sudah melakukan pembayaran.', '',
    `No. Pesanan: ${o.id}`, `Website: ${o.site.name} (${o.site.id})`,
    `Produk: ${o.product.name} [${o.product.id}]`, `Paket: ${o.pkg.name} [${o.pkg.id}]`,
    `Harga: ${rupiah(p.base)}`, `Diskon: -${rupiah(p.disc)}`, `Total Bayar: ${rupiah(p.total)}`, '',
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







const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const ed = (e, path) => { if (path) e.dataset.path = path; return e; };
const iconBtn = (name, label, fn, cls = '') => { const b = el('button', 'icon-btn ' + cls); b.type = 'button'; b.setAttribute('aria-label', label); b.append(icon(name)); b.onclick = fn; return b; };
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

// Popup detail metode (QRIS diperbesar atau data rekening)
function openMethod(m, total, toast, root, T, onDone, F) {
  const ov = el('div', 'ov'), box = el('div', 'modal'); ov.style.cssText = root.style.cssText;
  const close = () => { ov.remove(); document.removeEventListener('keydown', esc); };
  const esc = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', esc); ov.onclick = e => { if (e.target === ov) close(); };
  const head = el('div', 'mhead'), x = iconBtn('close', 'Tutup', close); head.append(el('strong', '', m.name), x); box.append(head);
  if (m.type === 'image') {
    const w = el('div', 'qris'), i = el('img'); i.alt = m.name; i.src = m.image;
    i.onerror = () => w.replaceChildren(el('span', '', 'Upload gambar ke ' + m.image)); w.append(i); box.append(w);
  } else [['Bank', m.bank], ['No. rekening', m.number], ['Atas nama', m.holder]].forEach(([k, v]) => {
    const r = el('div', 'row'), g = el('span', 'rv');
    if (k === 'No. rekening') g.append(iconBtn('copy', 'Salin nomor', async () => toast(await copy(String(v)) ? 'Nomor disalin.' : 'Gagal menyalin.'), 'sm'));
    g.append(el('span', 'v', v || '-')); r.append(el('span', 'k', k), g); box.append(r);
  });
  const due = el('div', 'due'); due.append(el('span', 'k', 'Bayar sesuai total'));
  if (F.copyAmount) due.append(iconBtn('copy', 'Salin nominal', async () => toast(await copy(String(total)) ? 'Nominal disalin.' : 'Gagal menyalin.'), 'sm'));
  due.append(el('b', '', rupiah(total)));
  const go2 = el('button', 'btn pri', T.done); go2.type = 'button'; go2.onclick = () => { close(); onDone(); };
  box.append(due, go2); ov.append(box); document.body.append(ov); go2.focus();
}

function render(root, { order: o, admin: a, demo = false, toast = () => {} }) {
  const ui = merge(DEFAULT_UI, a.ui || {}), T = ui.texts, F = ui.features, S = o.state, c = o.customer, p = o.pricing, errs = {};
  const tp = 'admin.ui.texts.', redraw = () => render(root, { order: o, admin: a, demo, toast });
  const tx = (k, tag = 'span', cls) => ed(el(tag, cls, T[k]), tp + k);
  const to = n => { S.step = n; S.anim = true; redraw(); if (!demo) window.scrollTo({ top: 0, behavior: 'smooth' }); };
  root.replaceChildren(); root.classList.add('fa'); root.classList.toggle('demo', demo); applyUi(root, ui);
  if (demo && S.step === 2 && !S.method && a.payments?.length) S.method = a.payments[0].id;

  // ---- panel kiri ----
  const left = el('main', 'left'), top = el('header', 'top'), tb = el('button', 'icon-btn'); tb.type = 'button'; tb.setAttribute('aria-label', 'Ganti tema');
  const sync = () => tb.replaceChildren(icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon'));
  sync(); tb.onclick = () => { toggleTheme(); applyUi(root, ui); sync(); };
  top.append(ed(el('div', 'brand', a.brand), 'admin.brand')); if (F.themeToggle) top.append(tb);
  left.append(top);
  if (F.stepper) {
    const st = el('nav', 'steps');
    [1, 2, 3].forEach((n, i) => {
      const it = el('div', 'st' + (i === S.step ? ' cur' : i < S.step ? ' done' : '')); it.append(tx('step' + n));
      it.onclick = e => { if ((demo || i < S.step) && !e.target.isContentEditable) to(i); }; st.append(it);
      if (i < 2) st.append(el('i', 'ln' + (i < S.step ? ' on' : '')));
    });
    left.append(st);
  }
  const box = el('div', 'stepbox' + (S.anim ? ' in' : '')); S.anim = false;
  box.append(tx('t' + (S.step + 1), 'h1'), tx('s' + (S.step + 1), 'p', 'sub'));
  const back = n => { const b = el('button', 'btn ghost'); b.type = 'button'; b.append(tx('back')); b.onclick = e => { if (!e.target.isContentEditable) to(n); }; return b; };
  const primary = (k, fn, off) => { const b = el('button', 'btn pri' + (off ? ' off' : '')); b.type = 'button'; b.append(tx(k)); b.onclick = e => { if (e.target.isContentEditable) { e.preventDefault(); return; } fn(); }; return b; };

  // Input dengan placeholder yang bisa diedit langsung di demo (overlay saat mode edit)
  const inp = (key, type, phKey, auto, labelKey, val, onin) => {
    const w = el('div', 'fld'), iw = el('div', 'iw'), i = el('input'), er = el('small', 'err'), ph = ed(el('span', 'phx', T[phKey]), tp + phKey);
    i.type = type; i.value = val; i.placeholder = T[phKey]; i.autocomplete = auto; i.maxLength = 80; i.setAttribute('aria-label', T[labelKey] || T[phKey]);
    const sp = () => { ph.className = 'phx' + (i.value ? ' off' : ''); }; sp();
    i.oninput = () => { onin(i.value); sp(); }; errs[key] = er; iw.append(i, ph);
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
    const f = el('form'); f.noValidate = true; f.onsubmit = e => { e.preventDefault(); if (demo || validate()) to(1); else toast('Lengkapi data dulu.'); };
    f.append(inp('name', 'text', 'namePh', 'name', 'name', c.name, v => { c.name = v; }));
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
    const sub = primary('toPay', () => {}); sub.type = 'submit'; f.append(sub); box.append(f);
  } else if (S.step === 1) {
    box.append(tx('payHint', 'p', 'hint'));
    const list = el('div', 'methods');
    (a.payments || []).forEach((m, i) => {
      const b = el('div', 'method' + (S.method === m.id ? ' sel' : '')); b.tabIndex = 0; b.setAttribute('role', 'button');
      const t = el('span', 'mt'); t.append(ed(el('strong', '', m.name), `admin.payments.${i}.name`), ed(el('small', '', m.desc || ''), `admin.payments.${i}.desc`));
      b.append(icon(m.icon || (m.type === 'account' ? 'bank' : 'qris')), t, el('span', 'dot'));
      const open = e => { if (e.target.isContentEditable) return; S.method = m.id; S.anim = false; redraw(); openMethod(m, p.total, toast, root, T, () => to(2), F); };
      b.onclick = open; b.onkeydown = e => { if (e.key === 'Enter') open(e); }; list.append(b);
    });
    box.append(list, primary('toConfirm', () => (S.method || demo) ? to(2) : toast('Pilih metode pembayaran dulu.'), !S.method && !demo), back(0));
  } else {
    const m = (a.payments || []).find(x => x.id === S.method), rc = el('div', 'recap');
    const rw = (k, v) => { const r = el('div', 'row'); r.append(k instanceof Node ? k : el('span', 'k', k), el('span', 'v', v)); rc.append(r); };
    if (F.orderNumber) rw(tx('orderNo', 'span', 'k'), o.id);
    rw(tx('buyer', 'span', 'k'), c.name.trim() || '-'); rw(tx('method', 'span', 'k'), m ? m.name : '-'); rw(tx('totalLabel', 'span', 'k'), rupiah(p.total));
    const btns = el('div', 'btns'), msg = buildMessage(o, a);
    channels(a).filter(ch => F[FEAT[ch.id]]).forEach(ch => { const b = el('button', 'btn'); b.type = 'button'; b.append(icon(ch.id), el('span', '', ch.label));
      b.onclick = async () => {
        if (demo) return toast('Demo: pesan ' + ch.label + ' siap dikirim.');
        if (ch.copy) toast(await copy(msg) ? 'Pesan disalin, tempel di chat ' + ch.label + '.' : 'Gagal menyalin pesan.');
        go(ch.url(msg, o)); }; btns.append(b); });
    box.append(rc, btns, ed(el('p', 'hint', a.note), 'admin.note'), back(1));
  }
  left.append(box, tx('footer', 'p', 'foot'));

  // ---- panel kanan: ringkasan ----
  const side = el('aside', 'side' + (F.collapsibleSummary ? '' : ' static')), tg = el('button', 'sumtoggle'); tg.type = 'button';
  tg.append(el('span', '', T.sumTitle), el('b', '', rupiah(p.total)), icon('chev')); tg.onclick = () => side.classList.toggle('open');
  const sb = el('div', 'sbody'), d = o.pkg.discount;
  const row = (k, v, sub, cls) => { const r = el('div', 'row ' + (cls || '')), l = el('span'), vv = v instanceof Node ? v : el('span', 'v', v);
    l.append(k); if (sub) l.append(sub); vv.classList.add('v'); r.append(l, vv); return r; };
  const names = el('small'); names.append(ed(el('span', '', o.product.name), o.product.path), ' · ', ed(el('span', '', o.pkg.name), o.pkg.path));
  sb.append(tx('sumTitle', 'h2'), tx('sumSub', 'p', 'sub'), tx('totalLabel', 'div', 'tl'), el('div', 'big', rupiah(p.total)),
    row(tx('subtotal'), ed(el('span', '', rupiah(p.base)), o.pkg.pp + '.price'), names));
  if (F.discount && d) { const dl = el('small'); dl.append(ed(el('span', '', d.label || 'Diskon'), o.pkg.pp + '.discount.label'), ' (',
      ed(el('span', '', d.type === 'percent' ? String(d.value) : rupiah(d.value)), o.pkg.pp + '.discount.value'), d.type === 'percent' ? '%)' : ')');
    sb.append(row(tx('discount'), '-' + rupiah(p.disc), dl, 'disc')); }
  sb.append(el('hr'));
  if (F.orderNumber) sb.append(row(tx('orderNo'), o.id));
  sb.append(row(tx('buyer'), c.name.trim() || '-'), el('hr'), row(tx('totalLabel'), rupiah(p.total)));
  side.append(tg, sb);

  const shell = el('div', 'shell'); shell.append(left, side); const stage = el('div', 'stage'); stage.append(shell); root.append(stage);
}






const $ = id => document.getElementById(id);
const init = () => { const s = structuredClone(DEFAULTS); if (window.FA_ADMIN) s.admin = structuredClone(window.FA_ADMIN); s.admin.ui = merge(DEFAULT_UI, s.admin.ui || {}); return s; };
const parseCfg = t => JSON.parse(t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1));
let S = init(), edit = true, pid = 'logo-design', kid = 'premium', prev = {}, tm, inputs = {};
const view = $('view'), t = el('div', 'toast'); document.body.append(t);
const toast = m => { t.textContent = m; t.classList.add('show'); clearTimeout(tm); tm = setTimeout(() => t.classList.remove('show'), 2200); };
const uid = p => p + '-' + Math.random().toString(36).slice(2, 6);
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
  const o = prev = buildOrder(S.site, S.catalog, pid, kid, prev);
  render(view, { order: o, admin: S.admin, demo: true, toast });
  $('disc').checked = !!K[kid].discount;
  view.classList.toggle('editing', edit);
  if (edit) view.querySelectorAll('[data-path]').forEach(e => { e.contentEditable = 'plaintext-only'; if (e.contentEditable !== 'plaintext-only') e.contentEditable = 'true'; });
  document.querySelectorAll('#stp button').forEach(b => b.classList.toggle('on', +b.dataset.s === o.state.step));
  $('open').href = `index.html?site=demo&product=${pid}&package=${kid}`;
}
function syncInputs() {
  for (const [p, i] of Object.entries(inputs)) { const v = get(p); if (v === undefined) continue; if (i.type === 'checkbox') i.checked = v; else if (document.activeElement !== i) i.value = v; }
}

// ---- pembuat kolom otomatis ----
const on = (p, i, ev, fn) => { inputs[p] = i; i['on' + ev] = () => { put(p, fn(i)); draw(); }; };
function tf(parent, label, p) { const w = el('label', 'tf'), i = el('input'); i.type = 'text'; i.value = get(p) ?? ''; on(p, i, 'input', x => x.value); w.append(label, i); parent.append(w); }
function sw(parent, label, p) { const w = el('label', 'swt'), i = el('input'); i.type = 'checkbox'; i.checked = !!get(p); on(p, i, 'change', x => x.checked); w.append(label, i); parent.append(w); }
function cf(parent, label, p) { const w = el('label'), i = el('input'); i.type = 'color'; i.value = get(p); on(p, i, 'input', x => x.value); w.append(i, label); parent.append(w); }
function fields(obj, path, parent, skip) {
  for (const [k, v] of Object.entries(obj)) {
    if (skip?.has(k)) continue;
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
}

view.addEventListener('focusout', e => {
  const p = e.target.dataset?.path; if (!edit || !p) return;
  const text = e.target.textContent.trim(), cur = get(p);
  if (typeof cur === 'number') { const n = parseInt(text.replace(/\D/g, ''), 10); if (isNaN(n)) return draw(); put(p, n); } else put(p, text);
  draw(); syncInputs();
});
view.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.dataset?.path) { e.preventDefault(); e.target.blur(); } });

const pkgs = () => S.catalog.products[pid].packages, redo = () => { build(); draw(); }, keep = () => ({ customer: prev.customer, state: prev.state });
$('tabs').onclick = e => { const b = e.target.closest('button'); if (!b) return; document.querySelectorAll('#tabs button').forEach(x => x.classList.toggle('on', x === b)); document.querySelectorAll('.pane section').forEach(s => s.hidden = s.id !== 'tab-' + b.dataset.t); };
$('q').oninput = e => { const q = e.target.value.toLowerCase(); document.querySelectorAll('#texts .tf').forEach(w => { w.style.display = (w.firstChild.textContent + w.lastChild.value).toLowerCase().includes(q) ? '' : 'none'; }); };
$('edit').onchange = e => { edit = e.target.checked; draw(); };
$('pid').onchange = e => { pid = e.target.value; kid = ''; prev = keep(); draw(); };
$('kid').onchange = e => { kid = e.target.value; prev = keep(); draw(); };
$('disc').onchange = e => { const k = pkgs()[kid]; if (e.target.checked) k.discount = k.discount || { type: 'percent', value: 10, label: 'Diskon' }; else delete k.discount; redo(); };
$('addp').onclick = () => { pid = uid('produk'); kid = 'paket-1'; S.catalog.products[pid] = { name: 'Produk Baru', packages: { 'paket-1': { name: 'Paket Baru', price: 100000 } } }; redo(); };
$('addk').onclick = () => { kid = uid('paket'); pkgs()[kid] = { name: 'Paket Baru', price: 100000 }; redo(); };
$('delk').onclick = () => { if (Object.keys(pkgs()).length < 2) return toast('Sisakan minimal satu paket.'); delete pkgs()[kid]; kid = ''; redo(); };
$('reset').onclick = () => { S = init(); pid = 'logo-design'; kid = 'premium'; prev = {}; redo(); toast('Dikembalikan ke config tersimpan.'); };
const save = (name, obj) => { const txt = JSON.stringify(obj, null, 2), a = el('a'); a.href = URL.createObjectURL(new Blob([name.endsWith('.js') ? 'window.FA_ADMIN = ' + txt + ';\n' : txt], { type: 'text/plain' })); a.download = name;
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1500); toast(name + ' diunduh. Timpa file lama di repo.'); };
$('dadm').onclick = () => save('admin.js', S.admin);
$('dcat').onclick = () => save('products.json', S.catalog);
$('imp').onchange = async e => { const f = e.target.files[0]; if (!f) return;
  try { const j = parseCfg(await f.text());
    if (j.products) S.catalog = j; else if (j.brand) { j.ui = merge(DEFAULT_UI, j.ui || {}); S.admin = j; } else throw 0;
    prev = {}; redo(); toast(f.name + ' dimuat.'); } catch { toast('File JSON tidak dikenali.'); } e.target.value = ''; };
$('jload').onclick = () => { $('json').value = JSON.stringify(S, null, 2); };
$('japply').onclick = () => { try { const n = JSON.parse($('json').value); if (!n.admin || !n.catalog || !n.site) throw 0; n.admin.ui = merge(DEFAULT_UI, n.admin.ui || {}); S = n; prev = {}; redo(); toast('JSON diterapkan.'); } catch { toast('JSON tidak valid.'); } };
$('theme').onclick = () => { toggleTheme(); draw(); };
$('dev').onclick = e => { const b = e.target.closest('button'); if (!b) return; $('frame').style.width = b.dataset.w; document.querySelectorAll('#dev button').forEach(x => x.classList.toggle('on', x === b)); };
$('stp').onclick = e => { const b = e.target.closest('button'); if (!b || !prev.state) return; prev.state.step = +b.dataset.s; prev.state.anim = true; draw(); };
redo();

})();
