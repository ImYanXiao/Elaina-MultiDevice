//
let { MessageType } = (await import('@adiwajshing/baileys')).default
import { sticker } from '../lib/sticker.js'
let handler  = async (m, { conn, args }) => {
  let stiker = false
try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/image|video/.test(mime)) {
      let img = await q.download()
      if (!img) throw 'Reply stiker nya!'
      stiker = await sticker(img, false, '🍀', '🍭 • ᴋ ᴀ ɴ ɴ ᴀ ʙᴏᴛ :\n⤷ 𝚁𝚙𝚐 𝙱𝙾𝚃 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙')
    } else if (args[0]) stiker = await sticker(false, args[0], '🍀', '🎮 • Discord :\n⤷ https://discord.gg/WEJQjugTY7')
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    else throw 'Conversion failed'
  }
}
handler.help = ['colong']
handler.tags = ['sticker']
handler.command = /^colong$/i
handler.owner = true

export default handler
