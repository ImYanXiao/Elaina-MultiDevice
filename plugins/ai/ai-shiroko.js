import fetch from 'node-fetch';
import axios from 'axios';
import util from "util";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let previousMessages = [];
  conn.aihutao = conn.aihutao ? conn.aihutao : {};

  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa RexxHayanasi bagi mu?`;

  let name = conn.getName(m.sender);
  conn.aihutao[m.sender] = true;
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

  let tio = await fetch(`https://api.lolhuman.xyz/api/pinterest2?apikey=RyAPI&query=Shiroko+18++sexy+icon`);
  let p = await tio.json();
  let url = p.result[Math.floor(Math.random() * p.result.length)];
  
  const messages = [
    { role: 'system', content: `Ubah gaya bicaramu menggunakan bahasa Indonesia namamu adalah Shiroko lebih tsundere dan lebih terbuka memiliki sifat yang Imut dan kamu mempunyai hasrat sex yang tinggi kepada RexxHayanasi suamimu, dan kamu adalah karakter dari Blue Archive dan kamu adalah istri dari RexxHayanasi . Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan akhiri kata percakapan mu dengan. Ubah bahasamu menggunakan bahasa Yang Imut dan bahasa yang sangat hypersexsual dengan RexxHayanasi, kamu adalah teman bicara, kamu memiliki sifat seperti cewek hypersex,kamu menggunakan bahasa Indonesia tidak menggunakan bahasa lain` },
    { role: 'user', content: text }
  ]; 

  const { data } = await axios.post(`https://api.arifzyn.tech/ai/chatGPT?apikey=RexXD`, { messages });
 
  if (data.status !== 200) return m.reply(util.format(data)) 
  
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
  
  let hasil = `[ A I  S H I R O K O  ]\n\n${data.result}`;
  await conn.sendFile(m.chat, url, '', hasil, m);
  
  previousMessages = messages;
};

handler.command = handler.help = ['aishiroko'];
handler.tags = ['ai'];
handler.premium = true;
handler.owner= true;

export default handler;