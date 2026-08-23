import fs from 'fs'
import { proto, generateWAMessageFromContent, prepareWAMessageMedia } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn }) => {
  await global.loading(m, conn)

  if (!m.chat.endsWith('@g.us')) throw '❌ Perintah ini hanya bisa digunakan di dalam grup!'

  const groupMetadata = await conn.groupMetadataPn(m.chat)
  if (!groupMetadata?.participants) throw '❌ Tidak bisa ambil data grup.'

                         
  const jids = groupMetadata.participants.map(p => p.jid)

                     
  const code = await conn.groupInviteCode(m.chat)
  const link = `https://chat.whatsapp.com/${code}`

                            
  let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `Hai kak, ini link group-nya ya >//<\n\n👥 *Jumlah Member:* ${jids.length}`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: global.wm2
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: '👥 Link Group',
            hasMediaAttachment: true,
            ...await prepareWAMessageMedia(
              { image: { url: 'https://files.catbox.moe/oebqdh.jpg' } },
              { upload: conn.waUploadToServer }
            )
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: 'cta_copy',
                buttonParamsJson: JSON.stringify({
                  display_text: '📋 Salin Link',
                  copy_code: link
                })
              },
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: '🔗 Buka Link',
                  url: link,
                  merchant_url: link
                })
              }
            ]
          })
        })
      }
    }
  }, { quoted: m })

  await conn.relayMessage(m.chat, msg.message, {})

  const thumb = fs.readFileSync('./media/thumbnail.jpg')

  await conn.sendMessage(m.chat, {
    audio: fs.readFileSync('./vn/introelaina.mp3'),
    mimetype: 'audio/mp4',
    ptt: true,
    contextInfo: {
      externalAdReply: {
        title: global.wm2,
        body: 'Elaina - MultiDevice',
        mediaType: 2,
        renderLargerThumbnail: true,
        thumbnail: thumb,
        sourceUrl: link
      }
    }
  }, { quoted: m })

  await global.loading(m, conn, true)
}

handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^link(gro?up)?$/i
handler.group = true
handler.admin = true
handler.isBotAdmin = true

export default handler
