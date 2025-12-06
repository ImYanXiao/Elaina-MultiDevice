import fetch from 'node-fetch';

const translateResult = async (hasil) => {
    const fromLang = 'en';
    const toLang = 'id';
    const url = `https://bioskop-six.vercel.app/translate?from=${fromLang}&to=${toLang}&text=${encodeURIComponent(hasil)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.translated_text; // Get the translated_text field from the response JSON
    } catch (e) {
        console.error(e);
        throw 'Terjadi kesalahan saat menerjemahkan hasil';
    }
};

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (args.length < 1) {
        throw `Masukkan data tensi dan hb dengan format: ${usedPrefix + command} tensi|hb`;
    }

    // Mendapatkan data tensi dan hb dari argumen
    const [tensi, hb] = args[0].split('|');

    // Membuat URL dengan menggunakan data tensi dan hb
    const url = `https://bioskop-six.vercel.app/bp?tensi=${tensi}&hb=${hb}`;

    try {
        // Melakukan permintaan HTTP GET ke URL
        const response = await fetch(url);
        const data = await response.json();

        // Mengambil semua data dari objek JSON
        const author = data.Author;
        const hasil = data.Hasil;
        const hbValue = data.Hb;
        const tensiValue = data.Tensi;
        const parameter = data.parameter;

        // Mendapatkan hasil terjemahan
        const translatedHasil = await translateResult(hasil);

        // Menampilkan data yang diambil sebagai balasan
      
        const mySecret = process.env['nomer']
      
        const caption = `
Author: ${author}\n
_Hasil: ${hasil}_
*Hasil Terjemahan: ${translatedHasil}*
Hb: ${hbValue}
Tensi: ${tensiValue}\n
Parameter: ${parameter}\n\n
Donate: https://bioskop-six.vercel.app/images\nDana: ${mySecret}
        `;

        conn.reply(m.chat, caption, m);
    } catch (e) {
        console.error(e);
        throw 'Terjadi kesalahan saat mengambil data dari server';
    }
};

handler.help = ['cekdarah tensi|hb'];
handler.tags = ['tools'];
handler.command = /^cekdarah$/i;

export default handler;
