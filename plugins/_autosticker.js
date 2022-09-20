
import { sticker } from '../lib/sticker.js'

export async function before(m, { isAdmin, isBotAdmin }) {
if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    if (chat.autoSticker) {
let q = m
let stiker = false
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp/g.test(mime)) return
if (/image/g.test(mime)) {
let img = await q.download?.()
if (!img) return
stiker = await sticker(img, false, packname, author)
} else if (/video/g.test(mime)) {
if (/video/g.test(mime)) if ((q.msg || q).seconds > 8) return await this.sendButton(m.chat, '*VIDEO TIDAK BOLEH LEBIH DARI 7 DETIK*', wm, [['NONAKTIFKAN AUTOSTIKER', '/disable autosticker']], m)
let img = await q.download()
if (!img) return
stiker = await sticker(img, false, packname, author)
} else if (m.text.split(/\n| /i)[0]) {
if (isUrl(m.text)) stiker = await sticker(false, m.text.split(/\n| /i)[0], packname, author)
else return
}
if (stiker) {
await this.sendFile(m.chat, stiker, null, { asSticker: true })
}
    }
}

const isUrl = (text) => {
return text.match(new RegExp(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))}
