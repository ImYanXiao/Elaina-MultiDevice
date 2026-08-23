import sharp from "sharp"

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let notStickerMessage = `Reply sticker with command *${usedPrefix + command}*`
    if (!m.quoted) return m.reply(notStickerMessage)
    let q = m.quoted || m
    let mime = q.mediaType || ''
    if (!/sticker/.test(mime)) return m.reply(notStickerMessage)

    await global.loading(m, conn)
    let media = await q.download()

                                    
    let img = await sharp(media)
      .jpeg()
      .toBuffer()

    await conn.sendFile(m.chat, img, 'toimg.jpg', '', m)
  } finally {
    await global.loading(m, conn, true)
  }
}

handler.help = ['toimg']
handler.tags = ['sticker']
handler.command = ['toimg', 'toimage']

export default handler
