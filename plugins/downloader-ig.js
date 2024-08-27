// Script coded by github.com/Xnuvers007
import { instagramdl, snapsave, savefrom } from "@bochilteam/scraper";
import fetch from "node-fetch";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs/promises";

var handler = async (m, { args, conn, usedPrefix, command }) => {
  if (!args[0])
    throw `Ex:\n${usedPrefix}${command} https://www.instagram.com/reel/C0EEgMNSSHw/?igshid=MzY1NDJmNzMyNQ==`;
  const instagramUrlRegex = /^(https?:\/\/)?(www\.)?instagram\.com/i;
  if (!instagramUrlRegex.test(args[0])) {
    conn.reply(
      m.chat,
      `Harap masukkan link Instagram\ncontoh: ${usedPrefix}${command} https://www.instagram.com/reel/C0zv5N7ShOs/?utm_source=ig_web_copy_link`,
      m
    );
    return;
  }

  let res;
  try {
    res = await snapsave(args[0]);
    conn.reply(m.chat, "Sedang mengunduh video... pada server snapsave", m);
  } catch (error1) {
    try {
      res = await instagramdl(args[0]);
      conn.reply(
        m.chat,
        "Sedang mengunduh video... pada server instagramdl",
        m
      );
    } catch (error2) {
      try {
        res = await savefrom(args[0]);
        conn.reply(m.chat, "Sedang mengunduh video... pada server savefrom", m);
      } catch (error3) {
        console.log("error", error3);
        conn.reply(m.chat, "Gagal mengunduh video", m);
      }
    }
    conn.reply(m.chat, "error", m);
  }


  try {
    let media = await res[0].url;
    const sender = m.sender.split(`@`)[0];

    // conn.reply(m.chat, 'Sedang mengunduh video... pada server 1', m);

    if (!res) throw "Can't download the post";

    await conn.sendMessage(
      m.chat,
      {
        video: { url: media },
        caption: `ini kak videonya @${sender}`,
        mentions: [m.sender],
      },
      m,
    );

    await conn.sendMessage(
      m.chat,
      {
        document: { url: media },
        mimetype: "video/mp4",
        fileName: `instagram.mp4`,
        caption: `ini kak videonya @${sender} versi dokumen, agar jernih`,
        mentions: [m.sender],
      },
      { quoted: m },
    );

    const mp3FileName = `suara.mp3`;
    await convertVideoToMp3(media, mp3FileName);

    await conn.sendFile(
      m.chat,
      mp3FileName,
      mp3FileName,
      `ini kak suaranya @${sender} versi MP3`,
      m,
    );

    await fs.unlink(mp3FileName);
  } catch (e) {
    try {
      let response = await fetch(
        `https://tr.deployers.repl.co/instagramdl?url=${encodeURIComponent(
          args[0],
        )}`,
      );
      let data = await response.json();

      if (data.image || data.video) {
        const sender = m.sender.split(`@`)[0];

        conn.reply(m.chat, "Sedang mengunduh video... pada server 2", m);

        await conn.sendMessage(
          m.chat,
          {
            video: data.video,
            caption: `ini kak videonya @${sender}`,
            mentions: [m.sender],
          },
          m,
        );

        await conn.sendMessage(
          m.chat,
          {
            document: { url: data.video },
            mimetype: "video/mp4",
            fileName: `dokumen.mp4`,
            caption: `ini kak videonya @${sender} versi dokumen, agar jernih`,
            mentions: [m.sender],
          },
          { quoted: m },
        );

        const mp3FileName = `suara.mp3`;
        await convertVideoToMp3(data.video, mp3FileName);

        await conn.sendFile(
          m.chat,
          mp3FileName,
          mp3FileName,
          `ini kak suaranya @${sender} versi MP3`,
          m,
        );

        await fs.unlink(mp3FileName);
      } else {
        throw "Gagal mengunduh video";
      }
    } catch (error) {
      conn.reply(m.chat, "Gagal mengunduh video", m);
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

handler.help = ["instagram"];
handler.tags = ["downloader"];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;
