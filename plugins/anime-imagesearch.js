// Don't delete this credit!!!
// Script by ShirokamiRyzen
// updated by Xnuvers007

import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command}`;

        m.reply('Tunggu sebentar...');

        let media = await q.download();
        let url = await uploadImage(media);
        let hasil = await fetch(`https://api.trace.moe/search?cutBorders&url=${encodeURIComponent(url)}`);

        let response = await hasil.json();

        if (response && response.result && response.result.length > 0) {
            for (let result of response.result) {
                let filename = result.filename;
                let episode = result.episode ? result.episode : 'N/A';
                let similarity = Math.round(result.similarity * 100);
                let videoURL = result.video;

                let caption = `Name: ${filename}\nEpisode: ${episode}\nSimilarity: ${similarity}%`;

                await conn.sendFile(m.chat, videoURL, filename, caption, m);
            }
        } else {
            m.reply('No result found');
        }
    } catch (error) {
        console.error(error);
        if (error.includes(`Kirim/Reply Gambar dengan caption ${usedPrefix + command}`)) {
            m.reply(error);
        } else {
            m.reply('Internal server error');
        }
    }
};

handler.help = ['animesearch'];
handler.tags = ['anime'];
handler.command = /^(animesearch|wait|whatisthisanime|whatanime|animewhat)$/i;

handler.limit = 2;

export default handler;
