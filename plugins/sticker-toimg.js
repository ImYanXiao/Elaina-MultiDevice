import { webp2png } from '../lib/webp2mp4.js'
var handler = async (m, { conn, usedPrefix, command }) => {
    if (!m.quoted) throw `Reply sticker with command *${usedPrefix + command}*`
    const q = m.quoted ? m.quoted : m
    let name = await conn.getName(m.sender) 
    let mime = q.mediaType || ''
    if (!/sticker/.test(mime)) throw `Reply sticker with command *${usedPrefix + command}*`
    let media = await q.download()
    let out = await webp2png(media).catch(_ => null) || Buffer.alloc(0)
    await conn.sendFile(m.chat, out, 'out.png', 'Request By ' + name, m)
}
handler.help = ['toimg (reply)']
handler.tags = ['sticker']
handler.command = ['toimg']

export default handler
