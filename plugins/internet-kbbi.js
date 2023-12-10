import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

// const apiKey = process.env.xzn;
const apiKey = 'APIKEYMU';

const url = 'https://skizo.tech/api/kbbi';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    conn.reply(m.chat, `Silakan berikan kata yang ingin dicari artinya.\nContoh: ${usedPrefix + command} meja`, m);
    return;
  }

  try {
    const response = await fetch(`${url}?query=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const data = await response.json();

    if (!data.error) {
      const { title, arti } = data.data;
      const result = `Kata: ${title}\nArti: ${arti}`;
      conn.reply(m.chat, result, m);
    } else {
      console.error('API Error:', data.message); // Log the API error message
      conn.reply(m.chat, 'Maaf, kata tidak ditemukan dalam kamus.', m);
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data:', error);
    conn.reply(m.chat, 'Terjadi kesalahan saat mengambil data.', m);
  }
};

handler.help = ['kbbi <kata>'];
handler.tags = ['tools'];
handler.command = /^(kbbi|kamusbesarbahasaindonesia|kamusbahasa|kamusbahasaindonesia|kamusindonesia|kamusindo)$/i;

export default handler;



// BACKUP
/*
import { kbbi } from '@bochilteam/scraper'

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Example use ${usedPrefix}${command} halo`
    const res = await kbbi(text)
    m.reply(`
${res.map(v => `
*📌${v.title}*

${v.means.map(v => '- ' + v).join('\n`')}
`).join('\n').trim()}

Note:
p = Partikel: kelas kata yang meliputi kata depan, kata sambung, kata seru, kata sandang, ucapan salam
n = Nomina: kata benda
`.trim())
}
handler.help = ['kbbi <teks>']
handler.tags = ['internet']
handler.command = /^kbbi$/i

export default handler
*/
