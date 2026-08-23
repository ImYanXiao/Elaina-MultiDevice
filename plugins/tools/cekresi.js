import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let args = m.text.split(' ');
  
  if (args.length < 2) throw "Format yang benar: cekresi <kurir> <resi>";

  let kurir = args[1];
  let resi = args[2];

                                  
  if (!kurir || !resi) throw "Kurir dan resi harus diisi!";
  
                                
  let url = `https://itzpire.com/check/resi?kurir=${kurir}&resi=${resi}`;
  
  try {
    let response = await fetch(url);
    if (!response.ok) throw "Gagal mendapatkan data dari server.";

    let data = await response.json();
    
                                                                                                         
    let status = data.status || "Data tidak ditemukan";
    let detail = data.detail || "Tidak ada detail";

    await m.reply(`*_📦 STATUS RESI:_*\n${status}\n\n*_📄 DETAIL:_*\n${detail}`);
  } catch (error) {
    await m.reply(`Terjadi kesalahan: ${error.message}`);
  }
}

handler.help = ['cekresi <kurir> <resi>'];
handler.tags = ['tools'];
handler.command = /^(cekresi)$/i;

export default handler;
