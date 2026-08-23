import { sticker } from '../../lib/sticker.js';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Masukkan teks untuk stiker Brat!\n\nContoh:\n${usedPrefix + command} Halo Brat`;

    let text = args.join(' ');

                           
    try {
        await conn.sendReact(m.chat, global.loading, m.key);                                          
    } catch (e) {
        console.warn('Gagal kirim react loading:', e);
    }

    let apiUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isAnimated=false&delay=200`;

    try {
        let stiker = await sticker(apiUrl, false, global.wm2, global.author);
        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'BratSticker.webp', '', m);
        }
    } catch (e) {
        console.error(e);
        throw 'Gagal membuat stiker, coba lagi nanti.';
    } finally {
                              
        try {
            await conn.sendReact(m.chat, '✅', m.key);                                               
        } catch (e) {
            console.warn('Gagal hapus/ubah react loading:', e);
        }
    }
};

handler.help = ['brat'];
handler.tags = ['sticker'];
handler.command = /^(brat)$/i;
handler.limit = true;
handler.register = true;

export default handler;
