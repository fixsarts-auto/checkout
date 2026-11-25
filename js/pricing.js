export const rupiah = n => 'Rp ' + new Intl.NumberFormat('id-ID').format(n);
export function calc(pkg) {
  const d = pkg.discount, base = pkg.price;
  const disc = !d ? 0 : d.type === 'percent' ? Math.round(base * d.value / 100) : Math.min(d.value, base);
  return { base, disc, total: base - disc };
}
