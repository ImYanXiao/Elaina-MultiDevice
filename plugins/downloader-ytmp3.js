import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
    try {
        if (!args[0]) throw `Please provide a YouTube URL\nEx: ${usedPrefix + command} https://www.youtube.com/watch?v=UUfVNNrihNs`;

        const pattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = args[0].match(pattern);
        if (!match) throw 'Invalid YouTube URL';
        const videoId = match[1];
        
        await conn.reply(m.chat, `Fetching highest and lowest resolution videos...\nVideo ID: ${videoId}\n${wait}`, m);

        const highestUrl = 'https://aemt.me/' + encodeURIComponent(videoId) + '.mpeg?filter=audioonly&quality=highestaudio&contenttype=audio/mpeg';
        const lowestUrl = 'https://aemt.me/' + encodeURIComponent(videoId) + '.mpeg?filter=audioonly&quality=lowestaudio&contenttype=audio/mpeg';

        const highestResponse = await fetch(highestUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
    			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
    			'Sec-Fetch-Dest': 'document',
    			'Sec-Fetch-Mode': 'navigate',
    			'Sec-Fetch-Site': 'same-origin',
    			'Sec-Fetch-User': '?1'
            }
        });
        const lowestResponse = await fetch(lowestUrl, {
            headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
    			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
    			'Sec-Fetch-Dest': 'document',
    			'Sec-Fetch-Mode': 'navigate',
    			'Sec-Fetch-Site': 'same-origin',
    			'Sec-Fetch-User': '?1'
            }
        });

        if (!highestResponse.ok || !lowestResponse.ok) throw 'Failed to fetch audios';

        const highestBuffer = await highestResponse.buffer();
        const lowestBuffer = await lowestResponse.buffer();
        
        await conn.sendFile(m.chat, highestBuffer, `${videoId}_highest.mp3`, `Highest resolution audio`, m, null, { mimetype: 'audio/mpeg', asDocument: true });
        await conn.sendFile(m.chat, highestBuffer, `${videoId}_highest.mp3`, `Highest resolution audio`, m);
        await conn.sendFile(m.chat, lowestBuffer, `${videoId}_lowest.mp3`, `Lowest resolution audio`, m, null, { mimetype: 'audio/mpeg', asDocument: true });
        await conn.sendFile(m.chat, lowestBuffer, `${videoId}_lowest.mp3`, `Lowest resolution audio`, m);
    } catch (error) {
        console.error('Fetch Error:', error);
        conn.reply(m.chat, error, m);
    }
};

handler.tags = ['downloader']
handler.command = /^ytaudio|yutupmp3|getaudio$/i // handler.command = /^yta|ytmp3|youtubemp3|getaud$/i
export default handler
