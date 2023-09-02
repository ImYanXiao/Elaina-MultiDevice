let { MessageType } = (await import('@adiwajshing/baileys')).default
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (/image|video/.test(mime)) {
            let img = await q.download()
            if (!img) throw 'Reply stiker nya!'
            let senderName = m.sender ? conn.getName(m.sender) : 'User'
            stiker = await sticker(img, false, senderName + ' ✅', `${global.namebot} ✅`)
        } else if (args[0]) {
            let senderName = m.sender ? conn.getName(m.sender) : 'User'
            stiker = await sticker(false, args[0], senderName + ' ✅', `${global.namebot(}✅`)
        }
    } finally {
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        else throw 'Conversion failed'
    }
}

handler.help = ['colong']
handler.tags = ['sticker']
handler.command = /^(colong|maling)$/i
// handler.owner = true

export default handler
