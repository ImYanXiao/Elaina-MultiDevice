import fs from 'fs';
import { sticker } from '../../lib/sticker.js';

import { proto, generateWAMessageFromContent, prepareWAMessageMedia } from '@rexxhayanasi/elaina-baileys'

async function getBuffer(url) {
  if (url.startsWith('./')) return fs.readFileSync(url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed fetch ${url}: ${res.status}`);

  return Buffer.from(await res.arrayBuffer());
}

function getOwnerNumber() {
  let owner = global.config?.owner;

  if (!Array.isArray(owner)) return '';

  let mainOwner = owner.find(v => Array.isArray(v) && v[2] === true) || owner[0];

  if (Array.isArray(mainOwner)) return String(mainOwner[0]).replace(/\D/g, '');

  return String(mainOwner).replace(/\D/g, '');
}

let handler = async (m, { conn }) => {
  let Nomorown = getOwnerNumber();
  let thumbnail = await getBuffer('./media/thumbnail.jpg');
  let vn = fs.readFileSync('./vn/introelaina.mp3');

  let textBuy = encodeURIComponent('Bang mau beli script Elaina 25K');
  let waUrl = `https://wa.me/${Nomorown}?text=${textBuy}`;

  try {
    await global.loading(m, conn);

    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*Informasi Script Elaina*

• Baileys: @rexxhayanasi/elaina-baileys
• Creator: Rexx Hayanasi
• Harga: 25K

Klik tombol di bawah untuk membeli:`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: 'Elaina MultiDevice | Script by RexxHayanasi'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: 'Elaina Script Official',
              subtitle: 'Script WA Bot MD',
              hasMediaAttachment: true,
              ...await prepareWAMessageMedia(
                {
                  image: {
                    url: 'https://files.catbox.moe/oebqdh.jpg'
                  }
                },
                {
                  upload: conn.waUploadToServer
                }
              )
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '💸 Beli Script 25K',
                    url: waUrl,
                    merchant_url: waUrl
                  })
                }
              ]
            })
          })
        }
      }
    }, { quoted: m });

    await conn.relayMessage(m.chat, msg.message, {});

    await conn.sendFile(m.chat, vn, 'introelaina.mp3', null, m, true, {
      type: 'audioMessage',
      ptt: true,
      contextInfo: {
        externalAdReply: {
          title: 'Script Elaina by RexxHayanasi',
          body: 'Chat langsung',
          sourceUrl: waUrl,
          thumbnail
        }
      }
    });

    let stiker = await sticker(
      null,
      global.API('https://telegra.ph/file/1d1f204fa0b46d0fd3cbc.jpg'),
      global.packname,
      global.author
    );

    if (stiker) {
      await conn.sendFile(m.chat, stiker, 'elaina-sticker.webp', '', m);
    }
  } catch (e) {
    console.error(e);
    await conn.sendMessage(
      m.chat,
      {
        text: 'Terjadi kesalahan saat mengirim informasi script.'
      },
      {
        quoted: m
      }
    );
  } finally {
    await global.loading(m, conn, true);
  }
};

handler.help = ['script', 'sc', 'infoscript'];
handler.tags = ['info'];
handler.command = /^(script|sc|infoscript)$/i;

export default handler;