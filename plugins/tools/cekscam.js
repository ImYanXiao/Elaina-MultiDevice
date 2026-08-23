import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix }) => {
  let args = m.text.split(' ');

  if (args.length < 2) throw "Format yang benar: cekscam <nomor telepon>";

  let phoneNumber = args[1];

                                 
  if (!phoneNumber) throw "Nomor telepon harus diisi!";
  
                                        
  let url = `https://itzpire.com/check/numberScammer?phoneNumber=${encodeURIComponent(phoneNumber)}`;
  
  try {
    let response = await fetch(url);
    if (!response.ok) throw "Gagal mendapatkan data dari server.";

    let data = await response.json();
    
                                                                                                         
    let isScammer = data.isScammer ? "Ya" : "Tidak";
    let detail = data.detail || "Tidak ada detail";

    await m.reply(`*_📞 STATUS NOMOR:_*\nPenipu: ${isScammer}\n\n*_📄 DETAIL:_*\n${detail}`);
  } catch (error) {
    await m.reply(`Terjadi kesalahan: ${error.message}`);
  }
}

handler.help = ['cekscam <nomor telepon>'];
handler.tags = ['tools'];
handler.command = /^(cekscam)$/i;

export default handler;
