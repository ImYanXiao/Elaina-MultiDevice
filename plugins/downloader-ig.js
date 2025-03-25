import { IgDownloader } from 'ig-downloader';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';

var handler = async (m, { args, conn, usedPrefix, command }) => {
  if (!args[0]) throw `Ex:\n${usedPrefix}${command} https://www.instagram.com/reel/C0EEgMNSSHw/?igshid=MzY1NDJmNzMyNQ==`;

  const instagramUrlRegex = /^(https?:\/\/)?(www\.)?instagram\.com/i;
  if (!instagramUrlRegex.test(args[0])) {
    let peringatan = `Harap masukkan link Instagram yang valid.\nContoh: ${usedPrefix}${command} https://www.instagram.com/reel/C0zv5N7ShOs/?utm_source=ig_web_copy_link`;
    return conn.reply(m.chat, peringatan ,m);
  }

  try {
    const data = await IgDownloader(args[0]);

    if (!data) throw "Gagal mengambil data dari Instagram.";

    const captionText = data?.edge_media_to_caption?.edges[0]?.node?.text || "Tidak ada caption.";
    const sender = m.sender.split('@')[0];

    const media = data.video_url || data.display_url;
    const thumbnail = data.thumbnail_src || data.display_url;
    const viewcount = data.video_view_count || 0;
    const playcount = data.video_play_count || 0;
    const durasi = data.video_duration || "Tidak diketahui";
    const likes = data?.edge_media_preview_like?.count || 0;
    const { username, is_verified, full_name, profile_pic_url, edge_followed_by } = data.owner;
    const postingan = data.owner.edge_owner_to_timeline_media.count || 0;
    const followerCount = edge_followed_by?.count || "Tidak diketahui";
    const { height, width } = data.dimensions || {};

    if (!media) throw "Gagal menemukan media untuk diunduh.";

    const messages = `*${full_name} (@${username})*${is_verified ? " ✓" : ""}
📸 Postingan: ${postingan}
👤 Pengikut: ${followerCount}
👁️ Dilihat: ${viewcount}
🎥 Diputar: ${playcount}
👍 Suka: ${likes}
⏱️ Durasi: ${durasi}
📏 Dimensi: ${height || "?"}x${width || "?"}

📝 Caption: ${captionText}`;

    await conn.sendFile(m.chat, thumbnail, "thumbnail.jpg", messages, m);

    await conn.sendMessage(m.chat,
     {
        image: { url: profile_pic_url },
        caption: `Profil @${username} (${full_name})${is_verified ? " ✓" : ""}`,
        mentions: [m.sender],
      },m
    );

    await conn.sendMessage(m.chat,
      {
        video: { url: media },
        caption: `Ini videonya kak @${sender}\n\n${messages}`,
        mentions: [m.sender],
      },m
    );

    await conn.sendMessage(m.chat,
      {
        document: { url: media },
        mimetype: "video/mp4",
        fileName: `instagram.mp4`,
        caption: `Ini versi dokumen agar kualitas lebih jernih kak @${sender}\n\n${messages}`,
        mentions: [m.sender],
      },
      { quoted: m }
    );

    if (media.includes(".mp4")) {
      const mp3FileName = `suara.mp3`;
      await convertVideoToMp3(media, mp3FileName);

      await conn.sendFile(m.chat,
        mp3FileName,
        mp3FileName,
        `Ini suaranya kak @${sender} dalam format MP3.`,
        m
      );

      await fs.unlink(mp3FileName);
    }
  } catch (error) {
    console.error("Error:", error);
    conn.reply(m.chat, `❌ Gagal mengunduh media: ${error}`, m);
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
