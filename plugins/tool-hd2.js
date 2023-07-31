import fs from 'fs';
import Jimp from 'jimp';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime.startsWith('image/')) {
    return m.reply(`*[ ⚠️ ] Usage*\n${usedPrefix + command}hd <balas imagenya>\n\n*Xnuvers007 🍁*`);
  }

  try {
    // ngunduh gambarnya
    let media = await q.download();
    console.log('Media downloaded successfully.');

    // loading gambar dengan jimp
    const image = await Jimp.read(media);

    // jadiin 4 kali lipat dari foto original sebelumnya
    const newWidth = image.bitmap.width * 4;
    const newHeight = image.bitmap.height * 4;

    image.resize(newWidth, newHeight);

    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    // Kirim gambar yang telah disempurnakan sebagai sebuah file dengan keterangan "Ini Foto HD nya kak"
    conn.sendFile(m.chat, buffer, 'enhanced_image.jpg', 'Ini Foto HD nya kak', m);
    console.log('Upscaled image sent to user.');
  } catch (error) {
    console.error('Error in upscaling:', error);
    m.reply('Failed to enhance the image.');
  }
};

handler.help = ['hade <balas foto>'];
handler.tags = ['tools'];
handler.command = /^(hade|hd2|jernih2)?$/i;

export default handler;
