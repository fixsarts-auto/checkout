/* Fixs.Arts Checkout, tombol Beli + keranjang otomatis.
   Pasang di website penjualan (sekali per halaman):
     <script src="https://fixsarts-auto.github.io/checkout/fa-checkout.js" defer></script>

   1) Beli langsung satu item:
        <a data-fa-product="logo-design" data-fa-package="premium">Beli</a>
   2) Beberapa item langsung (format produk:paket:jumlah, pisahkan dengan koma):
        <a data-fa-items="logo-design:premium:1,social-kit:basic:2">Beli paket gabungan</a>
   3) Keranjang di website (tersimpan di browser pengunjung):
        <button data-fa-add="logo-design:premium">Tambah ke pesanan</button>      (opsional data-fa-qty="2")
        <a data-fa-cart>Checkout (<span data-fa-cart-count>0</span>)</a>
      JS: FACheckout.add(pid, kid, qty) / remove(pid, kid) / clear() / items() / count() / url()
      Event: window "fa:cartchange". Keranjang dikosongkan otomatis setelah pembeli menekan "Kembali ke website".

   Katalog dicari otomatis di folder halaman ini (data/products.json atau products.json), lalu folder induknya.
   Opsional: data-fa-base="/folder/tujuan" pada tag script untuk mengunci alamat website secara manual. */
(() => {
  const me = document.currentScript, ID = /^[a-z0-9-]{1,40}$/, enc = encodeURIComponent;
  const CHECKOUT = me && me.src ? new URL('./', me.src).href : 'https://fixsarts-auto.github.io/checkout/';
  // Alamat website = folder halaman ini (boleh bersarang, mis. /home/Section/Jadwal%20Kerja/). Checkout mencari
  // katalog dari folder ini naik ke folder induk. Pakai data-fa-base="/home" bila ingin mengunci ke satu folder.
  const siteBase = () => {
    const forced = me && me.dataset.faBase;
    let path = '';
    if (forced != null) path = forced;
    else {
      const segs = location.pathname.split('/').filter(Boolean);
      if (segs.length && /\.[a-z][a-z0-9]{0,4}$/i.test(segs[segs.length - 1])) segs.pop(); // buang nama file
      path = segs.length ? '/' + segs.join('/') : '';
    }
    return location.origin + path.replace(/\/$/, '');
  };

  // ---- keranjang (localStorage per website) ----
  const KEY = 'fa-cart:' + siteBase();
  const clean = list => {
    const out = [];
    for (const x of Array.isArray(list) ? list : []) {
      if (!x || !ID.test(x.pid || '') || !ID.test(x.kid || '')) continue;
      const qty = Math.min(99, Math.max(1, parseInt(x.qty, 10) || 1)), hit = out.find(i => i.pid === x.pid && i.kid === x.kid);
      if (hit) hit.qty = Math.min(99, hit.qty + qty); else if (out.length < 20) out.push({ pid: x.pid, kid: x.kid, qty });
    }
    return out;
  };
  const load = () => { try { return clean(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { return []; } };
  const save = list => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {} sync(); window.dispatchEvent(new CustomEvent('fa:cartchange', { detail: { items: list } })); };
  const param = list => list.map(i => `${i.pid}:${i.kid}:${i.qty}`).join(',');
  const urlFor = list => list.length ? `${CHECKOUT}?site=${enc(siteBase())}&items=${enc(param(list))}&ret=${enc(location.href)}` : null;
  const api = window.FACheckout = {
    items: load, count: () => load().reduce((s, i) => s + i.qty, 0), url: () => urlFor(load()),
    add(pid, kid, qty = 1) { save(clean([...load(), { pid, kid, qty }])); },
    remove(pid, kid) { save(load().filter(i => !(i.pid === pid && i.kid === kid))); },
    clear() { save([]); }
  };

  // ---- tautan beli langsung ----
  const direct = el => {
    if (el.dataset.faItems) { const l = clean(el.dataset.faItems.split(',').map(s => { const [pid, kid, q] = s.trim().split(':'); return { pid, kid, qty: q }; })); return urlFor(l); }
    const p = el.dataset.faProduct, k = el.dataset.faPackage;
    return p && k ? urlFor(clean([{ pid: p, kid: k, qty: 1 }])) : null;
  };
  function sync() {
    document.querySelectorAll('a[data-fa-product],a[data-fa-items]').forEach(a => { const u = direct(a); if (u) a.href = u; });
    const n = api.count(), u = api.url();
    document.querySelectorAll('[data-fa-cart-count]').forEach(e => { e.textContent = n; });
    document.querySelectorAll('[data-fa-cart]').forEach(a => { if (u) a.href = u; else a.removeAttribute('href'); a.classList.toggle('fa-empty', !n); });
  }
  document.addEventListener('click', e => {
    const add = e.target.closest('[data-fa-add]');
    if (add) {
      e.preventDefault(); const [pid, kid] = add.dataset.faAdd.split(':');
      if (ID.test(pid || '') && ID.test(kid || '')) { api.add(pid, kid, add.dataset.faQty); add.classList.add('fa-added'); setTimeout(() => add.classList.remove('fa-added'), 1200); }
      return;
    }
    const cart = e.target.closest('[data-fa-cart]');
    if (cart) { e.preventDefault(); const u = api.url(); if (u) location.href = u; return; }
    const el = e.target.closest('[data-fa-product],[data-fa-items]'), u = el && direct(el);
    if (u) { e.preventDefault(); location.href = u; }
  });
  // kembali dari checkout setelah pesanan terkirim -> kosongkan keranjang
  try { const u = new URL(location.href); if (u.searchParams.has('fa_paid')) { u.searchParams.delete('fa_paid'); history.replaceState(null, '', u.href); try { localStorage.removeItem(KEY); } catch {} } } catch {}
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', sync) : sync();
})();
