import { instagramdl } from '@bochilteam/scraper';

var handler = async (m, { args }) => {
    if (!args[0]) throw 'Input URL';
    try {
        let res = await bochil.snapsave(args[0]);
        let media = await res[0].url;
        const sender = m.sender.split(`@`)[0];

        if (!res) throw 'Can\'t download the post';
        conn.sendMessage(m.chat, { video: { url: media } }, m);

        const message = `Video berhasil diunduh, request dari @${sender}`;
        conn.reply(m.chat, message, m, { mentions: [m.sender] });
    } catch (e) {
        try {
            let res2 = await instagramdl(args[0]);
            let media2 = res2.url;
            let cap = res2.title;
            const sender = m.sender.split(`@`)[0];

            conn.reply(m.chat, 'Sedang mengunduh video...', m);

            conn.sendFile(m.chat, media2, 'instagram.mp4', cap, m);

            
            const message = `Video berhasil diunduh, request dari @${sender}`;
            conn.reply(m.chat, message, m, { mentions: [m.sender] });
        } catch (error) {
            conn.reply(m.chat, 'Gagal mengunduh video', m);
        }
    }
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;
