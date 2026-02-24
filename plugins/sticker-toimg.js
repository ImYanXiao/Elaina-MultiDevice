import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, { conn, usedPrefix, command }) => {
    const notStickerMessage = `Reply sticker with command *${usedPrefix + command}*`
    if (!m.quoted) return m.reply(notStickerMessage) 
    const q = m.quoted || m
    let mime = q.mediaType || ''
    let name = await conn.getName(m.sender) 
    if (!/sticker/.test(mime)) return m.reply(notStickerMessage) 
    let media = await q.download()
    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
    await conn.sendMessage(m.chat, { image: { url : out}, mimetype:"image/png", fileName:'out.png', caption:'Request By ' + name}, {quoted: m})
}
handler.help = ['toimg (reply)']
handler.tags = ['sticker']
handler.command = ['toimg']

export default handler