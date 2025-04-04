// Created by Xnuvers007
import path from 'path';

let handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) return m.reply(`Mohon balas file yang ingin Anda lihat. \n${usedPrefix+command}\n> Cihuyyy, Created by ${global.namebot + ' - '+ global.nameown}`);

    const isViewOnce = m.quoted?.viewOnce === true;

    if (isViewOnce) {
        try {
            const media = await m.quoted.download();
            if (!media) return m.reply("Gagal mengambil file. Silakan coba lagi.");

            let fileType = m.quoted.mimetype || '';
            let fileExt = fileType.split('/')[1] || 'file';
            let msg = await m.getQuotedObj()?.message;
            let type = Object.keys(msg)[0];

            if (fileType.startsWith('image')) {
                await conn.sendFile(m.chat, media, `retrieved.${fileExt}`, msg[type]?.caption, m);
            } else if (fileType.startsWith('video')) {
                await conn.sendFile(m.chat, media, `retrieved.${fileExt}`, msg[type]?.caption, m);
            } else if (fileType.startsWith('audio')) {
                await conn.sendFile(m.chat, media, `retrieved.${fileExt}`, msg[type]?.caption, m, { asDocument: false });
            } else if (fileType === 'image/webp') {
                await conn.sendMessage(m.chat, { sticker: media }, { quoted: m });
            } else {
                await conn.sendFile(m.chat, media, `retrieved.${fileExt}`, msg[type]?.caption, m, { asDocument: true });
            }
        } catch {
            m.reply("Terjadi kesalahan saat mengambil file.");
        }
    } else {
        m.reply("Ini bukan pesan view-once.");
    }
};

handler.help = ['readviewonce','read'];
handler.tags = ['tools'];
handler.command = /^(retrieve|readviewonce|rvo|sekali(liat|lihat)|satu(kali(lihat|liat))?)$/i;

export default handler;
