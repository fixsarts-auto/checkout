/* Fixs.Arts Checkout, tombol Beli otomatis.
   Pasang di website penjualan (sekali per halaman):
     <script src="https://fixsarts-auto.github.io/checkout/fa-checkout.js" defer></script>
   Tombol:
     <a data-fa-product="logo-design" data-fa-package="premium">Beli</a>
   Katalog dicari otomatis di folder halaman ini (data/products.json atau products.json), lalu folder induknya.
  Opsional: data-fa-base="/folder/tujuan" pada tag script untuk mengunci alamat website secara manual. */
(() => {
  const me = document.currentScript;
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
  const link = el => {
    const p = el.dataset.faProduct, k = el.dataset.faPackage;
    return p && k ? `${CHECKOUT}?site=${encodeURIComponent(siteBase())}&product=${encodeURIComponent(p)}&package=${encodeURIComponent(k)}` : null;
  };
  const fill = () => document.querySelectorAll('a[data-fa-product]').forEach(a => { const u = link(a); if (u) a.href = u; });
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-fa-product]'), u = el && link(el);
    if (u) { e.preventDefault(); location.href = u; }
  });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fill) : fill();
})();
