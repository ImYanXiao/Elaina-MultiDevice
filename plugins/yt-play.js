import { youtubedl, youtubedlv2, youtubeSearch } from '@bochilteam/scraper';

var handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `Gunakan contoh ${usedPrefix}${command} naruto blue bird`, m);
    }

    conn.reply(m.chat, 'Tunggu sebentar, sedang dicari dan diunduh...', m);

    let search = await youtubeSearch(text);

    if (!search || !search.video || !search.video[0]) {
      throw 'Video Tidak Ditemukan, Coba Judul Lain';
    }

    let vid = search.video[0];
    let { authorName, title, thumbnail, duration, viewH, publishedTime, url } = vid;

    let caption = `╭──── 〔 Y O U T U B E 〕 ─⬣
⬡ Judul: ${title}
⬡ Author: ${authorName}
⬡ Durasi: ${duration}
⬡ Views: ${viewH}
⬡ Upload: ${publishedTime}
⬡ Link: ${url}
╰────────⬣`;

    conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: thumbnail,
          body: wm,
          thumbnail: await (await conn.getFile(thumbnail)).data,
          sourceUrl: url,
        },
      },
    });

    const yt = await youtubedl(url).catch(async (_) => await youtubedlv2(url));
    const link = await yt.audio['128kbps'].download();
    let doc = {
      audio: {
        url: link,
      },
      mimetype: 'audio/mp4',
      fileName: `${title}`,
    };

    return conn.sendMessage(m.chat, doc, { quoted: m });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Terjadi kesalahan. Silakan coba lagi nanti.\nNyari yang bener donk...', m);
  }
};

handler.help = ['play'].map((v) => v + ' <pencarian>');
handler.tags = ['downloader'];
handler.command = /^(play|yt|youtubeplay|ytplay)$/i;

handler.exp = 0;
handler.limit = true;

export default handler;
