
# Fixs.Arts Checkout

Sistem checkout terpusat untuk website statis (GitHub Pages). Website penjualan hanya memasang satu script dan tombol;
harga selalu dibaca dari file katalog `products.json` milik website itu, bukan dari tombol atau URL.

**Daftar isi:** [Prompt untuk Claude](#prompt-untuk-claude-hubungkan-website-lain-ke-checkout) ·
[Menghubungkan website](#menghubungkan-website-penjualan-folder-bersarang-didukung) ·
[Beberapa item](#beberapa-item-dalam-satu-pesanan) · [Fitur lanjutan](#fitur-checkout-lanjutan) ·
[Bank & e-wallet](#mengatur-bank-lewat-editor-demohtml-tab-bank) · [Google Sheets](#pencatatan-ke-google-sheets-gratis-tanpa-api-key-berbayar)

## Prompt untuk Claude: hubungkan website lain ke checkout

Pakai ini kalau kamu mau Claude merevisi website lain supaya ikut sistem checkout ini.

**Cara pakai:** salin salah satu prompt di bawah (tombol copy di pojok kanan kode), isi bagian `<<...>>`, lalu kirim ke Claude
**bersama file HTML website** yang mau direvisi (dan daftar layanan + harga). Setelah Claude selesai, ikuti "Checklist setelah revisi" di bawah prompt.

### Prompt A: integrasi lengkap

````text
Kamu adalah developer front-end. Revisi website saya supaya terhubung ke sistem checkout Fixs.Arts.
Jangan mengubah desain, warna, tata letak, animasi, atau teks yang tidak berkaitan. Jangan menambah library/framework.
Pertahankan kode yang sudah ada dan hanya ubah yang perlu.

== DATA WEBSITE ==
- Origin website (skema + domain, tanpa path): <<mis. https://namaakun.github.io>>
- Folder halaman penjualan di repo: <<mis. /nama-repo/  atau  /nama-repo/Section/jadwal-kerja/>>
- Layanan dan harga (rupiah, bilangan bulat):
  <<Layanan A: Paket Basic Rp150.000, Paket Premium Rp400.000 (diskon 10% "Promo Launching")>>
  <<Layanan B: Paket Starter Rp250.000>>
- Paket yang boleh dibeli lebih dari 1 unit (beserta maksimalnya): <<atau tulis "tidak ada">>
- Paket yang tidak boleh muncul di daftar "Tambah layanan lain" di checkout: <<atau "tidak ada">>
- Mode tombol yang diinginkan: <<A) beli langsung 1 item | B) keranjang di website (beberapa item) | C) keduanya>>

== SISTEM CHECKOUT (WAJIB DIIKUTI PERSIS) ==
Checkout berada di https://fixsarts-auto.github.io/checkout/ dan dipakai lewat script:

1) Pasang SEKALI per halaman yang punya tombol beli, sebelum </body>:
   <script src="https://fixsarts-auto.github.io/checkout/fa-checkout.js" defer></script>

2) Beli langsung satu item. JANGAN isi href manual, script mengisinya otomatis:
   <a data-fa-product="id-produk" data-fa-package="id-paket">Beli</a>

3) Beberapa item sekaligus (format produk:paket:jumlah, pisahkan koma):
   <a data-fa-items="id-produk:id-paket:1,id-produk2:id-paket2:2">Beli paket gabungan</a>

4) Keranjang di website (tersimpan di browser pengunjung):
   <button data-fa-add="id-produk:id-paket" data-fa-qty="1">Tambah ke pesanan</button>
   <a data-fa-cart>Checkout (<span data-fa-cart-count>0</span>)</a>
   Tombol yang baru ditekan otomatis mendapat class "fa-added" selama 1,2 detik; tautan keranjang kosong mendapat class
   "fa-empty". Beri gaya CSS untuk keduanya bila perlu. Keranjang dikosongkan otomatis setelah pembeli selesai.

5) Aturan ID (produk dan paket): huruf kecil a-z, angka, dan tanda minus, 1 sampai 40 karakter. Contoh: logo-design, premium.
   ID di tombol HARUS sama persis dengan ID di katalog.

6) Harga TIDAK PERNAH dikirim lewat tombol atau URL. Checkout menghitung harga dari katalog. Harga yang tampil di HTML hanya
   tampilan, dan angkanya HARUS sama dengan katalog.

== FILE KATALOG ==
Buat file data/products.json di folder halaman penjualan. Checkout mencari katalog dari folder halaman naik ke folder induk,
urutannya: <folder>/data/products.json, lalu <folder>/products.json, lalu folder di atasnya. Yang paling dalam dipakai lebih
dulu, jadi satu katalog bersama boleh ditaruh di folder induk. Format:

{
  "version": 1,
  "currency": "IDR",
  "siteName": "Nama Website",
  "products": {
    "id-produk": {
      "name": "Nama Layanan",
      "packages": {
        "id-paket": {
          "name": "Nama Paket",
          "price": 150000,
          "maxQty": 1,
          "noAdd": false,
          "discount": { "type": "percent", "value": 10, "label": "Promo Launching" }
        }
      }
    }
  }
}

Aturan katalog: currency harus "IDR". price bilangan bulat >= 0. discount (opsional) type "percent" (0 sampai 100) atau
"amount" (tidak boleh melebihi price), dihitung per unit. maxQty (opsional) 1 sampai 99, bawaan 1. noAdd (opsional) true =
sembunyikan dari "Tambah layanan lain". siteName opsional. Maksimal 20 baris item per pesanan.

