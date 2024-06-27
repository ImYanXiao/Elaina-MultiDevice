//Script by ShirokamiRyzen

import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {

    if (!args[0]) throw 'Please provide a Facebook video URL';
    const sender = m.sender.split(`@`)[0];

    m.reply('Please wait...');

    try {
        const url = args[0];
        const apiUrl = `https://aemt.me/download/fbdl?url=${url}`;
        let response = await fetch(apiUrl);
        let result = await response.json();

        if (!result || !result.status || !result.result || (!result.result.HD && !result.result.Normal_video)) {
            // Try the second API if the first one fails
            const backupApiUrl = `https://aemt.me/download/fbdown?url=${url}`;
            response = await fetch(backupApiUrl);
            result = await response.json();

            if (!result || !result.status || !result.result || !result.result.url) {
                throw 'Failed to fetch video details from both APIs';
            }

            const videoLink = result.result.url.isHdAvailable ? result.result.url.urls[0].hd : result.result.url.urls[1].sd;
            const caption = `
*Title*: ${result.result.url.title || 'No title'}

*HD Link*: ${result.result.url.isHdAvailable ? result.result.url.urls[0].hd : 'Not available'}
*SD Link*: ${result.result.url.urls[1].sd}
`;

            const videoBuffer = await fetch(videoLink).then(res => res.buffer());

            await conn.sendMessage(
                m.chat, {
                video: videoBuffer,
                mimetype: "video/mp4",
                fileName: `video.mp4`,
                caption: `Ini kak videonya @${sender} \n${caption}`,
                mentions: [m.sender],
            }, {
                quoted: m
            });
        } else {
            // Handle the first API response
            const videoLink = result.result.HD || result.result.Normal_video;
            const caption = `
*Title*: ${result.result.title || 'No title'}

${result.result.description || 'No description'}

*HD Link*: ${result.result.HD || 'Not available'}
*Normal Video Link*: ${result.result.Normal_video || 'Not available'}
`;

            const videoBuffer = await fetch(videoLink).then(res => res.buffer());

            await conn.sendMessage(
                m.chat, {
                video: videoBuffer,
                mimetype: "video/mp4",
                fileName: `video.mp4`,
                caption: `Ini kak videonya @${sender} \n${caption}`,
                mentions: [m.sender],
            }, {
                quoted: m
            });
        }
    } catch (error) {
        console.error('Handler Error:', error);
        conn.reply(m.chat, `An error occurred: ${error}`, m);
    }
};

handler.help = ['fb <url>'];
handler.tags = ['downloader'];
handler.command = /^(fbdownload|facebook|fb(dl)?)$/i;

handler.register = true;

export default handler;
