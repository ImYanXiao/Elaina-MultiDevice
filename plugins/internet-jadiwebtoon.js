import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';
import dotenv from 'dotenv';

dotenv.config();

const Xa = process.env.xzn;

const server = 'https://skizo.tech/api/aiwebtoon';

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime.trim()) throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command}`
        m.reply('Gambar sedang di download');
        let media = await q.download()

        const sender = m.sender.split(`@`)[0];
        m.reply('Gambar sudah terdownload\nMengupload ke server');
        let url;
        url = await uploadImage(media);
        let res = await fetch(`${server}?url=${url}&apikey=${Xa}`);
        let json = await res.json();
        m.reply('dikit lagi jadi, 30 detik - 5 menit');

        if (json.status === 200 && json.data && json.data.results) {
            let inferenceImageUrls = json.data.results.map(result => result.inferenceImageUrl);

            const sendImages = async () => {
                for (let imageUrl of inferenceImageUrls) {
                    try {
                        await conn.sendFile(m.chat, imageUrl, '', `Ini gambarnya kak @${sender}\n\n${global.wm}`, m);
                    } catch (error) {
                        console.error(error);
                        continue;
                    }
                }
            };

            let maxRetries = 5;
            let retries = 0;

            while (retries < maxRetries) {
                try {
                    await sendImages();
                    break;
                } catch (error) {
                    console.error(error);
                    retries++;
                }
            }

            if (retries >= maxRetries) {
                throw 'Gagal mengirim gambar setelah beberapa percobaan';
            }
        } else {
            throw 'Gagal mendapatkan jawaban dari server';
        }
    } catch (error) {
        console.error(error);
        m.reply(`webnya down`);
    }
};

handler.help = ['jadiwebtoon <url>'];
handler.tags = ['webtoon', 'ai', 'anime'];
handler.command = /^(towebtoon|jadiwebtoon)$/i;
// handler.premium = true;
handler.register = true;
handler.limit = 2;

export default handler;
