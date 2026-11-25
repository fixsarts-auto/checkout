// Data contoh untuk pratinjau lokal (file://) dan demo.html.
export const DEFAULTS = {
  admin: {
    brand: 'Fixs.Arts', wa: '6281234567890', email: 'admin@fixsarts.com', instagram: 'fixs.arts', tiktok: 'fixs.arts',
    note: 'Pembayaran diverifikasi manual oleh admin, maksimal 1×24 jam.',
    payments: [
      { id: 'qris', name: 'QRIS', desc: 'Scan dengan aplikasi bank atau e-wallet', type: 'image', image: 'assets/payment/qris.jpg' },
      { id: 'bank', name: 'Transfer Bank (contoh)', desc: 'Transfer manual ke rekening', type: 'account', bank: 'BCA', number: '1234567890', holder: 'Fixs Arts' }
    ]
  },
  site: { id: 'demo', name: 'Demo Store' },
  catalog: { version: 1, currency: 'IDR', products: {
    'logo-design': { name: 'Desain Logo', packages: { basic: { name: 'Basic', price: 150000 }, premium: { name: 'Premium', price: 400000, discount: { type: 'percent', value: 10, label: 'Promo Launching' } } } },
    'social-kit': { name: 'Social Media Kit', packages: { starter: { name: 'Starter', price: 250000 } } } } }
};

export const merge = (a, b) => { const o = Array.isArray(a) ? [...a] : { ...a };
  for (const k in b) o[k] = b[k] && typeof b[k] === 'object' && a && a[k] && typeof a[k] === 'object' ? merge(a[k], b[k]) : b[k]; return o; };

// Semua tampilan bisa diubah lewat admin.ui (opsional). Yang tidak diisi memakai nilai ini.
export const DEFAULT_UI = {
  radius: 28,
  font: "'Plus Jakarta Sans',system-ui,sans-serif",
  features: { stepper: true, themeToggle: true, contact: true, socialMedia: true, orderNumber: true, discount: true, copyAmount: true,
    channelWhatsapp: true, channelInstagram: true, channelTiktok: true, channelEmail: true, collapsibleSummary: true, animations: true },
  texts: {
    step1: 'Data', step2: 'Pembayaran', step3: 'Konfirmasi',
    t1: 'Data Pembeli', s1: 'Isi data kamu agar admin bisa menghubungi dan memproses pesanan.',
    t2: 'Metode Pembayaran', s2: 'Pilih metode, lalu bayar sesuai total pesanan.',
    t3: 'Konfirmasi Pembayaran', s3: 'Kirim bukti pembayaran ke admin lewat salah satu kanal di bawah.',
    name: 'Nama lengkap', namePh: 'Nama kamu', contact: 'WhatsApp/Email', contactPh: '0812 3456 7890 atau nama@email.com',
    social: 'Media Sosial (Opsional)', socialPh: '@username',
    toPay: 'Lanjut ke Pembayaran', toConfirm: 'Lanjut ke Konfirmasi', back: 'Kembali', done: 'Sudah bayar, lanjut',
    payHint: 'Ketuk metode untuk melihat detail pembayaran.',
    sumTitle: 'Ringkasan Pesanan', sumSub: 'Pesanan diverifikasi manual oleh admin.', totalLabel: 'Total pembayaran',
    subtotal: 'Subtotal', discount: 'Diskon', orderNo: 'Nomor pesanan', buyer: 'Pembeli', method: 'Metode',
    footer: 'Dengan melanjutkan, kamu menyetujui bahwa pembayaran diverifikasi manual oleh admin.'
  },
  colors: {
    dark: { bg: '#050505', panel: '#0c0c0d', side: '#171718', ink: '#f4f4f5', mut: '#85858d', ac: '#3b82f6', onac: '#ffffff', bd: '#27272b', fld: '#171718' },
    light: { bg: '#e9e9ec', panel: '#ffffff', side: '#f4f4f6', ink: '#16161a', mut: '#74747c', ac: '#2563eb', onac: '#ffffff', bd: '#e2e2e7', fld: '#f2f2f5' }
  }
};
