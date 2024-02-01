// //import ytdl from '@distube/ytdl-core';
// import ytdl from 'ytdl-core';

// let handler = async (m, { conn, args, usedPrefix, command }) => {
//   if (!args[0]) {
//     return m.reply(`Masukkan Link:\n${usedPrefix + command} https://youtu.be/iik25wqIuFo`);
//   }

//   const videoURL = args[0];

//   try {
//     const loadingMessage = await conn.reply(m.chat, `Sedang mengambil informasi video...\n${global.wait}`, m);

//     const info = await ytdl.getInfo(videoURL);

//     for (const format of info.formats) {
//       await conn.sendFile(m.chat, format.url, 'video.mp4', `Resolusi Video ${format.qualityLabel}`, m, null, true);
//     }

//     // const allUrls = info.formats.map(format => `${format.qualityLabel}: ${format.url}`).join('\n');
//     // await m.reply(`Resolusi Video:\n${allUrls}`);

//     await m.reply("Done\nAll video has been sent");
      
//   } catch (error) {
//     console.error('Error fetching video info:', error);
//     await m.reply(`Error fetching video info: error ${error}`);
//   }
// }

// handler.command = /^(getvid|ytmp4|youtubemp4|ytv|youtubevideo)$/i;
// handler.help = ["ytv <linkYt>", "ytmp4 <linkYT>"];
// handler.tags = ['downloader'];

// export default handler;

import axios from 'axios';

let handler = async (m, {
    conn,
    args,
    command,
    usedPrefix
}) => {
    const url = args[0];
    if (!url) {
        return m.reply(`Silakan masukkan link YouTube\n${usedPrefix + command} https://www.youtube.com/watch?v=LkKSzz_S3xk`);
    }

    const sender = m.sender.split(`@`)[0];

    try {
        const response = await axios.get(`https://vihangayt.me/download/ytmp4?url=${encodeURIComponent(url)}`);
        const result = response.data;

        if (result.status) {
            const {
                title,
                thumbnail,
                duration
            } = result.data;

            // Mendapatkan semua video yang tersedia
            const availableVideos = Object.keys(result.data)
                .filter(key => key.startsWith('vid_'))
                .reduce((videos, key) => {
                    const resolution = key.replace('vid_', '');
                    videos[resolution] = result.data[key];
                    return videos;
                }, {});

            if (Object.keys(availableVideos).length > 0) {
                // Mengirim semua video yang tersedia
                for (const [resolution, videoUrl] of Object.entries(availableVideos)) {
                    /*await conn.sendFile(
                      m.chat,
                      videoUrl,
                      `Youtube_${resolution}.mp4`,
                      `Ini kak videonya @${sender} dengan resolusi ${resolution}, versi dokumen agar jernih`,
                      m
                    );*/
                    await conn.sendMessage(
                        m.chat, {
                            video: {
                                url: videoUrl
                            },
                            caption: `Youtube_${resolution}.mp4\nIni kak videonya @${sender} dengan resolusi ${resolution}, versi dokumen agar jernih`,
                            mentions: [m.sender],
                        },
                        m,
                    );
                }
            } else {
                return m.reply('Tidak ditemukan video yang dapat diunduh.');
            }
        } else {
            return m.reply('Gagal mengambil informasi video. Pastikan link YouTube valid.');
        }
    } catch (error) {
        console.error(error);
        return m.reply('Terjadi kesalahan saat melakukan pengambilan data. Coba lagi nanti.');
    }
};

handler.command = /^(yutup|yutupmp4)$/i;
handler.help = ['yutup <linkYT>', 'yutupmp4 <linkYT>'];
handler.tags = ['downloader'];

export default handler;
