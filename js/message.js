import { rupiah } from './pricing.js';
import { LABEL } from './icons.js';
const q = encodeURIComponent, dg = s => String(s).replace(/\D/g, '');

export function buildMessage(o, a, pay = '') {
  const c = o.customer, p = o.pricing;
  return ['Halo Admin ' + a.brand + ', saya sudah melakukan pembayaran.', '',
    `No. Pesanan: ${o.id}`, `Website: ${o.site.name === o.site.id ? o.site.id : o.site.name + ' (' + o.site.id + ')'}`,
    `Produk: ${o.product.name} [${o.product.id}]`, `Paket: ${o.pkg.name} [${o.pkg.id}]`,
    `Harga: ${rupiah(p.base)}`, `Diskon: -${rupiah(p.disc)}`, `Total Bayar: ${rupiah(p.total)}`, pay ? `Metode: ${pay}` : null, '',
    `Nama: ${c.name.trim() || '-'}`,
    c.wa.trim() ? `WhatsApp: ${c.wa.trim()}` : null,
    c.email.trim() ? `Email: ${c.email.trim()}` : null,
    c.handle.trim() ? `${LABEL[c.platform]}: ${c.handle.trim()}` : null,
    '', 'Bukti transfer saya lampirkan. Mohon diverifikasi, terima kasih.'
  ].filter(x => x !== null).join('\n');
}

export const channels = a => [
  { id: 'whatsapp', label: 'WhatsApp', url: m => `https://wa.me/${dg(a.wa)}?text=${q(m)}` },
  { id: 'instagram', label: 'Instagram', copy: true, url: () => `https://ig.me/m/${q(a.instagram)}` },
  { id: 'tiktok', label: 'TikTok', copy: true, url: () => `https://www.tiktok.com/@${q(a.tiktok)}` },
  { id: 'email', label: 'Email', url: (m, o) => `mailto:${a.email}?subject=${q('Konfirmasi Pembayaran ' + o.id)}&body=${q(m)}` }
];
export async function copy(t) { try { await navigator.clipboard.writeText(t); return true; } catch { return false; } }
export const go = u => u.startsWith('mailto:') ? (location.href = u) : window.open(u, '_blank', 'noopener');
