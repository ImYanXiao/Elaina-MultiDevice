import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `Silakan masukkan teks untuk membuat attp!\nContoh penggunaan: ${usedPrefix + command} Halo`, m);
  }

  try {
    const text = args[0];
    const response = await fetch(`https://vihangayt.me/maker/text2gif?q=${encodeURIComponent(text)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status} ${response.statusText}`);
    }

    // Save the image to ./tmp/ directory
    const tmpPath = `./tmp/${Date.now()}.webp`;
    const fileStream = fs.createWriteStream(tmpPath);
    response.body.pipe(fileStream);

    // Wait for the file to be saved
    await new Promise((resolve) => fileStream.on('close', resolve));

    // Send the sticker
    await conn.sendFile(m.chat, tmpPath, 'sticker.webp', 'test', m);

    // Send the document version
    await conn.sendMessage(
      m.chat,
      {
        document: fs.readFileSync(tmpPath),
        mimetype: 'image/webp',
        fileName: 'sticker.webp',
        caption: 'Ini kak versi dokumen, agar jernih',
        mentions: [m.sender],
      },
      { quoted: m }
    );

    // Delete the temporary file
    fs.unlinkSync(tmpPath);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Terjadi kesalahan saat membuat stiker attp. Silakan coba lagi nanti. ${error.message}`, m);
  }
};

handler.command = /^(attp)$/i;
handler.help = ['attp <teks>'];
handler.tags = ['fun'];

export default handler;
