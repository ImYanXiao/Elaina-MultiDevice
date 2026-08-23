import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom());
    let name = await conn.getName(who);

    let rules = `*⫹⫺ Rules Elaina AI ⫹⫺*
    
_*Kebijakan Privasi, Syarat Ketentuan dan Peraturan Elaina*_

*Kebijakan Privasi*
_1. Elaina tidak akan menyebarkan nomor users._
_2. Elaina tidak akan menyimpan media yang dikirimkan oleh users._
_3. Owner berhak melihat data riwayat chat users._
_4. Owner dapat melihat riwayat chat, dan media yang dikirimkan users._

*Peraturan Elaina*
_1. Users dilarang menelfon maupun video call nomor Elaina._
_2. Users dilarang mengirimkan berbagai bug, virtex, dll ke nomor Elaina._
_3. Users diharap tidak melakukan spam dalam penggunaan Elaina._
_4. Users dilarang menambahkan nomor Elaina secara illegal, untuk menambahkan silahkan hubungi owner._
_5. Users dilarang melakukan spam terhadap Elaina secara terus menerus, sangsi ban permanent._

*Syarat Ketentuan Elaina*
_1. Elaina *tidak akan bertanggungjawab atas apapun yang users lakukan terhadap fitur Elaina.*_
_2. Owner akan memberikan hukuman: block atau ban terhadap users yang melanggar peraturan._

*Note:*
_1. Jika ada yang menjual/beli/sewa Elaina atas nomor ini, harap segera hubungi owner!_
_2. Jika ada bug atau error pada fitur Elaina, saya mohon untuk lapor kepada owner._
_2. Jika ingin donasi bisa langsung saja ketik .donasi_
_3. Ketik /sewa jika ingin menyewa Elaina ini._

_Perlu kalian tahu bahwa kami menjaga privasi dari data-data anda!_

`;

                                        
    let thumbnailPath = 'media/thumb-5.jpg';

    if (!fs.existsSync(thumbnailPath)) {
        console.error(`File tidak ditemukan: ${thumbnailPath}`);
        return conn.reply(m.chat, 'Gambar thumbnail tidak ditemukan.', m);
    }

    let thumbnail;
    try {
        thumbnail = fs.readFileSync(thumbnailPath);
    } catch (err) {
        console.error('Error saat membaca file thumbnail:', err);
        return conn.reply(m.chat, 'Terjadi kesalahan saat membaca gambar thumbnail.', m);
    }

    conn.reply(m.chat, rules, m, { thumbnail });
};

handler.help = ['rules'];
handler.tags = ['main', 'info'];
handler.command = /^(Rules|rules|Peraturan|peraturan)$/i;

export default handler;
