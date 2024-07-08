import sharp from 'sharp';
import { webp2png } from '../lib/webp2mp4.js';
import fs from 'fs';

const TIMEOUT = 20000; // 20 detik

let handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `Reply sticker dengan command *${usedPrefix + command}*`;
    
  if (!m.quoted) throw notStickerMessage;

  const q = m.quoted || m;
  const mime = q.mimetype || '';

  if (!/image\/webp/.test(mime)) {
    try {
      const name = await conn.getName(m.sender);
      const media = await q.download();
      const out = await webp2png(media).catch(_ => null) || Buffer.alloc(0);
      await conn.sendFile(m.chat, out, 'out.png', 'Request By ' + name, m);

      if (fs.existsSync(out || 'out.png' || './tmp/out.png' || `./tmp/${out}`)) {
        await fs.promises.unlink(out || 'out.png' || './tmp/out.png' || `./tmp/${out}`);
      }
    } catch (error) {
      console.error(error);
      m.reply(`Terjadi kesalahan: ${notStickerMessage}`);
    }
  } else {
    try {
      const media = await q.download();
      m.reply("Gambar telah diunduh dan OTW dijadikan gambar.");

      const decodedBuffer = await sharp(media).toFormat('png')
        .resize(4096, 4096)
        .png({ quality: 100, progressive: true, compressionLevel: 9 })
        .toBuffer();

      if (decodedBuffer.length > 0) {
        await conn.sendFile(m.chat, decodedBuffer, 'out.png', '*DONE (≧ω≦)ゞ*', m);

        if (fs.existsSync('out.png' || './tmp/out.png')) {
          await fs.promises.unlink('out.png' || './tmp/out.png');
        }
      } else {
        throw 'Gagal mengonversi stiker menjadi gambar.';
      }
    } catch (error) {
      console.error(error);
      if (error.message.includes('Timeout')) {
        m.reply('Proses konversi terlalu lama. Silakan coba lagi.');
      } else {
        m.reply(`Terjadi kesalahan: ${notStickerMessage}`);
      }
    }
  }
};

handler.help = ['toimg (reply)'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'toimage', 'kegambar', 'toimages', 'keimg', 'keimages', 'togambar'];
handler.exp = 1500;

export default handler;
