import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const jimp = require('jimp')

let handler = async (m, { conn, command, usedPrefix }) => {
  // LID helpers usage
  const sender = (global.decodeSender ? global.decodeSender(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.sender) : m.sender));
  const chatId = (global.decodeChat ? global.decodeChat(m, conn) : (conn?.decodeJid ? conn.decodeJid(m.chat) : m.chat));

  // LID injection removed (now using global helpers)

  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''

  if (/image/.test(mime) && !/webp/.test(mime)) {
    try {
      let media = await q.download()
      let { img } = await prepareProfilePicture(media)
      let botJid = conn.user.id

      await conn.query({
        tag: 'iq',
        attrs: {
          to: botJid,
          type: 'set',
          xmlns: 'w:profile:picture'
        },
        content: [
          {
            tag: 'picture',
            attrs: { type: 'image' },
            content: img
          }
        ]
      })

      m.reply('✅ Foto profil bot berhasil diubah.')
    } catch (e) {
      console.error('[ERROR setppbot]', e)
      m.reply(`❌ Gagal mengubah foto profil bot.\n\n📄 *Log Error:*\n\`\`\`${e.message || e}\`\`\``)
    }
  } else {
    m.reply(`❗ Balas gambar dengan caption *${usedPrefix + command}* untuk mengubah PP bot.`)
  }
}

handler.help = ['setppbot']
handler.tags = ['owner']
handler.command = /^(setppbot|setbotpp|setppbotfull|setbotppfull|setppbotpanjang)$/i
handler.owner = true

export default handler

async function prepareProfilePicture(buffer) {
  const image = await jimp.read(buffer)
  const min = image.getWidth()
  const max = image.getHeight()
  const cropped = image.crop(0, 0, min, max)

  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(jimp.MIME_JPEG),
  }
}