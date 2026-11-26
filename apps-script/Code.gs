/**
 * Fixs.Arts Checkout -> Google Sheets (Google Apps Script, gratis tanpa API key).
 * Cara pasang: lihat README.md bagian "Pencatatan ke Google Sheets".
 *
 * Alur status per pesanan (satu baris di sheet "Pesanan", diperbarui otomatis oleh checkout):
 *   Data Diisi -> Menunggu Pembayaran -> Bukti Dikirim            (otomatis, hanya naik)
 *   Kedaluwarsa                                                    (otomatis bila timer habis, sebelum bukti dikirim)
 *   Lunas / Diproses / Selesai / Batal                             (diisi MANUAL oleh admin; tidak pernah ditimpa checkout)
 *
 * Catatan keamanan: URL web app ini publik, jadi isi sheet adalah CATATAN, bukan bukti pembayaran.
 * Tetap cocokkan dengan mutasi rekening/e-wallet sebelum menandai Lunas. Kolom "Cek" menandai total yang tidak cocok.
 */
var CFG = {
  ORDERS: 'Pesanan',
  ITEMS: 'Item',
  NOTIFY_EMAIL: '',                    // isi email untuk notifikasi, kosongkan untuk mematikan
  NOTIFY_ON: ['Bukti Dikirim'],        // status yang memicu email
  MAX_ITEMS: 30,
  RATE_PER_MIN: 60                     // batas permintaan per menit (anti-spam sederhana)
};
var HEAD = ['Dibuat', 'Update', 'No. Pesanan', 'Status', 'Nama', 'Kontak', 'Media Sosial', 'Item', 'Jml Item', 'Subtotal', 'Diskon', 'Kode Unik', 'Total', 'Metode', 'Bank / E-Wallet', 'Kanal Konfirmasi', 'Website', 'Cek', 'Catatan Admin'];
var C = { CREATED: 0, UPDATED: 1, ID: 2, STATUS: 3, NAME: 4, CONTACT: 5, SOCIAL: 6, ITEMS: 7, COUNT: 8, BASE: 9, DISC: 10, CODE: 11, TOTAL: 12, METHOD: 13, BANK: 14, VIA: 15, SITE: 16, CHECK: 17, NOTE: 18 };
var ITEM_HEAD = ['Waktu', 'No. Pesanan', 'Produk', 'Paket', 'Qty', 'Harga Satuan', 'Diskon', 'Total'];
var EVENT_STATUS = { data: 'Data Diisi', bayar: 'Menunggu Pembayaran', kirim: 'Bukti Dikirim', kedaluwarsa: 'Kedaluwarsa' };
var RANK = { 'Data Diisi': 1, 'Menunggu Pembayaran': 2, 'Kedaluwarsa': 2, 'Bukti Dikirim': 3 };
var STATUS_LIST = ['Data Diisi', 'Menunggu Pembayaran', 'Bukti Dikirim', 'Lunas', 'Diproses', 'Selesai', 'Kedaluwarsa', 'Batal'];

/** Jalankan SEKALI dari editor Apps Script (tombol Run) untuk menyiapkan sheet. */
function setup() {
  var sh = sheet_(CFG.ORDERS, HEAD), it = sheet_(CFG.ITEMS, ITEM_HEAD), n = Math.max(sh.getMaxRows() - 1, 1), m = Math.max(it.getMaxRows() - 1, 1);
  [sh, it].forEach(function (s, i) {
    var w = i ? ITEM_HEAD.length : HEAD.length;
    s.setFrozenRows(1); s.getRange(1, 1, 1, w).setFontWeight('bold').setBackground('#111111').setFontColor('#ffffff');
  });
  sh.getRange(2, C.CREATED + 1, n, 2).setNumberFormat('dd/MM/yyyy HH:mm');
  [C.ID, C.NAME, C.CONTACT, C.SOCIAL, C.ITEMS, C.METHOD, C.BANK, C.VIA, C.SITE].forEach(function (c) { sh.getRange(2, c + 1, n, 1).setNumberFormat('@'); });
  [C.BASE, C.DISC, C.CODE, C.TOTAL].forEach(function (c) { sh.getRange(2, c + 1, n, 1).setNumberFormat('"Rp" #,##0'); });
  sh.getRange(2, C.STATUS + 1, n, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUS_LIST, true).setAllowInvalid(true).build());
  it.getRange(2, 1, m, 1).setNumberFormat('dd/MM/yyyy HH:mm');
  it.getRange(2, 6, m, 3).setNumberFormat('"Rp" #,##0');
  sh.setColumnWidth(C.ITEMS + 1, 320); sh.setColumnWidth(C.NAME + 1, 160);
}

