import { downloadContentFromMessage } from '@adiwajshing/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw `Send/Reply Images with the caption ${usedPrefix+command}`;

  if (m.quoted.mtype !== 'viewOnceMessageV2' || m.quoted.mtype !== 'viewOnceMessage') {
    throw 'Ini bukan pesan view-once.';
  }

  let msg = m.quoted.message;

  console.log(msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessage);
  console.log(msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.viewOnceMessageV2?.message);

  let type = Object.keys(msg)[0];
   
  let media = await downloadContentFromMessage(msg[type], type === 'imageMessage' ? 'image' : 'video');

  let buffer = Buffer.from([]);

  for await (const chunk of media) {
    buffer = Buffer.concat([buffer, chunk]);
  }

  if (/video/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m);
  } else if (/image/.test(type)) {
    return conn.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m);
  }
};

handler.help = ['readviewonce'];
handler.tags = ['tools'];
handler.command = /^retrieve|readviewonce|rvo/i;

export default handler;
