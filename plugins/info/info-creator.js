import fetch from 'node-fetch';
import fs from 'fs';
import { sticker } from '../../lib/sticker.js';
import { proto, generateWAMessageFromContent, prepareWAMessageMedia } from '@rexxhayanasi/elaina-baileys'
import { googleImage } from '@bochilteam/scraper';

async function getBuffer(url) {
  if (url.startsWith('./')) return fs.readFileSync(url);
  const res = await fetch(url);
  return res.buffer();
}

const Nomorown = "6285282530851";

let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.mentionedJid?.[0] || (m.fromMe ? conn.user.jid : m.sender);
  let name = await conn.getName(who);
  let pp = await conn.profilePictureUrl(who).catch(() => hwaifu.getRandom());

  let thumbnail = await getBuffer('./media/thumbnail.jpg');
  let vn = fs.readFileSync('./vn/ownerku.mp3');

  try {
    await global.loading(m, conn);

                                                             
    let msgs = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*My Creator Elaina AI*\n\n• Nama: Elaina\n• Owner: RexxHayanasi\n\nKlik tombol di bawah untuk menghubungi owner:`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: global.wm2
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: 'Contact Owner',
              subtitle: 'Elaina AI Creator',
              hasMediaAttachment: true,
              ...await prepareWAMessageMedia({ image: { url: "https://telegra.ph/file/e5f6b989aad1333e5887b.jpg" } }, { upload: conn.waUploadToServer })
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [{
                "name": "cta_url",
                "buttonParamsJson": JSON.stringify({
                  display_text: "💬 Chat Owner",
                  url: `https://wa.me/${Nomorown}`,
                  merchant_url: `https://wa.me/${Nomorown}`
                })
              }]
            })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msgs.message, {});

                                                 
    await conn.sendFile(m.chat, vn, "introelaina.mp3", null, m, true, {
      type: 'audioMessage',
      ptt: true,
      contextInfo: {
        externalAdReply: {
          title: 'My Creator Elaina AI',
          body: global.wm,
          sourceUrl: `https://wa.me/${Nomorown}`,
          thumbnail: thumbnail,
        }
      }
    });

                                                
    let stiker = await sticker(null, global.API('https://telegra.ph/file/1d1f204fa0b46d0fd3cbc.jpg'), global.packname, global.author);
    if (stiker) await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);

  } catch (e) {
    console.error(e);
    conn.sendMessage(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', 'conversation', { quoted: m });
  } finally {
    await global.loading(m, conn, true);
  }
};

handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.command = /^(owner|creator)$/i;

export default handler;
