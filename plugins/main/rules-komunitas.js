import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom());
    let name = await conn.getName(who);

    let rules = `*⫹⫺ Rules Archave Community ⫹⫺*
    
_*💬 Rule community 💬*_

• *Toxic Sewajarnya jangan sampai menyinggung pihak manapun*
• *Jangan kirim yang berbau 18+*❎
• *member baru wajib intro*
• *Saling hormati para member dan admin*
• *Jangan buat keributan disaat berada di event / di non-event*
• *Kalau di event Jangan takut buat join bareng bareng saat ditikum admin Tikum ga makan orang kok🥰*
• *wajib foll ig komun*
• *jangan promosi web judol dan 18+ atau hal berbahaya*❎
•  *Dilarang menyebar kontak semua member secara sembarangan ke orang asing*
• *Jangan private akun sosmed*
- *Dilarang Promosi Judi*
- *No Pussy / Dick Hunter*
- *No Status Tag Group*
- *Jangan Tagsw Kecuali Staff Archave Community* (Limit Staff TagSW 2X sehari) _[Terkecuali Founder/Co-Founder]_
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

handler.help = ['archaverules'];
handler.tags = ['main', 'info'];
handler.command = /^(archaverules|arcrules|Peraturankomunitas|peraturankomunitas)$/i;

export default handler;
