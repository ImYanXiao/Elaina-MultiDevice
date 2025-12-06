import fetch from 'node-fetch';
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `*⛌ Masukan Emoji Yg ingin kamu gabungkan*\n\n*• Example:*\n- ${usedPrefix + command} 😂+😂\n- ${usedPrefix + command} 😂 😂\n\n[ minimal 2 emoji ]`;
  }

  let emojis = text.split(/[\+\s]/).filter(Boolean); // Memisahkan emoji berdasarkan '+' atau spasi
  if (emojis.length < 2) {
    throw 'Masukkan minimal 2 emoji untuk di-mix';
  }

  try {
    const response = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emojis.join('_'))}`);
    
    if (!response.ok) {
      throw `Error: Gagal menghubungi API Tenor (status code: ${response.status})`;
    }

    const anu = await response.json();
    
    if (!anu.results || anu.results.length === 0) {
      throw 'Kombinasi Emojimix Tidak Ditemukan';
    }

    let emixUrl = anu.results[0].media_formats.png_transparent.url;
    
    const imageResponse = await fetch(emixUrl);
    if (!imageResponse.ok) {
      throw `Error: Gagal mendownload gambar (status code: ${imageResponse.status})`;
    }
    const buffer = await imageResponse.buffer(); // Mengonversi gambar menjadi buffer

    let stiker = await sticker(buffer, null, global.packname, global.author);
    
    conn.sendFile(m.chat, stiker, null, { asSticker: true }, m);
  } catch (error) {
    throw `Terjadi kesalahan: ${error.message || error}`;
  }
}

handler.help = ['emojimix'];
handler.tags = ['sticker'];
handler.command = /^(emojimix|emix)$/i;

export default handler;
