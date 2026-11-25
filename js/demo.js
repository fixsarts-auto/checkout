import './theme.js';
import { render, el, bankLogo } from './render.js';
import { icon } from './icons.js';
import { buildOrder } from './catalog.js';
import { toggleTheme } from './theme.js';
import { DEFAULTS, DEFAULT_UI, merge } from './defaults.js';

const $ = id => document.getElementById(id);
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
  const o = prev = buildOrder(S.site, S.catalog, pid, kid, prev);
  render(view, { order: o, admin: S.admin, demo: true, toast });
  $('disc').checked = !!K[kid].discount;
  view.classList.toggle('editing', edit);
  if (edit) view.querySelectorAll('[data-path]').forEach(e => { e.contentEditable = 'plaintext-only'; if (e.contentEditable !== 'plaintext-only') e.contentEditable = 'true'; });
  document.querySelectorAll('#stp button').forEach(b => b.classList.toggle('on', +b.dataset.s === o.state.step));
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
const BK_STYLE = ['short', 'logo', 'color', 'textColor', 'shape'], bkOpen = new Set();
const accIdx = () => S.admin.payments.findIndex(p => p.type === 'account');
const tplBanks = () => init().admin.payments.find(p => p.type === 'account')?.banks || [];

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
  fld('Nomor rekening', p + '.number', 'Nomor rekening'); fld('Atas nama', p + '.holder', 'Nama pemilik rekening'); fld('Singkatan di badge (maks 3 huruf)', p + '.short', 'BCA', 3);

  // Logo
  body.append(el('h3', '', 'Logo'));
  const ur = el('div', 'ur'), fi = el('input'); fi.type = 'file'; fi.accept = 'image/*'; fi.hidden = true;
  const ub = btn('btn sm', 'upload', 'Unggah logo', () => fi.click()); ub.append(' Unggah logo');
  fi.onchange = async () => { const f = fi.files[0]; if (!f) return; try { b.logo = await bkFile(f); b.color = ''; bkOpen.add(b.id); bkBuild(); draw(); toast('Logo dipasang. Warna shape dikosongkan agar logo tampil di latar putih.'); } catch (e) { toast(e.message); } fi.value = ''; };
  ur.append(ub, fi);
  if (b.logo) ur.append(btn('btn sm', null, 'Hapus logo', () => { delete b.logo; bkBuild(); draw(); })), ur.lastChild.textContent = 'Hapus logo';
  body.append(ur);
  if (b.logo?.startsWith('data:')) body.append(el('p', 'bkhint', 'Logo diunggah dan tertanam di admin.js (±' + Math.max(1, Math.round(b.logo.length * .75 / 1024)) + ' KB).'));
  else fld('Atau path file logo di repo', p + '.logo', 'assets/banks/bca.svg');

  // Warna & bentuk
  body.append(el('h3', '', 'Tampilan badge'));
  const col = (label, path, def) => { const w = el('div', 'cr'), i = el('input'); i.type = 'color'; i.dataset.def = def; i.value = get(path) || def; live(path, i, 'input', x => x.value);
    const r = btn('btn sm', null, 'Kembalikan ke default', () => { put(path, ''); i.value = def; paint(); draw(); }); r.textContent = 'Default'; w.append(el('span', '', label), i, r); body.append(w); };
  col('Warna shape (latar)', p + '.color', b.logo ? '#ffffff' : '#52525b'); col('Warna teks', p + '.textColor', '#ffffff');
  const sw2 = el('label', 'tf'), sel = el('select'); [['rounded', 'Persegi membulat'], ['circle', 'Lingkaran'], ['square', 'Persegi']].forEach(([v, n]) => { const o = el('option', '', n); o.value = v; o.selected = (b.shape || 'rounded') === v; sel.append(o); });
  live(p + '.shape', sel, 'change', x => x.value); sw2.append('Bentuk', sel); body.append(sw2);
  sw(body, 'Contoh (tidak tampil di checkout asli)', p + '.sample');
  const rs = btn('btn sm', null, 'Reset gaya bank ini', () => { const t = tplBanks().find(x => x.id === b.id); for (const k of BK_STYLE) { if (t && t[k] !== undefined) b[k] = t[k]; else delete b[k]; } bkBuild(); draw(); toast('Gaya bank dikembalikan ke template.'); });
  rs.textContent = 'Reset gaya bank ini'; rs.style.marginTop = '8px'; body.append(rs);

  card.append(h, body); return card;
}

function bkBuild() {
  for (const k of Object.keys(inputs)) if (k.includes('.banks.')) delete inputs[k];
  const root = $('banks'); root.replaceChildren();
  const i = accIdx(); if (i < 0) return root.append(el('p', 'bkhint', 'Belum ada metode pembayaran bertipe "account" (Transfer Bank) di tab Kontak.'));
  const m = S.admin.payments[i], base = `admin.payments.${i}.banks`;
  root.append(el('p', 'bkhint', 'Seret ikon titik-titik untuk mengurutkan (atau fokus lalu tekan panah atas/bawah). Ikon mata = tampil atau sembunyikan di checkout. Panah di kanan membuka pengaturan logo, warna, dan bentuk.'));
  const list = el('div', 'bklist'); m.banks.forEach((b, j) => { if (!b.id) b.id = uid('bank'); list.append(bkCard(b, `${base}.${j}`, j, m)); }); root.append(list);
  bkSort(list, ids => { m.banks = ids.map(id => m.banks.find(b => b.id === id)); bkBuild(); draw(); });
  if (!m.banks.length) root.append(el('p', 'bkhint', 'Belum ada bank. Klik "Tambah bank".'));
  const two = el('div', 'two'), add = el('button', 'btn sm'), rs = el('button', 'btn sm');
  add.type = rs.type = 'button'; add.append(icon('plus'), ' Tambah bank'); rs.textContent = 'Reset bank ke template awal';
  add.onclick = () => { const b = { id: uid('bank'), name: 'Bank Baru', short: 'BNK', color: '#2563eb', textColor: '#ffffff', number: '', holder: '' }; m.banks.push(b); bkOpen.add(b.id); bkBuild(); draw();
    const c = $('banks').querySelector(`[data-id="${b.id}"]`); c?.scrollIntoView({ block: 'nearest' }); c?.querySelector('.bkn')?.select(); };
  rs.onclick = () => { if (!confirm('Kembalikan SEMUA bank ke template awal? Perubahan di tab Bank akan hilang.')) return; m.banks = structuredClone(tplBanks()); bkOpen.clear(); bkBuild(); draw(); toast('Bank dikembalikan ke template awal.'); };
  two.append(add, rs); root.append(two);
}
function bkPreview() { const m = S.admin.payments[accIdx()]; if (m && prev.state) { prev.state.step = 1; prev.state.method = m.id; prev.state.anim = false; draw(); } }

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
$('stp').onclick = e => { const b = e.target.closest('button'); if (!b || !prev.state) return; prev.state.step = +b.dataset.s; prev.state.anim = true; draw(); };
redo();
