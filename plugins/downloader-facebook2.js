/*
 * Kredit untuk: Xnuvers007, ImYanXiao, dan fdown.net
 * 𝕏𝕟𝕦𝕧𝕖𝕣𝕤𝟘𝟘𝟟
 * https://github.com/Xnuvers007
 */

import fetch from 'node-fetch';
import cheerio from 'cheerio-without-node-native';
import {
    toPTT
} from '../lib/converter.js';

const handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {

    const sender = m.sender.split(`@`)[0];

    try {
        if (!args[0] || !/^https?:\/\//i.test(args[0])) {
            return conn.reply(m.chat, `URL tidak valid. Harap berikan URL Facebook Watch yang valid.\nContoh: ${usedPrefix + command} https://www.facebook.com/share/r/tcbnAb4uEft3kjMJ/?mibextid=D5vuiz`, m);
        }

        const response = await fetch('https://fdown.net/download.php', {
            method: 'POST',
            body: new URLSearchParams({
                'URLz': args[0]
            }),
        });

        m.reply('Mohon tunggu...'+wait);

        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $('.lib-row.lib-header').text().trim();
        const description = $('.lib-row.lib-desc').text().trim();

        const mp4Links = $('a[href*=".mp4"]').map((i, el) => $(el).attr('href')).get();

        if (mp4Links.length === 0) {
            return conn.reply(m.chat, 'Tidak ditemukan video MP4 dalam URL yang diberikan.', m);
        }

        let sdLink = mp4Links[0];
        let hdLink = mp4Links.length > 1 ? mp4Links[1] : mp4Links[0];

        const sizeSD = (await fetch(sdLink).then(res => res.buffer())).length;
        const sizeHD = (await fetch(hdLink).then(res => res.buffer())).length;

        let sdWarning = '';
        let hdWarning = '';

        if (sizeSD < sizeHD) {
            sdWarning = 'File SD akan diunduh dan dikirimkan karena lebih kecil dari HD';
            conn.reply(m.chat, sdWarning, m);
        } else {
            hdWarning = 'File HD akan diunduh dan dikirimkan karena lebih kecil dari SD';
            conn.reply(m.chat, hdWarning, m);
        }

        for (let index = 0; index < mp4Links.length; index++) {
            const link = mp4Links[index];
            const buffer = await fetch(link).then(res => res.buffer());
            const resolution = index === 0 ? 'SD' : 'HD';
            const caption = `Resolusi: (${resolution})\n${title}\n\n${description}\nURL dari pengguna: ${args[0]}`;
            await conn.sendMessage(
                m.chat, {
                    video: buffer,
                    mimetype: "video/mp4",
                    fileName: `video_${index + 1}.mp4`,
                    caption: `Ini video Anda @${sender} \n${caption}`,
                    mentions: [m.sender],
                }, {
                    quoted: m
                },
            );
            await conn.sendMessage(
                m.chat, {
                    document: buffer,
                    mimetype: "video/mp4",
                    fileName: `video_${index + 1}.mp4`,
                    caption: `Ini video Anda @${sender} *VERSI DOKUMEN* \n${caption}`,
                    mentions: [m.sender],
                }, {
                    quoted: m
                },
            );
        }

        const audioBuffer = await fetch(sdLink).then(res => res.buffer());

        let audio = await toPTT(audioBuffer, 'mp4');
        if (!audio.data) throw 'Tidak dapat mengonversi media ke audio';
        conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, {
            mimetype: 'audio/mp3'
        });
        await conn.sendMessage(
            m.chat, {
                audio: audioBuffer,
                mimetype: "mpeg/mp3",
                fileName: `audio.mp3`,
                caption: ``,
                mentions: [m.sender],
            }, {
                quoted: m
            },
        );

    } catch (error) {
        console.error('Kesalahan Fetch:', error);
        conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.' + error, m);
    }
};

handler.help = ['fbdownload <url>'];
handler.tags = ['downloader'];
handler.command = /^(fbdownload|fb(dl)?)$/i;

export default handler;
