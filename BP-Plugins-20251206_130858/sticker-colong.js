let { MessageType } = (await import('@adiwajshing/baileys')).default
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (/image|video/.test(mime)) {
            let img = await q.download()
            if (!img) throw 'Reply stiker nya!'
            let senderName = m.sender ? conn.getName(m.sender) : 'User'
            stiker = await sticker(img, false, senderName + ' ✅', 'Agar silahturahmi tidak terputus, izinkan saya pinjam seratus😁')
        } else if (args[0]) {
            let senderName = m.sender ? conn.getName(m.sender) : 'User'
            let url = args[0]
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                // auto tambahkan https:// atau https:// kalo user lupa
                url = 'https://' + url
            }
            stiker = await sticker(false, url, senderName + ' ✅', 'Agar silahturahmi tidak terputus, izinkan saya pinjam seratus😁')
        } else {
            throw `Reply stiker nya  atau gambarnya atau ketik 'colong [link/url]'\n\n==============================\n${usedPrefix + command} <Reply gambar>\n${usedPrefix + command} <Reply sticker>\n${usedPrefix + command} https://api.duniagames.co.id/api/content/upload/file/7081780811647600895.png\n${usedPrefix + command} api.duniagames.co.id/api/content/upload/file/7081780811647600895.png\n==============================`
        }
    } finally {
        if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    }
}

handler.help = ['colong <reply sticker>', 'colong <reply gambar>', 'colong <URL/LINK>']
handler.tags = ['sticker']
handler.command = /^(colong|maling|colongsticker|colongstiker|malingsticker|malingstiker)$/i

export default handler
