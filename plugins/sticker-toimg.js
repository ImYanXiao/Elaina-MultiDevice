import sharp from 'sharp';
import { webp2png } from '../lib/webp2mp4.js';
import fs from 'fs';

const TIMEOUT = 10000; // 10 detik

let handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `Reply sticker dengan command *${usedPrefix + command}*`;
    
  if (!m.quoted) throw notStickerMessage;

  const q = m.quoted || m;
  const mime = q.mimetype || '';

  if (!/image\/webp/.test(mime)) {
    // Jika sticker tidak dalam format WebP, gunakan fungsi webp2png
    try {
      const name = await conn.getName(m.sender);
      const media = await q.download();
      const out = await webp2png(media).catch(_ => null) || Buffer.alloc(0);
      await conn.sendFile(m.chat, out, 'out.png', 'Request By ' + name, m);

      // Hapus file yang diunduh setelah diunggah
      await fs.promises.unlink(out || 'out.png' || './tmp/out.png' || `./tmp/${out}`);
    } catch (error) {
      console.error(error);
      m.reply(`Terjadi kesalahan: ${notStickerMessage}`);
    }
  } else {
    // Jika sticker dalam format WebP, gunakan fungsi sharp untuk konversi
    try {
      const media = await q.download();
      m.reply("Gambar telah diunduh dan OTW dijadikan gambar.");

      const decodedBuffer = await sharp(media).toFormat('png')
        .resize(4096, 4096) // Meningkatkan resolusi menjadi 4K
        .png({ quality: 100, progressive: true, compressionLevel: 9 }) // Menambahkan opsi untuk kualitas gambar yang sangat tinggi
        .toBuffer();

      if (decodedBuffer.length > 0) {
        await conn.sendFile(m.chat, decodedBuffer, 'out.png', '*DONE (≧ω≦)ゞ*', m);

        // Hapus file yang diunduh setelah diunggah
        await fs.promises.unlink('out.png' || './tmp/out.png');
      } else {
        throw 'Gagal mengonversi stiker menjadi gambar.';
      }
    } catch (error) {
      console.error(error);
      if (error.message === 'Timeout of 10000ms exceeded') {
        m.reply('Proses konversi terlalu lama. Silakan coba lagi.');
      } else {
        m.reply(`Terjadi kesalahan: ${notStickerMessage}`);
      }
    }
  }
};

handler.help = ['toimg (reply)'];
handler.tags = ['sticker'];
handler.command = ['toimg', 'toimage', 'kegambar', 'toimages','keimg','keimages','togambar'];
handler.exp = 1500;

export default handler;
