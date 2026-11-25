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
