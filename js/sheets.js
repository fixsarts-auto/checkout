// Pencatatan pesanan ke Google Sheets lewat Google Apps Script (gratis, tanpa API key berbayar).
// Pengaturan: admin.sheets = { enabled: true, url: "https://script.google.com/macros/s/.../exec" }
// Pengiriman memakai sendBeacon / fetch no-cors (permintaan sederhana, tanpa preflight CORS), jadi tetap terkirim
// walau halaman langsung berpindah ke WhatsApp. Respons tidak bisa dibaca; ini murni catatan, bukan bukti pembayaran.
export function sheetsPayload(ev, { order: o, method = '', bank = '', via = '' }) {
  const c = o.customer, S = o.state;
  return { v: 1, event: ev, orderId: o.id, site: o.site.id, siteName: o.site.name, created: S.created || Date.now(), ts: Date.now(),
    customer: { name: c.name.trim(), contact: (c.wa || c.email || '').trim(), social: c.handle.trim() ? c.platform + ': ' + c.handle.trim() : '' },
    items: o.lines.map(l => ({ pid: l.pid, kid: l.kid, name: l.product.name, pkg: l.pkg.name, qty: l.qty, unit: l.unit, disc: l.disc, total: l.total })),
    pricing: { base: o.pricing.base, disc: o.pricing.disc, code: o.pricing.code, total: o.pricing.total },
    payment: { method, bank }, via };
}
export function sheetsSend(a, payload) {
  const u = a?.sheets?.url;
  if (!u || a.sheets.enabled === false || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(u)) return false;
  const body = JSON.stringify(payload);
  try { if (navigator.sendBeacon && navigator.sendBeacon(u, new Blob([body], { type: 'text/plain;charset=UTF-8' }))) return true; } catch {}
  try { fetch(u, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body }).catch(() => {}); return true; } catch { return false; }
}
