import axios from "axios";
// import cheerio from "cheerio";
import { tiktokdl } from "@bochilteam/scraper-sosmed";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs/promises";

var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*[❗] Example: ${
      usedPrefix + command
    } https://www.tiktok.com/@tuanliebert/video/7313159590349212934?is_from_webapp=1&sender_device=pc`;
  }

  try {
    await conn.reply(
      m.chat,
      "Tunggu sebentar kak, video sedang di download... server 1",
      m,
    );

    const tiktokData = await tryServer1(args[0]);

    if (!tiktokData) {
      throw "Gagal mendownload video!";
    }

    const videoURL = tiktokData.video.noWatermark;

    const videoURLWatermark = tiktokData.video.watermark;

    // let ppTiktok = '';
    // if (tiktokData.author && tiktokData.author.avatar) {
    //   ppTiktok = tiktokData.author.avatar;
    // }

    const infonya_gan = `Judul: ${tiktokData.title}\nUpload: ${
      tiktokData.created_at
    }\n\nSTATUS:\n=====================\nLike = ${
      tiktokData.stats.likeCount
    }\nKomen = ${tiktokData.stats.commentCount}\nShare = ${
      tiktokData.stats.shareCount
    }\nViews = ${tiktokData.stats.playCount}\nSimpan = ${
      tiktokData.stats.saveCount
    }\n=====================\n\nUploader: ${
      tiktokData.author.name || "Tidak ada informasi penulis"
    }\n(${tiktokData.author.unique_id} - https://www.tiktok.com/@${
      tiktokData.author.unique_id
    } )\nBio: ${tiktokData.author.signature}\nLagu: ${
      tiktokData.music.play_url
    }\nResolusi: ${tiktokData.video.ratio}\n`;
    // Foto Profile: ${ppTiktok}

    if (videoURL || videoURLWatermark) {
      // if (ppTiktok) {
      //   await conn.sendFile(m.chat, ppTiktok, 'profile.png', 'ini foto profilenya', m);
      // }
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
          `${tiktokData.music.play_url}`,
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
    // Server 1 failed, try Server 2
    try {
      await conn.reply(
        m.chat,
        "Tunggu sebentar kak, video sedang di download... server 2",
        m,
      );
      const tiktokData2 = await tiktokdl(args[0]);

      if (!tiktokData2.success) {
        throw "Gagal mendownload video!";
      }

      const { author, video } = tiktokData2;
      const { unique_id, nickname, avatar } = author;
      const { no_watermark, no_watermark_hd } = video;

      const avatarURL =
        avatar ||
        "https://i.pinimg.com/564x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg";

      const infonya_gan2 = `ID Unik: ${unique_id}\nNickname: ${nickname}`;

      // Lakukan apa yang Anda perlukan dengan tiktokData2 dari Server 2 di sini
      await conn.sendFile(
        m.chat,
        avatarURL,
        "thumbnail.jpg",
        `Ini thumbnail videonya\n\n${infonya_gan2}`,
        m,
      );
      await conn.sendFile(
        m.chat,
        no_watermark,
        "tiktok2.mp4",
        "Ini kak videonya dari Server 2",
        m,
      );
      await conn.sendFile(
        m.chat,
        no_watermark_hd,
        "tiktokhd2.mp4",
        "Ini kak videonya dari Server 2 lebih hd",
        m,
      );

      const audioURL2 = `suaratiktok.mp3`;
      await convertVideoToMp3(no_watermark, audioURL2);
      if (audioURL2) {
        // Send the MP3 file
        await conn.sendFile(
          m.chat,
          mp3FileName,
          mp3FileName,
          `ini kak suaranya @${sender} versi MP3`,
          m,
        );

        // Remove the temporary MP3 file
        await fs.unlink(mp3FileName);
      }

      await conn.reply(
        m.chat,
        "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎",
        m,
      );
    } catch (error2) {
      // Jika server kedua juga gagal, tangani error di sini
      conn.reply(m.chat, `Error: ${error2}`, m);
    }
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

async function tryServer1(url) {
  // Try using tiklydown.eu.org API first
  let tiklydownAPI = `https://api.tiklydown.eu.org/api/download?url=${url}`;
  let response = await axios.get(tiklydownAPI);
  return response.data;
}
