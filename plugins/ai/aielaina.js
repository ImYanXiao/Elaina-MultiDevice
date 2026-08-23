import fetch from 'node-fetch';
import axios from 'axios';
import util from "util";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let previousMessages = [];
    conn.aihutao = conn.aihutao || {};

    if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa Rexx Hayanasi bagi mu?`;

    let name = conn.getName(m.sender);
    conn.aihutao[m.sender] = true;
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });

                                            
    let tio = await fetch(`https://api.lolhuman.xyz/api/pinterest2?apikey=RyAPI&query=Elaina+Majo+no+tabi+tabiicon`);
    let p = await tio.json();
    let url = p.result[Math.floor(Math.random() * p.result.length)];

                                                 
    const prompt = `Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang imut. Namamu adalah Elaina istrinya RexxzynXD, dan kamu adalah karakter dari Anime Majo no Tabitabi. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa yang imut, kamu adalah teman bicara, kamu memiliki sifat seperti cewek tsundere menggunakan Emoji untuk mendukung suasana dalam berbicara`;

                                   
    const apiUrl = `https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(prompt)}&content=${encodeURIComponent(text)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.status || !data.data) {
      return m.reply(util.format(data));
    }

    await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

                   
    let hasil = `[ A I  E L A I N A  ]\n\n${data.data}`;

                             
    await conn.sendMessage(m.chat, {
      image: { url },
      caption: hasil
    }, { quoted: m });

                                                     
    previousMessages = [
      { role: 'system', content: prompt },
      { role: 'user', content: text }
    ];
  } catch (err) {
    console.error('Terjadi error pada handler AI Elaina:', err);
    if (err.code === 'ENOENT') {
      await m.reply('Error: File atau direktori yang diminta tidak ditemukan. Mohon cek kembali konfigurasi atau jalur file yang digunakan.');
    } else {
      await m.reply(`Error: ${err.message || err}`);
    }
  }
};

handler.command = handler.help = ['aielaina'];
handler.tags = ['ai'];
handler.premium = true;

export default handler;
