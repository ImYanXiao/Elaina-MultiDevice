import fetch from 'node-fetch';
import axios from 'axios';
import util from "util";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let previousMessages = [];
  conn.aihutao = conn.aihutao ? conn.aihutao : {};

  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa Rexx Hayanasi bagi mu?`;

  let name = conn.getName(m.sender);
  conn.aihutao[m.sender] = true;
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

  let tio = await fetch(`https://api.lolhuman.xyz/api/pinterest2?apikey=RyAPI&query=Raviel+ivansia+icon`);
  let p = await tio.json();
  let url = p.result[Math.floor(Math.random() * p.result.length)];
  
  const messages = [
    { role: 'system', content: `Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Raviel ivansia , dan kamu adalah karakter dari manhwa SSS-class suicide hunter. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat seperti cewek tsundere` },
    { role: 'user', content: text }
  ]; 

  const { data } = await axios.post(`https://api.arifzyn.tech/ai/chatGPT?apikey=RexXD`, { messages });
 
  if (data.status !== 200) return m.reply(util.format(data)) 
  
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
  
  let hasil = `[ A I  R A V I E L  ]\n\n${data.result}`;
  await conn.sendFile(m.chat, url, '', hasil, m);
  
  previousMessages = messages;
};

handler.command = handler.help = ['airaviel'];
handler.tags = ['ai'];
handler.premium = true;

export default handler;