# checkout
Centralized Checkout & Payment System

## Menambah bank & logo
Di `config/admin.js` (atau lewat `demo.html`), metode `type: "account"` punya daftar `banks`:

    { "id": "bca", "name": "BCA", "logo": "assets/banks/bca.svg", "number": "1234567890", "holder": "Nama Pemilik" }

- `logo` (opsional): taruh file di `assets/banks/`. Tanpa logo, tampil badge singkatan (`short`) berwarna (`color`).
- `sample: true` menandai bank contoh. Bank contoh hanya tampil di demo/pratinjau lokal, TIDAK tampil di checkout asli. Hapus `sample` bila rekening itu benar-benar milikmu.

## Menghubungkan website penjualan (folder bersarang didukung)
Pasang sekali di halaman penjualan, lalu beri atribut pada tombol:

    <script src="https://fixsarts-auto.github.io/checkout/fa-checkout.js" defer></script>
    <a data-fa-product="id-produk" data-fa-package="id-paket">Beli</a>

Alamat website diambil otomatis dari **folder halaman itu**, termasuk yang bersarang
(mis. `https://designjoomax.github.io/home/Section/Jadwal%20Kerja/`). Checkout mencari katalog dari
folder paling dalam naik ke folder induk, dan memakai yang pertama ketemu:

1. `<folder>/data/products.json`
2. `<folder>/products.json`
3. lanjut ke folder di atasnya, sampai root domain

Jadi bisa satu katalog bersama (mis. `home/data/products.json`) atau katalog sendiri per folder
(`home/Section/Jadwal Kerja/data/products.json`). Katalog di folder yang lebih dalam menang.
Origin website harus terdaftar di `allowedOrigins` pada `config/sites.json`.
`data-fa-base="/home"` pada tag script mengunci alamat website secara manual.

Saran: pakai nama folder tanpa spasi dan huruf kecil (`jadwal-kerja`). Spasi tetap jalan, tapi GitHub Pages
membedakan huruf besar/kecil sehingga URL lebih gampang salah ketik.

Mode alternatif (terdaftar): tambahkan di `sites` pada `config/sites.json`, lalu pakai `data-site="nama"` di tag script `button.js`.
`catalog` boleh path relatif atau URL penuh dengan origin yang ada di `allowedOrigins`:

    "jadwal-kerja": { "name": "Jadwal Kerja", "catalog": "https://designjoomax.github.io/home/Section/Jadwal%20Kerja/products.json" }

## Mengatur bank lewat editor (demo.html, tab "Bank")
- Seret ikon titik-titik untuk mengubah urutan (mouse/sentuh; keyboard: fokus lalu panah atas/bawah).
- Ikon mata menyembunyikan bank dari checkout (`"hidden": true`). Ikon tempat sampah menghapus, tombol "Tambah bank" menambah.
- Per bank: nomor rekening, atas nama, singkatan badge, unggah logo, warna shape (`color`), warna teks (`textColor`), bentuk (`shape`: rounded/circle/square).
- Logo yang diunggah diperkecil (maks 160 px) dan tertanam di `admin.js`. Kalau lebih suka file, taruh di `assets/banks/` lalu isi kolom path logo.
- "Reset gaya bank ini" dan "Reset bank ke template awal" mengembalikan ke isi `config/admin.js` yang sedang dimuat editor.
- Setelah selesai klik "Unduh admin.js", lalu timpa `config/admin.js` di repo.
- Bank tanpa nomor rekening tidak tampil di checkout asli.

