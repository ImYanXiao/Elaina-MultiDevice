// Created by Xnuvers007

import fetch from 'node-fetch';
import sharp from 'sharp';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan URL Instagram yang valid!\nContoh: ${usedPrefix + command} https://www.instagram.com/p/DIEfajkh8ES/\n${usedPrefix + command} https://www.instagram.com/p/DGzYXixzH6c/`;

    const instagramUrlRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[a-zA-Z0-9_-]+\/?$/;
    if (!instagramUrlRegex.test(text)) {
        throw `URL tidak valid!\nPastikan kamu menggunakan link Instagram yang benar.\nContoh: ${usedPrefix + command} https://www.instagram.com/p/DIEfajkh8ES/\n${usedPrefix + command} https://www.instagram.com/p/DGzYXixzH6c/`;
    }

    m.reply(global.wait);

    try {
        const res = await fetch('https://api.instafinsta.is/get-media', {
            method: 'POST',
            headers: {
                'accept': '*/*',
                'content-type': 'application/json',
                'origin': 'https://snapinsta.tech',
                'referer': 'https://snapinsta.tech/',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({ mediaUrl: text })
        });

        if (!res.ok) throw await res.text();
        const data = await res.json();

        const sendMedia = async (mediaUrl, ext, caption) => {
            if (ext === 'webp') {
                const buffer = await fetch(mediaUrl).then(res => res.buffer());
                const outputPath = path.join(__dirname, `../tmp/converted_image.jpg`);
                await sharp(buffer).toFormat('jpg').toFile(outputPath);
                await conn.sendFile(m.chat, outputPath, 'instagram.jpg', caption, m);
                fs.unlinkSync(outputPath);
            } else {
                await conn.sendFile(m.chat, mediaUrl, `instagram.${ext}`, caption, m);
            }
        };

        const createCaption = (meta, timestamp, comments) => {
            let commentsText = '';
            if (Array.isArray(comments) && comments.length > 0) {
                commentsText = '\n🗨️ Comments:\n';
                comments.forEach((comment, index) => {
                    commentsText += ` ${index + 1}. ${comment.username || 'Unknown'}: ${comment.text || ''}\n`;
                });
            }
            return `
👤 Username: ${meta.username || 'N/A'}
📝 Title: ${meta.title || 'N/A'}
🔗 Source: ${meta.source || 'N/A'}
#️⃣ Shortcode: ${meta.shortcode || 'N/A'}
❤️ Likes: ${meta.like_count || 0}
💬 Comments: ${meta.comment_count || 0}
🕒 Timestamp: ${timestamp || 'N/A'}
${commentsText}
            `.trim();
        };

        if (Array.isArray(data)) {
            for (const slide of data) {
                const meta = slide.meta || {};
                const caption = createCaption(meta, slide.timestamp, meta.comments);

                if (slide.url && slide.url.length > 0) {
                    for (const media of slide.url) {
                        const ext = (media.ext || '').toLowerCase();
                        await sendMedia(media.url, ext, caption);
                    }
                } else if (slide.hd) {
                    await conn.sendFile(m.chat, slide.hd, 'instagram_hd.jpg', caption, m);
                } else if (slide.sd) {
                    await conn.sendFile(m.chat, slide.sd, 'instagram_sd.jpg', caption, m);
                } else {
                    throw 'Media tidak ditemukan!';
                }
            }
        } else {
            const meta = data.meta || {};
            const caption = createCaption(meta, data.timestamp, meta.comments);

            if (data.url && data.url.length > 0) {
                for (const media of data.url) {
                    const ext = (media.ext || '').toLowerCase();
                    await sendMedia(media.url, ext, caption);
                }
            } else if (data.hd) {
                await conn.sendFile(m.chat, data.hd, 'instagram_hd.jpg', caption, m);
            } else if (data.sd) {
                await conn.sendFile(m.chat, data.sd, 'instagram_sd.jpg', caption, m);
            } else {
                throw 'Media tidak ditemukan!';
            }
        }

    } catch (e) {
        console.error(e);
        throw 'Gagal mengambil data, pastikan URL valid dan coba lagi!\n\n' + e;
    }
};

handler.help = ['acumalaka'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(igp|igphotos|igphoto|igfoto|igf|igfdl|igfdownloader)$/i;

export default handler;
