import { icon, PLATFORMS, LABEL } from './icons.js';
import { rupiah } from './pricing.js';
import { toggleTheme } from './theme.js';
import { validateCustomer } from './validators.js';
import { buildMessage, channels, copy, go } from './message.js';
import { DEFAULT_UI, merge } from './defaults.js';

export const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const ed = (e, path) => { if (path) e.dataset.path = path; return e; };
const iconBtn = (name, label, fn, cls = '') => { const b = el('button', 'icon-btn ' + cls); b.type = 'button'; b.setAttribute('aria-label', label); b.append(icon(name)); b.onclick = fn; return b; };
const FEAT = { whatsapp: 'channelWhatsapp', instagram: 'channelInstagram', tiktok: 'channelTiktok', email: 'channelEmail' };

export function renderError(root, title, msg) {
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

export function render(root, { order: o, admin: a, demo = false, toast = () => {} }) {
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
