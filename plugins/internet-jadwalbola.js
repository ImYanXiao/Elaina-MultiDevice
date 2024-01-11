// sebenernya masih adalagi liga italia, spanyol, champions, jerman, prancis. tapi memang belom dapet/ada jadwalnya jadi yang tersedia jadwalnya itu baru indonesia atau inggris
// sering sering aja cek https://tr.deployers.repl.co/jadwal-pertandingan .
// terimakasih.

import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
  let res = await fetch('https://0e87ad76-6c4e-40ff-bb5a-6bbdab145ae2-00-39qk1kw7vab6l.worf.replit.dev/jadwal-pertandingan');
  if (res.status !== 200) throw await res.text();
  let json = await res.json();
  m.reply('bentar dulu yakk...')
  
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error('No data found');
  }
  
  let output = '';
  
  for (let i = 0; i < json.length; i++) {
    let data = json[i].data;
    
    if (typeof data === 'string') {
      output += `*_${json[i].judul}:_*\n==========================\n${data}\n\n--------------------------------\n`;
    } else if (Array.isArray(data)) {
      let matchInfo = data.join('\n\n');
      output += `*_${json[i].judul}:_*\n==========================\n${matchInfo}\n\n----------------------------\n`;
    }
  }
  
  m.reply(output);
};

handler.help = ['jadwalbola'];
handler.tags = ['internet'];
handler.command = /^(jadwalbola|bola)$/i;

export default handler;
