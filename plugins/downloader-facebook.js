/*
 * Kredit untuk: Xnuvers007, ImYanXiao, dan fdown.net
 * 𝕏𝕟𝕦𝕧𝕖𝕣𝕤𝟘𝟘𝟟
 * https://github.com/Xnuvers007
 */

import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        const url = args[0];
        if (!url) {
            return conn.reply(m.chat, `Please provide a valid Facebook video URL.\nUsage: ${usedPrefix + command} <URL>`, m);
        }
        const ServerURL = `https://tooly.chative.io/facebook/video`
        const HEADERS = {
            accept: 'application/json, text/plain, */*',
            origin: 'https://chative.io',
            referer: 'https://chative.io/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
        };

        const response = await fetch(`${ServerURL}?url=${encodeURIComponent(url)}`, {
            method: 'GET',
            headers: HEADERS,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || !data.success || !data.title || !data.videos) {
            throw new Error('No video found or invalid URL provided.');
        }
        const caption = `*Title:* ${data.title}'}`;
        for (const [resolusi, detail] of  Object.entries(data.videos)) {
            const videoUrl = detail.url || null;
            const videoSize = detail.size || 'Unknown size';
            caption += `\n*Resolution:* ${resolusi.toUpperCase()}\n*Size:* ${videoSize}\n*Quality:* ${videoQuality}`;
            if (videoUrl) {
                await conn.sendFile(m.chat, videoUrl, `${data.title}.mp4`, caption, m);
            } else {
                conn.reply(m.chat, `No video found for resolution: ${resolusi}`, m);
            }
        }

    } catch (error) {
        conn.reply(m.chat, `Error: ${error}`, m);
    }
}
handler.help = ['fbdownload <url>'];
handler.tags = ['downloader'];
handler.command = /^(fbdownload|fb(dl)?)$/i;

export default handler;
