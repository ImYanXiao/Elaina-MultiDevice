import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';
import dotenv from 'dotenv';

dotenv.config();

const Xa = process.env.xzn;
const server = 'https://skizo.tech/api/aitoonme';

const allowedFilters = [
    "t1",
    "t2",
    "t3",
    "m2",
    "m3",
    "m4",
    "fm1",
    "fm2",
    "fm3",
    "fm4"
];

let handler = async (m, { conn, usedPrefix, command, args }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        let name = await conn.getName(who);
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        // Check if the user provided a filter
        if (!args[0] || !allowedFilters.includes(args[0])) {
            throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command} namaFilter\nList filter yang tersedia: ${allowedFilters.join(', ')}`;
        }

        if (!mime.trim()) {
            throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command} namaFilter\nList filter yang tersedia: ${allowedFilters.join(', ')}`;
        }

        const sender = m.sender.split(`@`)[0];
        m.reply('Gambar sedang di download');

        let media = await downloadWithRetry(q);

        if (media) {
            m.reply('Gambar berhasil diunduh\nGambar sedang di upload');
            let url = await uploadImageWithRetry(media);

            if (url) {
                // Make a request to the server with the specified filter
                let filter = args[0];
                let serverUrl = `${server}?url=${url}&apikey=${Xa}&filter=${filter}`;
                let response = await fetch(serverUrl);

                if (response.ok) {
                    // Parse the server response
                    let result = await response.json();

                    if (result.status === 'true' && result.url) {
                        // If the response is successful, send the file
                        await conn.sendFile(m.chat, result.url, '', `Ini gambarnya kak @${sender}\n${global.wm}`, m);
                    } else {
                        throw 'Gagal mendapatkan URL gambar dari server';
                    }
                } else {
                    throw `Gagal melakukan request ke server. Status: ${response.status}`;
                }
            } else {
                throw 'Gagal mengupload gambar';
            }
        } else {
            throw 'Gagal mengunduh gambar';
        }
    } catch (error) {
        console.error(error);
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

/* async function fetchResultWithRetry(url, maxAttempts = 3) {
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
*/

handler.help = ['tocartoon','jadikartun'];
handler.tags = ['anime', 'ai'];
handler.command = /^(jadikartun|tocartoon)$/i;
handler.register = true
handler.limit = 8;

export default handler;
