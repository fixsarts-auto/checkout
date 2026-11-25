/* Fixs.Arts Checkout, tombol Beli otomatis.
   Pasang di website penjualan (sekali per halaman):
     <script src="https://fixsarts-auto.github.io/checkout/fa-checkout.js" defer></script>
   Tombol:
     <a data-fa-product="logo-design" data-fa-package="premium">Beli</a>
   Opsional: data-fa-base="/" pada tag script bila website berada di root akun (nama-akun.github.io). */
(() => {
  const me = document.currentScript;
  const CHECKOUT = me && me.src ? new URL('./', me.src).href : 'https://fixsarts-auto.github.io/checkout/';
  const siteBase = () => {
    let path = '';
    const forced = me && me.dataset.faBase;
    if (forced != null) path = forced;
    else if (location.hostname.endsWith('.github.io')) {
      const seg = location.pathname.split('/')[1] || '';
      path = seg && !/\.[a-z0-9]+$/i.test(seg) ? '/' + seg : '';
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
