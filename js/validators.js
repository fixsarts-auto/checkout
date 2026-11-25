export const normWa = v => { let d = String(v).replace(/\D/g, ''); if (d.startsWith('0')) d = '62' + d.slice(1); return d; };
export function validateCustomer(c, f = { wa: true, email: true }) {
  const e = {}, n = c.name.trim(), wa = f.wa ? c.wa.trim() : '', em = f.email ? c.email.trim() : '';
  if (n.length < 2 || n.length > 60) e.name = 'Nama wajib diisi (2–60 karakter).';
  if ((f.wa || f.email) && !wa && !em) e.contact = f.wa && f.email ? 'Isi WhatsApp atau Email, minimal salah satu.' : 'Kolom ini wajib diisi.';
  if (wa) { const d = normWa(wa); if (d.length < 9 || d.length > 15) e.wa = 'Nomor WhatsApp tidak valid.'; }
  if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) e.email = 'Format email tidak valid.';
  if (c.handle.trim() && !/^[\w.@-]{1,50}$/.test(c.handle.trim())) e.handle = 'Username tidak valid.';
  return e;
}
