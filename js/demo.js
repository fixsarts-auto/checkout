import './theme.js';
import { render, el } from './render.js';
import { buildOrder } from './catalog.js';
import { toggleTheme } from './theme.js';
import { DEFAULTS, DEFAULT_UI, merge } from './defaults.js';

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
