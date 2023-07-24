// sebenernya masih adalagi liga italia, spanyol, champions, jerman, prancis. tapi memang belom dapet/ada jadwalnya jadi yang tersedia jadwalnya itu baru indonesia atau inggris
// sering sering aja cek https://tr.deployers.repl.co/jadwal-pertandingan .
// terimakasih.

import fetch from 'node-fetch';

let handler = async (m, { conn, command }) => {
  let res = await fetch('https://tr.deployers.repl.co/jadwal-pertandingan');
  if (res.status !== 200) throw await res.text();
  let json = await res.json();
  
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error('No data found');
  }
  
  let output = '';
  
  for (let i = 0; i < json.length; i++) {
    let data = json[i].data;
    
    if (typeof data === 'string') {
      output += `*_${json[i].judul}:_*\n${data}\n\n`;
    } else if (Array.isArray(data)) {
      let matchInfo = data.join('\n');
      output += `*_${json[i].judul}:_*\n${matchInfo}\n\n`;
    }
  }
  
  m.reply(output);
};

handler.help = ['jadwalbola'];
handler.tags = ['internet'];
handler.command = /^(jadwalbola|bola)$/i;

export default handler;
