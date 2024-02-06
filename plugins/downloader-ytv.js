import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
    try {
        if (!args[0]) throw `Please provide a YouTube URL\nEx: ${usedPrefix + command} https://www.youtube.com/watch?v=UUfVNNrihNs`;

        const pattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = args[0].match(pattern);
        if (!match) throw 'Invalid YouTube URL';
        const videoId = match[1];
        
        await conn.reply(m.chat, `Fetching highest and lowest resolution videos...\n${wait}`, m);

        const highestUrl = 'https://aemt.me/' + encodeURIComponent(videoId) + '.mp4?filter=&quality=highestvideo&contenttype=video/mp4';
        const lowestUrl = 'https://aemt.me/' + encodeURIComponent(videoId) + '.mp4?filter=&quality=lowestvideo&contenttype=video/mp4';

        const highestResponse = await fetch(highestUrl, {
            headers: {
                'Connection': 'keep-alive',
            }
        });
        const lowestResponse = await fetch(lowestUrl, {
            headers: {
                'Connection': 'keep-alive',
            }
        });

        if (!highestResponse.ok || !lowestResponse.ok) throw 'Failed to fetch videos';

        const highestBuffer = await highestResponse.buffer();
        const lowestBuffer = await lowestResponse.buffer();
        
        await conn.sendFile(m.chat, highestBuffer, `${videoId}_highest.mp4`, `Highest resolution video`, m, null, { mimetype: 'video/mp4', asDocument: true });
        await conn.sendFile(m.chat, highestBuffer, `${videoId}_highest.mp4`, `Highest resolution video`, m);
        await conn.sendFile(m.chat, lowestBuffer, `${videoId}_lowest.mp4`, `Lowest resolution video`, m, null, { mimetype: 'video/mp4', asDocument: true });
        await conn.sendFile(m.chat, lowestBuffer, `${videoId}_lowest.mp4`, `Lowest resolution video`, m);
    } catch (error) {
        console.error('Fetch Error:', error);
        conn.reply(m.chat, error, m);
    }
};

handler.command = /^(getvid|ytmp4|youtubemp4|ytv|youtubevideo)$/i;
handler.help = ['ytmp4 <linkYT>', 'youtubemp4 <linkYT>'];
handler.tags = ['downloader'];

export default handler;
