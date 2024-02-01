import { lyrics, lyricsv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `Gunakan contoh ${usedPrefix}${command} NamaPenyanyi NamaLagu\n*${usedPrefix}${command} one direction story of my life*`;

  try {
    const artistAndSong = args.join(' '); // Menggabungkan kata-kata dalam args menjadi satu string
    const result = await lyricsv2(artistAndSong).catch(async _ => await lyrics(artistAndSong));

    const server = await fetch(`https://vihangayt.me/search/lyrics?q=${encodeURIComponent(artistAndSong)}`);
    const data = await server.json();

    m.reply(`
Lyrics *${result.title}*
Author ${result.author}

${result.lyrics}

Url ${result.link}
    `.trim());

    if (data.status) {
      const { artist, lyrics, title } = data.data;

      conn.reply(m.chat, `
Lyrics *${title}*
Artist ${artist}

${lyrics}
      `.trim(), m);
    } else {
      if (data.data && data.data.error) {
        conn.reply(m.chat, `Tidak dapat menemukan lirik. ${data.data.error}`, m);
      } else {
        throw 'Gagal mendapatkan lirik lagu.';
      }
    }
  } catch (error) {
    console.error('Error:', error);
    conn.reply(m.chat, `Terjadi kesalahan saat memproses permintaan. ${error}`, m);
  }
};

handler.help = ['lirik'].map(v => v + ' <Apa>');
handler.tags = ['internet'];
handler.command = /^(lirik|lyrics|lyric)$/i;

export default handler;
