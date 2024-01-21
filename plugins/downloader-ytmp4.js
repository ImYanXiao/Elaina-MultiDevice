import ytdl from '@distube/ytdl-core';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // const videoURL = 'https://www.youtube.com/watch?v=LkKSzz_S3xk';
  if (!args[0]) {
    return m.reply(`Masukkan Link:\n${usedPrefix + command} https://youtu.be/iik25wqIuFo`);
  }

  const videoURL = args[0];
  try {
    const info = await ytdl.getInfo(videoURL);
    for (const format of info.formats) {
      console.log(format.qualityLabel, format.url);
      await conn.sendFile(m.chat, format.url, 'video.mp4', `Resolusi Video ${format.qualityLabel}`, m);
    }
  } catch (error) {
    console.error('Error fetching video info:', error);
    await m.reply("Error fetching video info");
  }
}

handler.command = /^(getvid|ytmp4|youtubemp4|ytv|youtubevideo)$/i;
handler.help = ["ytv <linkYt>", "ytmp4 <linkYT>"];
handler.tags = ['downloader'];

export default handler;
