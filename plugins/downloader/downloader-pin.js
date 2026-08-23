import axios from 'axios'
import fetch from 'node-fetch'
import { proto, generateWAMessageFromContent, generateWAMessageContent } from '@rexxhayanasi/elaina-baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`⊏|⊐ *Contoh:* ${usedPrefix + command} elaina majo no tabi tabi`)

  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } })

                                                             
  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent(
      { image: { url } },
      { upload: conn.waUploadToServer }
    )
    return imageMessage
  }

                                
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

                                
  let push = []
  let { data } = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}&type=image`)
  let res = Array.isArray(data.data) ? data.data : []

  if (!res.length) return m.reply('Gagal mengambil gambar dari Pinterest. Coba kata kunci lain!')

  shuffleArray(res)
  let hasil = res.splice(0, 5)
  let i = 1

  for (let img of hasil) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Image ke - ${i++}`,
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: '乂 P I N T E R E S T',
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: '',
        hasMediaAttachment: true,
        imageMessage: await createImage(img.image_url),                     
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: 'Source 🔍',
              url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}`,
              merchant_url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}`
            }),
          },
        ],
      }),
    })
  }

                          
  const message = generateWAMessageFromContent(
    m.chat,
    {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `Hasil Dari: ${text}`,
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '乂 P I N T - C A R O U S E L',
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false,
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [...push],
            }),
          }),
        },
      },
    },
    { quoted: m }
  )

  await conn.relayMessage(m.chat, message.message, { messageId: message.key.id })
  await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } })
}

handler.help = ['pinterest']
handler.tags = ['downloader']
handler.command = /^(pinterest|pin)$/i

export default handler
