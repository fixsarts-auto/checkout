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

// Daftar bank untuk metode transfer. Format lama (bank/number/holder langsung di metode) tetap didukung.
// Bank bertanda sample:true hanya tampil di demo/pratinjau lokal, tidak pernah di halaman checkout asli.
const banksOf = (m, sample) => (m.banks?.length ? m.banks.map((b, j) => ({ ...b, j })) : m.number ? [{ id: m.id, name: m.bank || m.name, number: m.number, holder: m.holder, j: -1 }] : [])
  .filter(b => !b.hidden && (sample || (b.number && !b.sample)));
const shapeCls = b => b.shape === 'circle' ? ' circle' : b.shape === 'square' ? ' square' : '';
const monogram = b => {
  const s = el('span', 'blogo mono' + shapeCls(b), (b.short || b.name || '?').slice(0, 3).toUpperCase());
  if (b.color) s.style.background = b.color; if (b.textColor) s.style.color = b.textColor; return s;
};
export const bankLogo = b => {
  if (!b.logo) return monogram(b);
  const w = el('span', 'blogo' + shapeCls(b)), i = el('img'); if (b.color) w.style.background = b.color;
  i.alt = ''; i.src = b.logo; i.onerror = () => w.replaceWith(monogram(b)); w.append(i); return w;
};

export function render(root, { order: o, admin: a, demo = false, toast = () => {}, showSamples = false }) {
  const ui = merge(DEFAULT_UI, a.ui || {}), T = ui.texts, F = ui.features, S = o.state, c = o.customer, p = o.pricing, errs = {};
  const tp = 'admin.ui.texts.', redraw = () => render(root, { order: o, admin: a, demo, toast, showSamples });
  const tx = (k, tag = 'span', cls) => ed(el(tag, cls, T[k]), tp + k);
  const to = n => { S.step = n; S.anim = true; redraw(); if (!demo) window.scrollTo({ top: 0, behavior: 'smooth' }); };
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
  const primary = (k, fn) => { const b = el('button', 'btn pri'); b.type = 'button'; b.append(tx(k)); b.onclick = e => { if (e.target.isContentEditable) { e.preventDefault(); return; } fn(); }; return b; };

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
        bp.append(tx('bankHint', 'p', 'bhint'));
        bs.forEach(bk => {
          const t2 = el('div', 'bank' + (S.bank === bk.id ? ' sel' : '')), nm = el('span', 'bn'); t2.tabIndex = 0; t2.setAttribute('role', 'button'); t2.setAttribute('aria-pressed', S.bank === bk.id);
          const nn = el('span', '', bk.name); if (bk.j >= 0) ed(nn, `admin.payments.${i}.banks.${bk.j}.name`); nm.append(nn); if (bk.sample) nm.append(el('small', '', 'contoh'));
          t2.append(bankLogo(bk), nm, el('span', 'dot'));
          const sel = e => {
            if (e.target.isContentEditable) return; S.bank = bk.id; er.textContent = '';
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
  } else {
    const m = curM(), bk = curB(), pay = payLabel();
    // 1) Total yang harus dibayar (paling atas, dengan tombol salin)
    const hero = el('div', 'paytotal'), amt = el('div', 'amt');
    amt.append(el('b', '', rupiah(p.total)));
    if (F.copyAmount) amt.append(iconBtn('copy', 'Salin nominal', async () => toast(await copy(String(p.total)) ? 'Nominal disalin.' : 'Gagal menyalin.'), 'sm'));
    hero.append(tx('totalLabel', 'span', 'k'), amt);
    // 2) Tujuan pembayaran: gambar QRIS atau rekening bank yang dipilih
    const dest = el('section', 'dest'), dh = el('div', 'dh');
    if (m && m.type === 'account') dh.append(bk ? bankLogo(bk) : icon('bank'), el('strong', '', bk ? m.name + ' · ' + bk.name : m.name));
    else dh.append(icon(m?.icon || 'qris'), el('strong', '', m ? m.name : '-'));
    dest.append(tx('payTo', 'span', 'lb'), dh);
    if (m && m.type === 'image') {
      const w = el('div', 'qris'), i = el('img'); i.alt = m.name; i.src = m.image;
      i.onerror = () => w.replaceChildren(el('span', '', 'Upload gambar ke ' + m.image)); w.append(i); dest.append(w);
      if (m.desc) dest.append(el('p', 'hint qh', m.desc));
      const dl = el('a', 'btn dsave'); dl.href = m.image; dl.download = (m.image || 'qris').split('/').pop(); dl.append(icon('download'), tx('save')); dest.append(dl);
    } else if (bk) {
      const acc = [[T.accNo, bk.number, 'num'], [T.accHolder, bk.holder]];
      acc.forEach(([k, v, cls]) => {
        const r = el('div', 'row'), g = el('span', 'rv');
        if (cls) g.append(iconBtn('copy', 'Salin nomor rekening', async () => toast(await copy(String(v)) ? 'Nomor disalin.' : 'Gagal menyalin.'), 'sm'));
        g.append(el('span', 'v ' + (cls || ''), v || '-')); r.append(el('span', 'k', k), g); dest.append(r);
      });
    } else dest.append(el('p', 'hint', 'Pilih metode pembayaran di langkah sebelumnya.'));
    // 3) Ringkas data pesanan
    const rc = el('div', 'recap'), rw = (k, v) => { const r = el('div', 'row'); r.append(k, el('span', 'v', v)); rc.append(r); };
    if (F.orderNumber) rw(tx('orderNo', 'span', 'k'), o.id);
    rw(tx('buyer', 'span', 'k'), c.name.trim() || '-');
    // 4) Kanal konfirmasi: hanya ikon
    const chan = el('div', 'chan'), row2 = el('div', 'chrow'), msg = buildMessage(o, a, pay);
    chan.append(tx('confirmVia', 'span', 'lb'), row2);
    channels(a).filter(ch => F[FEAT[ch.id]]).forEach(ch => {
      const b = el('button', 'chb'); b.type = 'button'; b.title = ch.label; b.setAttribute('aria-label', ch.label); b.append(icon(ch.id));
      b.onclick = async () => {
        if (demo) return toast('Demo: pesan ' + ch.label + ' siap dikirim.');
        if (ch.copy) toast(await copy(msg) ? 'Pesan disalin, tempel di chat ' + ch.label + '.' : 'Gagal menyalin pesan.');
        go(ch.url(msg, o)); };
      row2.append(b);
    });
    box.append(hero, dest, rc, chan, ed(el('p', 'hint', a.note), 'admin.note'), back(1));
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
  const rBuyer = row(tx('buyer'), c.name.trim() || '-'), rPay = row(tx('method'), payLabel() || '-');
  syncBuyer = () => { rBuyer.hidden = !c.name.trim(); rBuyer.lastChild.textContent = c.name.trim() || '-'; };
  syncPay = () => { rPay.hidden = !curM(); rPay.lastChild.textContent = payLabel() || '-'; };
  syncBuyer(); syncPay();
  sb.append(rBuyer, rPay, el('hr'), row(tx('totalLabel'), rupiah(p.total)));
  side.append(tg, sb);

  const shell = el('div', 'shell'); shell.append(left, side); const stage = el('div', 'stage'); stage.append(shell); root.append(stage);
}
