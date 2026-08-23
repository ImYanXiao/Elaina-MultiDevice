let handler = async (m, { conn }) => {
    if (!m.quoted) return m.reply('Reply gambar/video yang ingin Anda lihat');
    if (!m.quoted.viewOnce) return m.reply('Itu bukan pesan view-once!');

    try {
        let mediaType = m.quoted.mtype;
        let buffer = await m.quoted.download();

        let type;
        if (mediaType === 'imageMessage') {
            type = 'image';
        } else if (mediaType === 'videoMessage') {
            type = 'video';
        } else {
            return m.reply('❌ Tipe media tidak didukung.');
        }

        let caption = (m.quoted.text && m.quoted.text.trim() !== '') 
            ? m.quoted.text 
            : '✅ Berhasil membuka pesan view-once!';

        await conn.sendMessage(
            m.chat,
            { 
                [type]: buffer, 
                caption, 
                viewOnce: false 
            },
            { quoted: m }
        );  
    } catch (e) {
        console.error(e);
        m.reply('❌ Gagal membuka pesan view-once.');
    }
};

handler.help = ['readviewonce'];
handler.tags = ['tools'];
handler.command = ['rvo', 'readviewonce', 'read', 'liat', 'readvo'];

export default handler;