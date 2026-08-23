import axios from 'axios';
import fs from 'fs';
import chalk from 'chalk';

                                                    
async function ttSearch(query) {
  try {
    const response = await axios.post("https://tikwm.com/api/feed/search", 
      new URLSearchParams({
        keywords: query,
        count: 12,
        cursor: 0,
        web: 1,
        hd: 1,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          cookie: "current_language=en",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        }
      }
    );
    return response.data.data;
  } catch (error) {
    console.error('Kesalahan saat mencari:', error);
    throw error;
  }
}

                          
const file = import.meta.url.substring(import.meta.url.indexOf('/') + 1);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update scrape"));
  import(file).then(module => {
                                            
  });
});

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    conn.ttsearch = conn.ttsearch || {};
    if (!text) {
      return conn.reply(m.chat, `*Contoh:* ${usedPrefix + command} Elaina`, m);
    }
    
    m.reply(wait);
    let res = await ttSearch(text);                                                     
    let hasil = res.videos.map((v, index) => `*${index + 1}.* *Judul:* ${v.title}\n*Wilayah:* ${v.region}`).join("\n\n");
    let url = 'https://tikwm.com' + res.videos[0].cover;
    let { key } = await conn.sendMessage(m.chat, { image: { url: url }, caption: hasil }, { quoted: m });
    await conn.reply(m.chat, `Ketik nomor *1 - ${res.videos.length}* sesuai pesan di atas`, null);
    conn.ttsearch[m.sender] = res;
  } catch (error) {
    console.log(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat menjalankan perintah', m);
  }
};

handler.before = async (m, { conn }) => {
  try {
    conn.ttsearch = conn.ttsearch || {};
    if (m.isBaileys) return;
    if (!m.text) return;
    if (!conn.ttsearch[m.sender]) return;
    if (isNaN(m.text) || m.text <= 0 || m.text > conn.ttsearch[m.sender].videos.length) return;

    let { videos } = conn.ttsearch[m.sender];
    let pilihan = videos[m.text - 1].play;
    let Video = 'https://tikwm.com' + pilihan;
    m.reply(wait);
    await conn.sendFile(m.chat, Video, null, videos[m.text - 1].title, m);
    delete conn.ttsearch[m.sender];
  } catch (error) {
    console.log(error);
    conn.reply(m.chat, 'Terjadi kesalahan saat menjalankan perintah', m);
  }
};

handler.help = ['tiktoks', 'tiktoksearch', 'ttsearch'].map(a => a + ' *[cari video dari tiktok]*');
handler.tags = ['internet', 'downloader'];
handler.command = ['tiktoks', 'tiktoksearch', 'ttsearch'];

export default handler;
