import { mediafireDl } from 'neastooapi';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.room = conn.room ? conn.room : {};
    if (!args[0]) {
        return m.reply(`Masukkan URL!\n\nContoh:\n${usedPrefix + command} https://www.mediafire.com/file/example`);
    }

    let id = 'mediafire' + m.sender;
    if (id in conn.room) return m.reply('Kamu masih mendownload!');
    if (!/https:\/\/www.mediafire.com\//i.test(args[0])) {
        return m.reply('URL tidak valid!');
    }
    conn.room[id] = true;

    try {
                                                  
        const data = await mediafireDl(args[0]);

        if (!data || !data.downloadLink || !data.fileName || !data.fileSize) {
            throw new Error('Gagal mendapatkan data file!');
        }

        const { downloadLink, fileName, fileSize } = data;

                                           
        let caption = `
[ MEDIAFIRE ]
*📮 Nama File:* ${fileName}
*📁 Ukuran File:* ${fileSize}
`.trim();
        m.reply(caption);

                                                       
        conn.sendFile(m.chat, downloadLink, fileName, '', m, false, { asDocument: true });
    } catch (e) {
        console.error('Error occurred:', e);                                         
        m.reply('Terjadi kesalahan saat memproses permintaan Anda. Coba lagi nanti.');
    } finally {
        delete conn.room[id];
    }
};

handler.help = ['mediafire'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(mediafire|mf)$/i;
handler.limit = true;

export default handler;
