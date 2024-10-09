// Fungsi untuk menampilkan promo hari ini
function tampilkanPromo() {
    let hari = new Date().getDay(); 
    let promo = "";
    if (hari === 0 || hari === 6) {
        promo = "Diskon 25% untuk semua level pedas!";
    } else {
        promo = "Beli 3 gratis 1 untuk seblak level 5.";
    } 
    document.getElementById("promoMessage").innerHTML = promo; 
}
// Daftar menu seblak favorit beserta harga dan status diskon
let menuFavorit = [
    { nama: "Ayam Geprek", harga: 15000, diskon: false },
    { nama: "Soto Ayam", harga: 18000, diskon: true }, // Diskon 25%
    { nama: "Seblak Kikil", harga: 20000, diskon: false },
    { nama: "Seblak Bakso", harga: 17000, diskon: true } // Diskon 25%
];
let totalHargaSetelahDiskon = 0; // Variabel global untuk menyimpan total harga setelah diskon
// Fungsi untuk menampilkan menu favorit dalam list dan dropdown
function tampilkanMenu() {
    let listMenu = document.getElementById("listmenu");
    let pilihMenu = document.getElementById("pilihanMenu");  
    // Hapus list dan dropdown menu
    listMenu.innerHTML = '';
    pilihMenu.innerHTML = '';
    
    menuFavorit.forEach(function(item) {
        // Menambahkan ke list
        let li = document.createElement("li");
        li.textContent = `${item.nama} - Rp.${item.harga}`; 
        listMenu.appendChild(li);

        // Menambahkan ke dropdown
        let option = document.createElement("option");
        option.value = item.nama; // Set value untuk option
        option.textContent = `${item.nama} - Rp.${item.harga}`; 
        pilihMenu.appendChild(option);
    });
}
// Fungsi untuk memeriksa jumlah pesanan dan menghitung total bayar
function cekPesanan() {
    let menuIndex = document.getElementById("pilihanMenu").selectedIndex; // Perbaiki ID menjadi 'pilihanMenu'
    let jumlah = parseInt(document.getElementById("inputJumlah").value);
    let hasil = '';
    let total = 0;
    // Validasi jumlah pesanan
    if (jumlah > 20) {
        hasil = "Pesanan terlalu banyak! Maksimal 20 porsi.";
        totalHargaSetelahDiskon = 0;
    } else if (jumlah >= 1 && jumlah <= 20) {
        let menuPilihan = menuFavorit[menuIndex];
        let hargaPerItem = menuPilihan.harga;

        // Cek apakah menu memiliki diskon
        if (menuPilihan.diskon) {
            hargaPerItem *= 0.75; // Diskon 25%
        }
        total = hargaPerItem * jumlah;
        totalHargaSetelahDiskon = total;
        hasil = `Pesanan Anda sebanyak ${jumlah} porsi ${menuPilihan.nama} telah diterima!`;
        document.getElementById("totalBayar").innerHTML = `Total yang harus dibayar: Rp ${total}`;
    } else {
        hasil = "Silakan masukkan jumlah pesanan yang valid.";
        totalHargaSetelahDiskon = 0;
        document.getElementById("totalBayar").innerHTML = '';
    }

    document.getElementById("hasilPesanan").innerHTML = hasil;
}
// Fungsi untuk menghitung kembalian
function hitungKembalian() {
    let uangBayar = parseFloat(document.getElementById("uangBayar").value); 
    
    if (isNaN(uangBayar)) {
        document.getElementById("hasilKembalian").innerHTML = "Silakan masukkan jumlah uang yang valid.";
        return;
    }
    // Pastikan totalHargaSetelahDiskon sudah terisi sebelum menghitung kembalian
    if (totalHargaSetelahDiskon === 0) {
        document.getElementById("hasilKembalian").innerHTML = "Silakan lakukan pemesanan terlebih dahulu.";
        return;
    }
    let kembalian = uangBayar - totalHargaSetelahDiskon; 
    if (kembalian < 0) {
        document.getElementById("hasilKembalian").innerHTML = "Uang Anda kurang.";
    } else {
        document.getElementById("hasilKembalian").innerHTML = `Kembalian Anda: Rp ${kembalian}`;
    }
}