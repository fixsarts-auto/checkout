import { icon, PLATFORMS, LABEL } from './icons.js';
import { rupiah } from './pricing.js';
import { refresh, maxQtyOf, MAX_LINES } from './catalog.js';
import { toggleTheme } from './theme.js';
import { validateCustomer } from './validators.js';
import { buildMessage, channels, copy, go } from './message.js';
import { DEFAULT_UI, merge } from './defaults.js';

export const el = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const ed = (e, path) => { if (path) e.dataset.path = path; return e; };
const iconBtn = (name, label, fn, cls = '') => {
  const b = el('button', 'icon-btn ' + cls); b.type = 'button'; b.setAttribute('aria-label', label); b.append(icon(name));
  b.onclick = name !== 'copy' ? fn : async e => { await fn(e); const first = b.firstChild; b.classList.add('ok'); b.replaceChildren(icon('check')); setTimeout(() => { b.classList.remove('ok'); b.replaceChildren(first); }, 1400); };
  return b;
};
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
  .filter(b => !b.hidden && (sample || ((b.number || b.url) && !b.sample)));
const shapeCls = b => b.shape === 'circle' ? ' circle' : b.shape === 'square' ? ' square' : '';
const monogram = b => {
  const s = el('span', 'blogo mono' + shapeCls(b), (b.short || b.name || '?').slice(0, 3).toUpperCase());
  if (b.color) s.style.background = b.color; if (b.textColor) s.style.color = b.textColor; return s;
};
// Logo yang diunggah memenuhi badge dengan latar transparan. Latar bantuan (logoBg) dan bentuk (shape) bersifat opsional.
export const bankLogo = b => {
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

export function render(root, args) {
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
