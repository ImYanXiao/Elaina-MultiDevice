import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import baileys from '@adiwajshing/baileys'
const { downloadMediaMessage, proto } = baileys

const tmpFile = (ext = '.png') => path.join('./tmp/', `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)

let handler = async (m, { conn, usedPrefix, command }) => {
  const notStickerMessage = `Reply stiker dengan command *${usedPrefix + command}*`;
  const wait = '⏳ Sedang mengonversi stiker ke gambar...';
  const name = await conn.getName(m.sender);
  const acumalaka = m.sender.split(`@`)[0];

  if (!m.quoted) throw notStickerMessage;

  const q = m.quoted;
  const mime = q.mimetype || '';

  if (!/image\/webp/.test(mime)) throw 'Yang direply bukan stiker!';

  try {
    m.reply(wait);

    const vM = q.vM || q.fakeObj;
//      console.log(JSON.stringify(vM.message, null, 2));

    if (!vM) throw 'Pesan tidak lengkap untuk diunduh.';
//      console.log(JSON.stringify(vM.message, null, 2));

    const media = await downloadMediaMessage(vM, 'buffer', {}, { logger: console });
    if (!media) throw 'Gagal mengunduh media.';

    const outPath = tmpFile('.png');
    await sharp(media).toFormat('png').toFile(outPath);

    await conn.sendFile(m.chat, outPath, 'out.png', `*Sukses mengonversi stiker ke gambar!*\n\n> Request By @${name}`, m);

    if (fs.existsSync(outPath)) await fs.promises.unlink(outPath);
  } catch (err) {
    console.error(err);
    m.reply('Gagal mengonversi stiker menjadi gambar.');
  }
};

handler.help = ['toimg'];
handler.tags = ['sticker'];
handler.command = ['toimg'];
handler.register = true;
handler.limit = true;

export default handler;
