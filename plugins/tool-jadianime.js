import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'
import dotenv from 'dotenv';

dotenv.config();

const Xa = process.env.xzn;

const server = 'https://skizo.tech/api/toanime';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let name = await conn.getName(who)
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime.trim()) throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command}`
        
        const sender = m.sender.split(`@`)[0];
        m.reply('Gambar sedang di download');

        let media = await downloadWithRetry(q);

        if (media) {
            m.reply('Gambar berhasil diunduh\nGambar sedang di upload');
            let url = await uploadImageWithRetry(media);

            if (url) {
                m.reply('Gambar berhasil diupload\nGambar sedang dibuat\n\n*TUNGGU 30 detik - 5 menit*')
                let hasil = await fetchResultWithRetry(url);
                if (hasil) {
                    await conn.sendFile(m.chat, hasil, '', `Ini gambarnya kak @${sender}\n${global.wm}`, m);
                } else {
                    throw 'Gagal mendapatkan jawaban dari server';
                }
            } else {
                throw 'Gagal mengupload gambar';
            }
        } else {
            throw 'Gagal mengunduh gambar';
        }
    } catch (error) {
        m.reply(`${error}`);
    }
};

async function downloadWithRetry(message, maxAttempts = 3) {
    let attempts = 0;
    let media;

    while (attempts < maxAttempts) {
        try {
            media = await message.download();
            break;
        } catch (error) {
            attempts++;
        }
    }

    return media;
}

async function uploadImageWithRetry(media, maxAttempts = 3) {
    let attempts = 0;
    let url;

    while (attempts < maxAttempts) {
        try {
            url = await uploadImage(media);
            break;
        } catch (error) {
            attempts++;
        }
    }

    return url;
}

async function fetchResultWithRetry(url, maxAttempts = 3) {
    let attempts = 0;
    let hasil;

    while (attempts < maxAttempts) {
        try {
            hasil = await (await fetch(`${server}?url=${url}&apikey=${Xa}`)).buffer();
            if (hasil.length > 0) break;
        } catch (error) {
            attempts++;
        }
    }

    return hasil;
}

handler.help = ['toanime'];
handler.tags = ['anime', 'ai'];
handler.command = /^(toanime|jadianime)$/i;
handler.register = true;
handler.fail = true
// handler.premium = true

handler.limit = 4;

export default handler;
