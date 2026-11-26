export const rupiah = n => 'Rp ' + new Intl.NumberFormat('id-ID').format(n);
// Harga satu baris item. Diskon dihitung per unit, lalu dikali jumlah (qty).
export function calc(pkg, code = 0, qty = 1) {
  const d = pkg.discount, unit = pkg.price;
  const discUnit = !d ? 0 : d.type === 'percent' ? Math.round(unit * d.value / 100) : Math.min(d.value, unit);
  const base = unit * qty, disc = discUnit * qty;
  return { unit, discUnit, base, disc, code, total: base - disc + code };
}
// Kode unik (maks 3 digit) yang stabil untuk satu nomor pesanan (hash FNV-1a), agar transfer mudah dicocokkan.
export function uniqueCode(id, min = 1, max = 999) {
  min = Math.max(1, Math.min(999, Math.round(min) || 1)); max = Math.max(min, Math.min(999, Math.round(max) || 999));
  let h = 2166136261; for (const ch of String(id)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return min + h % (max - min + 1);
}