== YANG HARUS KAMU HASILKAN ==
1. Semua file HTML yang diubah (lengkap, siap tempel) atau diff yang jelas per file.
2. File data/products.json lengkap, dengan path lengkapnya di repo.
3. Langkah untuk repo checkout: tambahkan origin website ke config/sites.json pada "allowedOrigins"
   (origin = skema + domain, huruf kecil, tanpa garis miring di akhir, tanpa path). Tulis baris JSON-nya.
4. Jika website punya Content-Security-Policy, tambahkan https://fixsarts-auto.github.io ke script-src
   (dan ke connect-src bila dibatasi). Jangan pakai inline script bila CSP melarangnya.
5. Checklist uji singkat sesuai website ini.

== ATURAN TAMBAHAN ==
- Jangan menulis URL checkout manual di href tombol. Biarkan fa-checkout.js yang mengisinya.
- Jangan membuat sistem pembayaran, form pembeli, atau perhitungan harga sendiri di website. Semua itu dikerjakan checkout.
- Jika nama folder punya spasi atau huruf besar (mis. "Jadwal Kerja"), tetap didukung, tapi sarankan memakai huruf kecil
  tanpa spasi karena GitHub Pages membedakan huruf besar/kecil.
- Jika ada hal yang kurang jelas (ID, harga, atau folder), tanyakan dulu dalam satu daftar pertanyaan sebelum menulis kode.
````

### Prompt B: audit website yang sudah terpasang

Pakai ini kalau tombol tidak berfungsi atau mau memastikan integrasi sudah benar.

````text
Periksa integrasi checkout Fixs.Arts di website saya (file terlampir). Jangan ubah desain. Cek satu per satu dan laporkan
hasilnya sebagai daftar LOLOS / GAGAL beserta perbaikannya:

1. Script https://fixsarts-auto.github.io/checkout/fa-checkout.js ada sekali per halaman, memakai defer, dan dimuat sebelum </body>.
2. Setiap tombol beli memakai data-fa-product + data-fa-package, atau data-fa-items, atau data-fa-add. Tidak ada href checkout manual.
3. Semua ID memakai huruf kecil, angka, dan minus saja (1 sampai 40 karakter), dan SAMA PERSIS dengan ID di data/products.json.
4. data/products.json valid: version 1, currency "IDR", price bilangan bulat, discount percent 0 sampai 100 atau amount <= price,
   maxQty 1 sampai 99, tidak ada koma berlebih atau kutip tidak lengkap.
5. Harga yang tampil di HTML sama dengan harga di katalog (setelah diskon).
6. Lokasi katalog benar: <folder halaman>/data/products.json atau <folder halaman>/products.json atau di folder induk.
7. Origin website sudah ada di allowedOrigins pada config/sites.json repo checkout.
8. Jika ada Content-Security-Policy, https://fixsarts-auto.github.io diizinkan di script-src (dan connect-src bila dibatasi).
9. Jika memakai keranjang: ada elemen data-fa-cart dan data-fa-cart-count, dan gaya untuk class fa-added dan fa-empty.

Di akhir, tulis ringkasan: apa yang sudah benar, apa yang harus diperbaiki (urut dari yang paling penting), dan kode perbaikannya.
````

### Checklist setelah revisi (kamu kerjakan sendiri)

1. Upload `data/products.json` dan file HTML yang direvisi ke repo website.
2. Di repo **checkout**, tambahkan origin website ke `config/sites.json` pada `allowedOrigins`, lalu upload.
3. Buka website (online, bukan dari folder komputer), klik tombol Beli, dan pastikan checkout terbuka dengan produk dan harga yang benar.
4. Jika memakai keranjang: tambah dua item, buka checkout, ubah jumlah, selesaikan sampai halaman sukses, klik "Kembali ke website", dan pastikan jumlah keranjang kembali 0.

### Pesan error yang sering muncul

| Pesan di checkout | Penyebab | Solusi |
|---|---|---|
| Website belum terdaftar di Fixs.Arts Checkout | Origin website belum ada di `allowedOrigins` | Tambahkan di `config/sites.json` (skema + domain, tanpa path dan tanpa `/` di akhir) |
| Katalog produk tidak ditemukan | `products.json` tidak ada di folder halaman atau folder induknya | Taruh di `<folder>/data/products.json`; cek huruf besar/kecil nama folder |
| Produk atau paket tidak ditemukan di katalog website | ID di tombol tidak sama dengan ID di katalog | Samakan persis, huruf kecil semua |
| Katalog tidak valid: ... | Isi `products.json` melanggar aturan format | Perbaiki bagian yang disebut pada pesan (mis. harga bukan bilangan bulat) |
| Alamat website tidak valid | Path folder berisi karakter tidak diizinkan atau terlalu dalam (maks. 6 level) | Pakai nama folder sederhana |
| Tombol Beli tidak berpindah ke checkout | Script belum dimuat atau terblokir CSP | Cek tag script dan CSP website |

> Catatan: membuka halaman langsung dari komputer (`file://`) tidak mengambil katalog asli. Checkout memakai data contoh bawaan
> (Desain Logo, Social Media Kit). Uji selalu lewat alamat website yang sudah online.

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
