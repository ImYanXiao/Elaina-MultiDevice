import { webp2png } from '../lib/webp2mp4.js'
import { S_WHATSAPP_NET } from '@adiwajshing/baileys'

let handler = async (m, { conn, args }) => {
  let q = m.quoted || m;
  let mime = q.mimetype || q.mediaType || '';
  const setProfilePicture = async (imageBuffer) => {
    return conn.query({
      tag: 'iq',
      attrs: { target: m.chat, to: S_WHATSAPP_NET, type: 'set', xmlns: 'w:profile:picture' },
      content: [{ tag: 'picture', attrs: { type: 'image' }, content: imageBuffer }]
    }).then(() => m.reply('Success'));
  };

  if (/image/.test(mime)) {
    let url = await webp2png(await q.download());
    let image = await generateProfilePicture(url);
    await setProfilePicture(image);
  } else if (args[0] && /https?:\/\//.test(args[0])) {
    let media = await generateProfilePicture(args[0]);
    await setProfilePicture(media);
  } else {
    throw 'Where\'s the media?';
  }
};

handler.help = ['setppgrup']
handler.tags = ['group']
handler.alias = ['setppgc', 'setppgrup', 'setppgroup']
handler.command = /^setpp(gc|grup|group)$/i
handler.group = handler.admin = handler.botAdmin = true

export default handler;

async function generateProfilePicture(mediaUpload) {
  let bufferOrFilePath;
  
  if (Buffer.isBuffer(mediaUpload)) {
    bufferOrFilePath = mediaUpload;
  } else if (typeof mediaUpload === 'object' && 'url' in mediaUpload) {
    bufferOrFilePath = mediaUpload.url.toString();
  } else if (typeof mediaUpload === 'string') {
    bufferOrFilePath = mediaUpload;
  } else {
    bufferOrFilePath = Buffer.from(mediaUpload.stream);
  }

  const { read, MIME_JPEG, AUTO } = (await import('jimp')).default;
  const jimp = await read(bufferOrFilePath);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return await cropped.quality(100).scaleToFit(720, 720, AUTO).getBufferAsync(MIME_JPEG);
}