function doGet() { return json_({ ok: true, service: 'Fixs.Arts Checkout' }); }

function doPost(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'json' }); }
  var bad = validate_(d); if (bad) return json_({ ok: false, error: bad });
  if (limited_()) return json_({ ok: false, error: 'rate' });
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try { return json_(save_(d)); } finally { lock.releaseLock(); }
}

function save_(d) {
  var sh = sheet_(CFG.ORDERS, HEAD), now = new Date(), last = sh.getLastRow(), at = -1, cur = null;
  if (last > 1) {
    var ids = sh.getRange(2, C.ID + 1, last - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === d.orderId) { at = i + 2; break; }
    if (at > 0) cur = sh.getRange(at, 1, 1, HEAD.length).getValues()[0];
  }
  var curStatus = cur ? String(cur[C.STATUS]) : '';
  if (cur && !(curStatus in RANK)) return { ok: true, ignored: 'locked' };     // sudah diubah manual (Lunas, Batal, ...)

  var status = nextStatus_(curStatus, d.event), sum = 0, lines = [], count = 0;
  d.items.forEach(function (x) { sum += x.total; count += x.qty; lines.push(x.name + ' · ' + x.pkg + (x.qty > 1 ? ' ×' + x.qty : '')); });
  var itemsText = lines.join('; '), check = sum + d.pricing.code === d.pricing.total ? 'OK' : 'Total tidak cocok';
  var row = [];
  row[C.CREATED] = cur ? cur[C.CREATED] : new Date(d.created);
  row[C.UPDATED] = now; row[C.ID] = d.orderId; row[C.STATUS] = status;
  row[C.NAME] = safe_(d.customer.name); row[C.CONTACT] = safe_(d.customer.contact); row[C.SOCIAL] = safe_(d.customer.social);
  row[C.ITEMS] = safe_(itemsText); row[C.COUNT] = count;
  row[C.BASE] = d.pricing.base; row[C.DISC] = d.pricing.disc; row[C.CODE] = d.pricing.code; row[C.TOTAL] = d.pricing.total;
  row[C.METHOD] = safe_(d.payment.method); row[C.BANK] = safe_(d.payment.bank);
  row[C.VIA] = safe_(d.via || (cur ? cur[C.VIA] : '')); row[C.SITE] = safe_(d.site); row[C.CHECK] = check;
  row[C.NOTE] = cur ? cur[C.NOTE] : '';
  if (at > 0) sh.getRange(at, 1, 1, HEAD.length).setValues([row]); else sh.appendRow(row);
  if (!cur || String(cur[C.ITEMS]) !== itemsText || String(cur[C.TOTAL]) !== String(d.pricing.total)) writeItems_(d, now);

  if (status !== curStatus && CFG.NOTIFY_EMAIL && CFG.NOTIFY_ON.indexOf(status) >= 0) notify_(d, status, itemsText);
  return { ok: true, status: status };
}

function nextStatus_(cur, ev) {
  var want = EVENT_STATUS[ev];
  if (!cur) return want;
  if (ev === 'kedaluwarsa') return RANK[cur] < 3 ? want : cur;
  return RANK[want] >= RANK[cur] ? want : cur;                    // status hanya boleh naik
}

