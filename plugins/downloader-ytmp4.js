//import ytdl from '@distube/ytdl-core';
import ytdl from 'ytdl-core';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`Masukkan Link:\n${usedPrefix + command} https://youtu.be/iik25wqIuFo`);
  }

  const videoURL = args[0];

  try {
    const loadingMessage = await conn.reply(m.chat, `Sedang mengambil informasi video...\n${global.wait}`, m);

    const info = await ytdl.getInfo(videoURL);

    for (const format of info.formats) {
      await conn.sendFile(m.chat, format.url, 'video.mp4', `Resolusi Video ${format.qualityLabel}`, m, null, true);
    }

    // const allUrls = info.formats.map(format => `${format.qualityLabel}: ${format.url}`).join('\n');
    // await m.reply(`Resolusi Video:\n${allUrls}`);

    await m.reply("Done\nAll video has been sent");
      
  } catch (error) {
    console.error('Error fetching video info:', error);
    await m.reply(`Error fetching video info: error ${error}`);
  }
}

handler.command = /^(getvid|ytmp4|youtubemp4|ytv|youtubevideo)$/i;
handler.help = ["ytv <linkYt>", "ytmp4 <linkYT>"];
handler.tags = ['downloader'];

export default handler;
