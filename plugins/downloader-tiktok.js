import ffmpeg from "fluent-ffmpeg";

var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*[❗] Example: ${
      usedPrefix + command
    } https://www.tiktok.com/@tuanliebert/video/7313159590349212934?is_from_webapp=1&sender_device=pc`;
  }

  try {
    await conn.reply(
      m.chat,
      "Tunggu sebentar kak, video sedang di download...",
      m,
    );

    const tiktokData = await tiktokdl(args[0]);

    if (!tiktokData) {
      throw "Gagal mendownload video!";
    }

    const videoURL = tiktokData.data.play;

    const videoURLWatermark = tiktokData.data.wmplay;

    const infonya_gan = `Judul: ${tiktokData.data.title}\nUpload: ${
      tiktokData.data.create_time
    }\n\nSTATUS:\n=====================\nLike = ${
      tiktokData.data.digg_count
    }\nKomen = ${tiktokData.data.comment_count}\nShare = ${
      tiktokData.data.share_count
    }\nViews = ${tiktokData.data.play_count}\nSimpan = ${
      tiktokData.data.download_count
    }\n=====================\n\nUploader: ${
      tiktokData.data.author.nickname || "Tidak ada informasi penulis"
    }\n(${tiktokData.data.author.unique_id} - https://www.tiktok.com/@${
      tiktokData.data.author.unique_id
    } )\nSound: ${
      tiktokData.data.music
    }\n`;

    if (videoURL || videoURLWatermark) {
      await conn.sendFile(
        m.chat,
        videoURL,
        "tiktok.mp4",
        `Ini kak videonya\n\n${infonya_gan}`,
        m,
      );
      setTimeout(async () => {
        await conn.sendFile(
          m.chat,
          videoURLWatermark,
          "tiktokwm.mp4",
          `*Ini Versi Watermark*\n\n${infonya_gan}`,
          m,
        );
        await conn.sendFile(
          m.chat,
          `${tiktokData.data.music}`,
          "lagutt.mp3",
          "ini lagunya",
          m,
        );
        conn.reply(
          m.chat,
          "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎",
          m,
        );
      }, 1500);
    } else {
      throw "Tidak ada tautan video yang tersedia.";
    }
  } catch (error1) {
      conn.reply(m.chat, `Error: ${error1}`, m);
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
  let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
  let response = await (await fetch(tikwm)).json() 
  return response
      }
