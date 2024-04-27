/* Atas segala hormat, saya Turut berduka cita kepada seseorang yang mendapatkan musibah ini
❤ Semoga diberikan ketabahan kepada Tuhan Yang Maha Esa❤
*/

import fetch from 'node-fetch';
import sharp from 'sharp';

const link = 'https://data.bmkg.go.id/DataMKG/TEWS/';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.reply("Mohon tunggu sebentar...\n" + wait);
  try {
    let res = await fetch(link + 'autogempa.json');
    let res2 = await fetch(link + 'gempaterkini.json');
    let anu = await res.json();
    let anu2 = await res2.json();
    anu = anu.Infogempa.gempa;
    anu2 = anu2.Infogempa.gempa;
    
    let txt = `*INFORMASI GEMPA TERKINI*:\n\n`;
    txt += `Tanggal     : ${anu.Tanggal} ${anu.Jam}\n`;
    txt += `Potensi     : ${anu.Potensi}\n`;
    txt += `Magnitude   : ${anu.Magnitude}\n`;
    txt += `Kedalaman   : ${anu.Kedalaman}\n`;
    txt += `Wilayah     : ${anu.Wilayah}\n`;
    txt += `Lintang     : ${anu.Lintang}\n`;
    txt += `Bujur       : ${anu.Bujur}\n`;
    txt += `Koordinat   : ${anu.Coordinates}\n`;
    txt += `Google Maps : https://google.com/maps/place/${anu.Coordinates}`;

    if (anu.Dirasakan) {
      txt += `\nDirasakan   : ${anu.Dirasakan}\n\nSupport me on https://trakteer.id/Xnuvers007\nYou can Scan me on DANA https://bioskop-six.vercel.app/images`;
    }
      txt += `\n\n===============================\nINFORMASI GEMPA SEBELUMNYA:\n\n`;
    for (let i = 0; i < anu2.length; i++) {
      txt += `\t\t\t\t\t\t\t *GEMPA KE-${i+1}* \n`;
      txt += `Tanggal     : ${anu2[i].Tanggal} ${anu2[i].Jam}\n`;
      txt += `Coordinates : ${anu2[i].Coordinates}\n`;
      txt += `Lintang     : ${anu2[i].Lintang}\n`;
      txt += `Bujur       : ${anu2[i].Bujur}\n`;
      txt += `Google Maps : https://google.com/maps/place/${anu2[i].Coordinates}\n`;
      txt += `Magnitude   : ${anu2[i].Magnitude}\n`;
      txt += `Kedalaman   : ${anu2[i].Kedalaman}\n`;
      txt += `Wilayah     : ${anu2[i].Wilayah}\n`;
      txt += `Potensi     : ${anu2[i].Potensi}\n`;
      txt += `\nSupport Developer on https://trakteer.id/Xnuvers007\nYou can Scan me on DANA https://bioskop-six.vercel.app/images\n\n`;
    }

    let imgBuffer = await (await fetch(link + anu.Shakemap)).buffer();
    let img = await sharp(imgBuffer).png().toBuffer();

    await conn.sendFile(m.chat, img, 'shakemap.png', txt, m);
  } catch (e) {
    console.log(e);
    m.reply(`[!] Fitur Error.`);
  }
};

handler.help = ['gempa'];
handler.tags = ['internet', 'info'];
handler.command = /^(gempa|gempabumi|earthquake)$/i;

export default handler;
