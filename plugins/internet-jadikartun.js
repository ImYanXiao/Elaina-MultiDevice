/*
Cara penggunaan DotENV, kalian download dulu dotenv npm install dotenv, lalu buat file .env di root, lalu isi kek gini
xzn=YOUR-APIKEY
Lalu jalanin deh :)
minta apikey disini
+212 706-611366
+62 823-3103-3919
+62 822-5608-0304
+62 857-5141-4996
*/

import fetch from 'node-fetch';
import { uploadToPomf2 } from '../lib/uploadImage.js';
import dotenv from 'dotenv';

dotenv.config();

const Xa = process.env.xzn;
const server = 'https://skizo.tech/api/aitoonme';

const allowedFilters = [
    "t1",
    "t2",
    "t3",
    "m1", // m1 error , hapus aja
    "m2",
    "m3",
    "m4",
    "fm1",
    "fm2",
    "fm3",
    "fm4",
    "gender" // gender error, hapus aja
];

let handler = async (m, { conn, usedPrefix, command, args }) => {
    try {
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        let name = await conn.getName(who);
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';

        // Check if the user provided a filter
        if (!args[0] || !allowedFilters.includes(args[0])) {
            throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command} namaFilter\nList filter yang tersedia: ${allowedFilters.join(', ')}\n\n\`\`\`Contoh: ${usedPrefix + command} ${allowedFilters[0]}\`\`\``;
        }

        if (!mime.trim()) {
            throw `Kirim/Reply Gambar dengan caption ${usedPrefix + command} namaFilter\nList filter yang tersedia: ${allowedFilters.join(', ')}\n\n\`\`\`Contoh: ${usedPrefix + command} ${allowedFilters[0]}\`\`\``;
        }

        const sender = m.sender.split(`@`)[0];
        m.reply('Gambar sedang di download');

        let media = await downloadWithRetry(q);

        if (media) {
            m.reply('Gambar berhasil diunduh\nGambar sedang di upload');
            let url = await uploadImageWithRetry(media);

            if (url) {
                let filter = args[0];
                let serverUrl = `${server}?url=${url}&apikey=${Xa}&filter=${filter}`;
                let response = await fetch(serverUrl);

                if (response.ok) {
                    let result = await response.json();

                    if (result.status === 'true' && result.url) {
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
            url = await uploadToPomf2(media);
            break;
        } catch (error) {
            attempts++;
        }
    }

    return url;
}

handler.help = ['tocartoon','jadikartun'];
handler.tags = ['anime', 'ai'];
handler.command = /^(jadikartun|tocartoon)$/i;

handler.limit = 8;

export default handler;
