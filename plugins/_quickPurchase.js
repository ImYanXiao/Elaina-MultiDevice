import fs from 'fs';
import moment from 'moment-timezone';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!conn.quickPurchase) conn.quickPurchase = {};
        if (typeof conn.quickPurchase[m.sender] !== "undefined") return m.reply("Kamu masih mempunyai transaksi yang diproses!");

        await global.loading(m, conn);

        let [itemID, number, harga, produk, image] = text.split("|");
        if (!itemID || !number || !harga || !produk || !image) {
            return m.reply("Format input tidak valid. Pastikan untuk menggunakan format: itemID|number|harga|produk|image");
        }

        let randomCode = Math.floor(Math.random() * 100);
        let trxId = generateRefID();
        harga = (+harga + randomCode).toString();

        let caption = `
*QRIS TELAH DIBUAT*

Id : ${trxId}
Produk : ${produk}
Harga : Rp.${toRupiah(harga)}
Dibuat : ${formattedDate(Date.now())}
Expired : 10 Menit

_Silahkan Scan QRIS di atas dengan nominal *Rp.${toRupiah(harga)}* yang telah ditentukan! Jika sudah transaksi akan otomatis selesai_

_*Note :* Tidak boleh melebihi atau kurang dari nominal tersebut, karena transaksi dicek oleh BOT!_
`.trim();

        // Periksa apakah file ada sebelum mengirim
        if (!fs.existsSync("./media/qris.jpg")) {
            throw new Error("File qris.jpg tidak ditemukan");
        }

        await conn.sendFile(m.chat, "./media/qris.jpg", null, caption, m);

        conn.quickPurchase[m.sender] = {
            chat: m.chat,
            trxId: trxId,
            itemID,
            number,
            harga,
            produk,
            image,
            time: Date.now(),
            expired: setTimeout(() => {
                m.reply("Transaksi telah Expired!");
                delete conn.quickPurchase[m.sender];
            }, 600000)
        };
    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);  // Tambah informasi kesalahan
        m.reply(`Terjadi kesalahan saat memproses transaksi: ${error.message}`);
    } finally {
        await global.loading(m, conn, true);
    }
}

handler.command = ["quickpurchase"];
export default handler;

function generateRefID() {
    return 'ref-' + Math.random().toString(36).substr(2, 9);
}

let toRupiah = number => parseInt(number).toLocaleString('id-ID');

function formattedDate(ms) {
    return moment(ms).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm');
}