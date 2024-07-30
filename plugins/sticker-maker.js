import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';
import MessageType from '@adiwajshing/baileys';

const effects = ['jail', 'gay', 'glass', 'wasted', 'triggered', 'lolice', 'simpcard', 'horny', 'comrade', 'passed', 'lgbt', 'lesbian', 'its-so-stupid'];

let handler = async (m, { conn, usedPrefix, text, command }) => {
    let effect = text.trim().toLowerCase();
    
    if (effect.includes('its so stupid') || effect.includes("it's so stupid")) {
        effect = 'its-so-stupid';
    }

    if (!effects.includes(effect)) {
        throw `
┌─⊷ *List Effect*
${effects.map(effect => `▢ ${effect}`).join('\n')}
└─────────────

📌 *Example:* 
${usedPrefix + command} wasted 
`.trim();
    }

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) throw '✳️ Reply dengan gambar';
    if (!/image\/(jpe?g|png)/.test(mime)) throw '✳️ Format tidak didukung (format di dukung: jpg, jpeg, png';

    let img = await q.download();
    let url = await uploadImage(img);
    if (!/^https?:\/\//.test(url)) url = 'https://' + url;

    let apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), { avatar: url });

    try {
        let stiker = await sticker(null, apiUrl, global.packname, global.author);
        await conn.sendFile(m.chat, stiker, null, { asSticker: true });
    } catch (e) {
        m.reply('Error konversi kak');
        await conn.sendFile(m.chat, apiUrl, 'smaker.png', null, m);
    }
};

handler.help = ['smaker'];
handler.tags = ['sticker'];
handler.command = ['stickmaker', 'stickermaker', 'smaker'];
handler.limit = false;

export default handler;
