import ffmpeg from "fluent-ffmpeg";

var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*[❗] Example: ${usedPrefix + command} <URL>`;
  }

  try {
    await conn.reply(m.chat, "Tunggu sebentar kak, sedang dalam proses...", m);

    const tiktokData = await tiktokdl(args[0]);

    if (!tiktokData) {
      throw "Gagal mendownload video!";
    }

    const videoURL = tiktokData.data.play;
    const videoURLWatermark = tiktokData.data.wmplay;
    const images = tiktokData.data.images; 
    const audioURL = tiktokData.data.music;

    const infonya_gan = `Judul: ${tiktokData.data.title}\nUpload: ${tiktokData.data.create_time}\n\nSTATUS:\n=====================\nLike = ${tiktokData.data.digg_count}\nKomen = ${tiktokData.data.comment_count}\nShare = ${tiktokData.data.share_count}\nViews = ${tiktokData.data.play_count}\nSimpan = ${tiktokData.data.download_count}\n=====================\n\nUploader: ${tiktokData.data.author.nickname || "Tidak ada informasi penulis"}\n(${tiktokData.data.author.unique_id} - https://www.tiktok.com/@${tiktokData.data.author.unique_id} )\nSound: ${tiktokData.data.music}\n`;

    if (images && images.length > 0) {
      for (let image of images) {
        await conn.sendFile(m.chat, image, "image.jpg", `Ini kak gambarnya\n\n${infonya_gan}`, m);
      }

      if (audioURL) {
        await conn.sendFile(m.chat, audioURL, "lagutt.mp3", "Ini lagunya", m);
      }

    } else if (videoURL || videoURLWatermark) { 
      await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `Ini kak videonya\n\n${infonya_gan}`, m);
      
      if (videoURLWatermark) {
        await conn.sendFile(m.chat, videoURLWatermark, "tiktokwm.mp4", `*Ini Versi Watermark*\n\n${infonya_gan}`, m);
      }

      const audioFileName = "lagutt.mp3";
      await convertVideoToMp3(videoURL, audioFileName);
      await conn.sendFile(m.chat, audioFileName, "lagutt.mp3", "Ini lagunya", m);
      
    } else {
      throw "Tidak ada tautan slide/video yang tersedia.";
    }

    conn.reply(m.chat, "Enjoy With The Content", m);

  } catch (e) {
    conn.reply(m.chat, `Error: ${e}`, m);
  }
};

async function convertVideoToMp3(videoUrl, outputFileName) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoUrl)
      .toFormat("mp3")
      .on("end", () => resolve())
      .on("error", (err) => reject(err))
      .save(outputFileName);
  });
}

handler.help = ["tiktok"].map((v) => v + " <url>");
handler.tags = ["downloader"];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;

async function tiktokdl(url) {
  let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`;
  let response = await (await fetch(tikwm)).json();
  return response;
}
