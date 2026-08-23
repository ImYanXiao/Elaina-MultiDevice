import fetch from 'node-fetch';

var handler = async (m, { args, conn, usedPrefix, command }) => {
    if (!args[0]) throw `Ex:\n${usedPrefix}${command} https://www.instagram.com/reel/C-iSoITsIJ-/?igsh=eHQzNmN3azNydWQw pastikan saling link bukan share reels`;
    try {
        const sender = m.sender.split(`@`)[0];

                                 
        const response = await fetch(`https://api.vreden.web.id/api/igdownload?url=${encodeURIComponent(args[0])}`);
        const data = await response.json();

        if (!data.status || !data.result?.response?.data[0]?.url) throw 'Gagal mengunduh video';

        const media = data.result.response.data[0].url;

        conn.reply(m.chat, 'Sedang mengunduh video...', m);

                              
        await conn.sendMessage(m.chat, { 
            video: { url: media }, 
            caption: `ini kak videonya @${sender}`, 
            mentions: [m.sender] 
        }, m);

                                
        await conn.sendMessage(m.chat, { 
            document: { url: media }, 
            mimetype: 'video/mp4', 
            fileName: `instagram.mp4`,
            caption: `ini kak videonya @${sender} versi dokumen, agar jernih`, 
            mentions: [m.sender] 
        }, {quoted: m});
    } catch (error) {
        conn.reply(m.chat, `Gagal mengunduh video: ${error.message || error}`, m);
    }
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;