## Fitur checkout lanjutan
- **Kode unik nominal**: 1–999 ditambahkan ke total, stabil per nomor pesanan (tampil di ringkasan, pesan WhatsApp, dan 3 digit terakhir disorot hijau). Atur rentang di `uniqueCode` (`min`/`max`) pada `config/admin.js`; matikan lewat fitur `uniqueCode`.
- **Timer pembayaran**: hitung mundur sejak masuk langkah Konfirmasi (`timer.minutes`, bawaan 1440 = 24 jam; matikan lewat fitur `timer`). Habis waktu -> layar "Buat pesanan baru" (kode unik baru).
- **Halaman sukses + timeline**: muncul setelah pembeli menekan kanal konfirmasi. Pesanan berjalan tersimpan di browser (maks. 72 jam) sehingga aman bila pembeli kembali dari WhatsApp. Tombol "Kembali ke website" menuju halaman asal tombol Beli (parameter `ret`, hanya origin di `allowedOrigins`) dan membersihkan data pesanan.
- **E-Wallet & PayPal**: metode bertipe `account` dengan `numberLabel` (mis. "No. HP"). Item boleh berisi `url` (PayPal.me) dan `"currency": "USD"`; nominal dikonversi memakai `usdRate` (perkiraan, ubah manual sesuai kurs).
- Bank/e-wallet bertanda `"hidden": true` tidak tampil (mis. BNI yang sedang tidak aktif); aktifkan lewat ikon mata di editor.

## Beberapa item dalam satu pesanan
- **Dari website:** `?items=produk:paket:jumlah,produk:paket:jumlah` pada URL checkout, atau pakai `fa-checkout.js`:
  `<a data-fa-items="logo-design:premium:1,social-kit:basic:2">`, atau keranjang di website:
  `<button data-fa-add="logo-design:premium">Tambah</button>` + `<a data-fa-cart>Checkout (<span data-fa-cart-count>0</span>)</a>`.
  Keranjang website tersimpan di browser pengunjung dan dikosongkan otomatis setelah pembeli menekan "Kembali ke website".
- **Di halaman checkout (langkah Data):** pembeli bisa mengubah jumlah, menghapus item, dan menambah layanan lain dari katalog.
- **Katalog:** `"maxQty": 5` pada paket mengizinkan beli sampai 5 unit (bawaan 1 = satu unit saja). `"noAdd": true` menyembunyikan paket dari daftar "Tambah layanan lain". Bisa diatur di `demo.html` tab Produk. Fitur dimatikan lewat fitur `cart`.
- Diskon dihitung per unit lalu dikali jumlah. Harga SELALU dihitung dari katalog; angka di URL hanya dibaca sebagai ID dan jumlah.

## Pencatatan ke Google Sheets (gratis, tanpa API key berbayar)
Setiap pesanan menjadi satu baris di sheet **Pesanan** (rincian item di sheet **Item**) dan diperbarui otomatis:
`Data Diisi` -> `Menunggu Pembayaran` -> `Bukti Dikirim` (atau `Kedaluwarsa`). Status `Lunas`, `Diproses`, `Selesai`, `Batal` kamu isi **manual**
lewat dropdown di kolom Status dan tidak pernah ditimpa checkout. Kolom "Cek" menandai total yang tidak cocok.

Pasang (sekali):
1. Buat Google Sheet baru. Menu **Extensions -> Apps Script**, hapus isi bawaan, tempel seluruh isi `apps-script/Code.gs`.
2. (Opsional) isi `NOTIFY_EMAIL` di bagian atas skrip untuk menerima email saat bukti dikirim. **Project Settings** -> Time zone: `Asia/Jakarta`.
3. Pilih fungsi `setup` lalu **Run** (izinkan akses). Ini membuat sheet, format kolom, dan dropdown status.
4. **Deploy -> New deployment -> Web app**: *Execute as* **Me**, *Who has access* **Anyone**. Salin URL yang berakhiran `/exec`.
5. Tempel URL ke `config/admin.js` pada `"sheets": { "enabled": true, "url": "..." }` lalu unggah ke repo.
6. Setelah mengubah `Code.gs`: **Deploy -> Manage deployments -> Edit -> Version: New version** (URL tetap sama).

Catatan: URL web app bersifat publik, jadi isi sheet adalah **catatan**, bukan bukti pembayaran. Tetap cocokkan dengan mutasi rekening/e-wallet
sebelum menandai Lunas. Data pembeli (nama, kontak) masuk ke sheet milikmu sendiri. Pengiriman memakai `sendBeacon`/`fetch no-cors`
sehingga tetap terkirim walau halaman berpindah ke WhatsApp; respons tidak dibaca. Kosongkan `url` atau set `enabled: false` untuk mematikan.
