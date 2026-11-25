/*
 * Fixs.Arts Checkout, skrip tombol.
 * Pasang di website penjualan:
 *   <script src="https://fixsarts-auto.github.io/checkout/button.js"></script>
 * Lalu beri atribut pada tombol: data-product="id-produk" data-package="id-paket"
 * ID website diambil otomatis dari alamat (fixsarts-auto.github.io/NAMA-REPO/).
 * Untuk domain lain: <script src="..." data-site="nama-website"></script> dan daftarkan di config/sites.json.
 */
(() => {
  const CHECKOUT = 'https://fixsarts-auto.github.io/checkout/';
  const ID = /^[a-z0-9-]{1,40}$/;
  const me = document.currentScript;
  let site = me && me.dataset.site;
  if (!site && location.hostname === 'fixsarts-auto.github.io') site = location.pathname.split('/')[1];
  if (!site || !ID.test(site)) return console.error('[Fixs.Arts Checkout] ID website tidak terdeteksi. Tambahkan data-site="..." pada tag script.');
  const link = el => {
    const p = el.dataset.product, k = el.dataset.package;
    return ID.test(p || '') && ID.test(k || '') ? `${CHECKOUT}?site=${site}&product=${p}&package=${k}` : null;
  };
  const init = () => document.querySelectorAll('a[data-product][data-package]').forEach(a => { const u = link(a); if (u) a.href = u; });
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-product][data-package]'), u = el && link(el);
    if (u) { e.preventDefault(); location.href = u; }
  });
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
