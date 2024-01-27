import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs/promises";
import { tiktokdl } from "@bochilteam/scraper-sosmed";

var handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*[❗] Example: ${
      usedPrefix + command
    } https://www.tiktok.com/@tuanliebert/video/7313159590349212934?is_from_webapp=1&sender_device=pc`;
  }

  const sender = m.sender.split(`@`)[0];

  try {
    await conn.reply(
      m.chat,
      "Tunggu sebentar kak, video sedang di download... server 1",
      m
    );

    const tiktokData = await tryServer1(args[0]);

    if (!tiktokData) {
      throw "Gagal mendownload video!";
    }

    const videoURL = tiktokData.video.noWatermark;

    const videoURLWatermark = tiktokData.video.watermark;

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

    if (videoURL || videoURLWatermark) {
      await conn.sendFile(
        m.chat,
        videoURL,
        "tiktok.mp4",
        `Ini kak videonya\n\n${infonya_gan}`,
        m
      );

      
      await conn.sendFile(
        m.chat,
        videoURLWatermark,
        "tiktokwm.mp4",
        `*Ini Versi Watermark*\n\n${infonya_gan}`,
        m
      );

      await conn.sendFile(
        m.chat,
        `${tiktokData.music.play_url}`,
        "lagutt.mp3",
        "ini lagunya",
        m
      );
      conn.reply(
        m.chat,
        "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎",
        m
      );

    } else {
      throw "Tidak ada tautan video yang tersedia.";
    }
  } catch (error1) {
    // Server 1 failed, try Server 2
    try {
      await conn.reply(
        m.chat,
        "Tunggu sebentar kak, video sedang di download... server 2",
        m
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

      await conn.sendFile(
        m.chat,
        avatarURL,
        "thumbnail.jpg",
        `Ini thumbnail videonya\n\n${infonya_gan2}`,
        m
      );
      await conn.sendFile(
        m.chat,
        no_watermark,
        "tiktok2.mp4",
        "Ini kak videonya dari Server 2",
        m
      );
      await conn.sendFile(
        m.chat,
        no_watermark_hd,
        "tiktokhd2.mp4",
        "Ini kak videonya dari Server 2 lebih hd",
        m
      );

      const audioURL2 = `suaratiktok.mp3`;
      await convertVideoToMp3(no_watermark, audioURL2);
      if (audioURL2) {
        await conn.sendFile(
          m.chat,
          mp3FileName,
          mp3FileName,
          `ini kak suaranya @${sender} versi MP3`,
          m
        );
        await fs.unlink(mp3FileName);
      }

      await conn.reply(
        m.chat,
        "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎",
        m
      );
    } catch (error2) {
      // Server 2 failed, try Server 3
      try {
        await conn.reply(
          m.chat,
          "Tunggu sebentar kak, video sedang di download... server 3",
          m
        );

        const tiktokData3 = await tryServer3(args[0]);

        if (!tiktokData3) {
          throw "Gagal mendownload video!";
        }

        const { data  } = tiktokData3;

        const {
          title,
          play,
          size,
          wm_size,
          hd_size,
          play_count,
          comment_count,
          share_count,
          download_count,
          collect_count,
          create_time,
        } = data;
      
        const musicInfo = tiktokData3.data.music_info;
        const { play: musicPlay, title: musicTitle } = musicInfo;
      
        const sizeInMB = (sizeInBytes) => (sizeInBytes / (1024 * 1024)).toFixed(2);
      
        const sizeInMB_size = sizeInMB(size);
        const sizeInMB_wm_size = sizeInMB(wm_size);
        const sizeInMB_hd_size = sizeInMB(hd_size);
      
        const pesan = `Judul = ${title}\nView = ${play_count}\nKomen = ${comment_count}\nShare = ${share_count}\nDownload = ${download_count}\nSimpan = ${collect_count}\nUpload = ${create_time}`;
      
        await conn.sendFile(
          m.chat,
          play,
          'tiktok3.mp4',
          `*TANPA WATERMARK*\nUkuran: ${sizeInMB_size} MB\n\n${pesan}`,
          m
        );
        await conn.sendFile(
          m.chat,
          data.wmplay,
          'tiktokwm3.mp4',
          `*WATERMARK*\nUkuran: ${sizeInMB_wm_size} MB\n\n${pesan}`,
          m
        );
        await conn.sendFile(
          m.chat,
          data.hdplay,
          'tiktokhd3.mp4',
          `*HD No Watermark (TANPA WATERMARK)*\nUkuran: ${sizeInMB_hd_size} MB\n\n${pesan}`,
          m
        );
        await conn.sendFile(
          m.chat,
          musicPlay,
          'tiktokmp3.mp3',
          `*MUSIC*\nJudul: ${musicTitle}`,
          m
        );
        await conn.reply(
          m.chat,
          "•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎",
          m
        );
      } catch (error3) {
        conn.reply(m.chat, `Error: ${error3}`, m);
      }
    }
  }
};

async function tryServer1(url) {
  // Try using tiklydown.eu.org API first
  try {
    let tiklydownAPI = `https://api.tiklydown.eu.org/api/download?url=${url}`;
    let response = await axios.get(tiklydownAPI, {
      headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Cookie': 'cf_clearance=IDhpJ2RO8UDI40tXLI4g45ZZGDiET0lnWy6bO.4oLqQ-1706368220-1-ASlDi8PXO3c7Jk/wNqrgxTj4gCrY4qr6QonEpMmvW1EKPYICk//uDMJ+wFCv2LXuv7t26eyFoSyVEGbdV8dV2gQ=',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'If-None-Match': 'W/faa-OLjMXtR3QSf5fGpXMh35fxB63x0'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function tryServer3(url) {
  // Try using skizo.tech API as Server 3
  try {
    let skizoTechAPI = 'https://skizo.tech/api/tiktok';
    let response = await axios.post(skizoTechAPI, {
      'url': `${url}`
    }, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
        'Accept': '*/*',
        'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://tiktok.vihangayt.me/',
        'Content-Type': 'application/json',
        'Authorization': 'https://skizo.tech',
        'Origin': 'https://tiktok.vihangayt.me',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'TE': 'trailers'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

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
handler.exp = 500
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;