function writeItems_(d, now) {
  var it = sheet_(CFG.ITEMS, ITEM_HEAD), last = it.getLastRow();
  if (last > 1) {
    var ids = it.getRange(2, 2, last - 1, 1).getValues();
    for (var i = ids.length - 1; i >= 0; i--) if (String(ids[i][0]) === d.orderId) it.deleteRow(i + 2);
  }
  var rows = d.items.map(function (x) { return [now, d.orderId, safe_(x.name), safe_(x.pkg), x.qty, x.unit, x.disc, x.total]; });
  if (rows.length) it.getRange(it.getLastRow() + 1, 1, rows.length, ITEM_HEAD.length).setValues(rows);
}

function notify_(d, status, itemsText) {
  try {
    MailApp.sendEmail(CFG.NOTIFY_EMAIL, '[' + status + '] ' + d.orderId + ' · Rp ' + d.pricing.total,
      'Pesanan ' + d.orderId + '\nStatus: ' + status + '\nNama: ' + d.customer.name + '\nKontak: ' + d.customer.contact +
      '\nItem: ' + itemsText + '\nTotal: Rp ' + d.pricing.total + '\nMetode: ' + d.payment.method + ' ' + d.payment.bank + '\nKanal: ' + d.via +
      '\n\nCocokkan dengan mutasi sebelum menandai Lunas.');
  } catch (err) { /* kuota email habis: abaikan */ }
}

// ---------- validasi & utilitas ----------
function validate_(d) {
  if (!d || d.v !== 1 || !EVENT_STATUS[d.event]) return 'format';
  if (typeof d.orderId !== 'string' || !/^[A-Za-z0-9-]{6,40}$/.test(d.orderId)) return 'id';
  if (!d.customer || !d.pricing || !d.payment || !Array.isArray(d.items) || d.items.length < 1 || d.items.length > CFG.MAX_ITEMS) return 'data';
  d.created = Number(d.created) || Date.now();
  d.site = str_(d.site, 80); d.via = str_(d.via, 30);
  d.customer = { name: str_(d.customer.name, 80), contact: str_(d.customer.contact, 80), social: str_(d.customer.social, 80) };
  d.payment = { method: str_(d.payment.method, 60), bank: str_(d.payment.bank, 60) };
  var p = d.pricing; d.pricing = { base: money_(p.base), disc: money_(p.disc), code: money_(p.code), total: money_(p.total) };
  for (var k in d.pricing) if (d.pricing[k] === null) return 'harga';
  for (var i = 0; i < d.items.length; i++) {
    var x = d.items[i], qty = Number(x.qty);
    if (!(qty >= 1 && qty <= 99 && qty % 1 === 0)) return 'qty';
    d.items[i] = { name: str_(x.name, 80), pkg: str_(x.pkg, 80), qty: qty, unit: money_(x.unit), disc: money_(x.disc), total: money_(x.total) };
    if (d.items[i].unit === null || d.items[i].disc === null || d.items[i].total === null) return 'harga';
  }
  return '';
}
function str_(v, n) { return String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n); }
function money_(v) { v = Number(v); return isFinite(v) && v >= 0 && v <= 1e10 && v % 1 === 0 ? v : null; }
// Cegah formula injection: teks yang diawali = + - @ dijadikan teks biasa.
function safe_(v) { v = String(v == null ? '' : v); return /^[=+\-@\t\r]/.test(v) ? "'" + v : v; }
function limited_() {
  var cache = CacheService.getScriptCache(), k = 'rl' + Math.floor(Date.now() / 60000), n = Number(cache.get(k) || 0) + 1;
  cache.put(k, String(n), 120); return n > CFG.RATE_PER_MIN;
}
function sheet_(name, head) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), s = ss.getSheetByName(name) || ss.insertSheet(name);
  if (s.getLastRow() === 0) s.appendRow(head);
  return s;
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
