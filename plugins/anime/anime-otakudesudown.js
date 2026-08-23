import axios from 'axios';

const API_URL_DOWNLOAD = 'https://api.siputzx.my.id/api/anime/otakudesu/download';

const handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) {
            return m.reply(`Masukkan URL anime atau episode yang ingin di-download!\n\nContoh:\n${usedPrefix + command} https://otakudesu.cloud/episode/blue-archive-episode-1`);
        }

        const url = text.trim();
        const { data: result } = await axios.get(`${API_URL_DOWNLOAD}?url=${url}`);

        if (!result.status || !result.data || !result.data.downloads) {
            return m.reply('Gagal mendapatkan link download. Pastikan URL yang Anda masukkan benar.');
        }

        const { title, downloads } = result.data;

        let teks = `*Judul:* ${title}\n\n*Link Download:*\n`;
        downloads.forEach((dl, i) => {
            teks += `\n${i + 1}. *Quality:* ${dl.quality} | *Host:* ${dl.host}\n➤ [Download Link](${dl.link})`;
        });

        await conn.sendMessage(
            m.chat,
            {
                text: teks,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: 'Klik link untuk mendownload',
                        thumbnailUrl: 'https://otakudesu.cloud/wp-content/uploads/2024/12/Blue-Archive-the-Animation-Sub-Indo.jpg',                     
                        mediaType: 2,
                        sourceUrl: url,
                    },
                },
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        m.reply(`Terjadi kesalahan saat mengambil link download. Error: ${error.message}`);
    }
};

handler.help = ['animdown'];
handler.tags = ['anime'];
handler.command = /^(animdown)$/i;
handler.limit = true;

export default handler;
