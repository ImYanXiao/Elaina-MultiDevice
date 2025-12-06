import { webp2png } from '../lib/webp2mp4.js'
import { S_WHATSAPP_NET } from '@adiwajshing/baileys'

let handler = async (m, { conn, args }) => {
  let q = m.quoted || m;
  let mime = q.mimetype || q.mediaType || '';

  const setProfilePicture = async (imageBuffer) => {
    return conn.query({
      tag: 'iq',
      attrs: { to: S_WHATSAPP_NET, type: 'set', xmlns: 'w:profile:picture' },
      content: [{ tag: 'picture', attrs: { type: 'image' }, content: imageBuffer }]
    }).then(m.reply('Success')) 
};

  if (/image/.test(mime)) {
    let url = await webp2png(await q.download());
    let image = await generateProfilePicture(url)
    await setProfilePicture(image);
  } else if (args[0] && /https?:\/\//.test(args[0])) {
    let media = await generateProfilePicture(args[0]);
    await setProfilePicture(media);
  } else {
    throw 'Where\'s the media?';
  }
};

handler.alias = ['setbotpp'];
handler.command = /^setbotpp$/i;
handler.rowner = true;

export default handler;

async function generateProfilePicture(mediaUpload) {
  const bufferOrFilePath = Buffer.isBuffer(mediaUpload)
    ? mediaUpload
    : typeof mediaUpload === 'object' && 'url' in mediaUpload
    ? mediaUpload.url.toString()
    : typeof mediaUpload === 'string'
    ? mediaUpload
    : Buffer.from(mediaUpload.stream);

  const { read, MIME_JPEG, AUTO } = (await import('jimp')).default;
  const jimp = await read(bufferOrFilePath);
  const min = jimp.getWidth();
  const max = jimp.getHeight();

  const cropped = jimp.crop(0, 0, min, max);
  return cropped.quality(100).scaleToFit(720, 720, AUTO).getBufferAsync(MIME_JPEG);
}
