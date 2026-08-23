import uploadImage from '../../lib/uploadImage.js'
import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted: m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return m.reply(`balas gambar dengan perintah\n\n${usedPrefix + command}`)
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`_*Mime ${mime} tidak didukung!*_`)
    global.db.data.settings[conn.user.jid].loading ? await m.reply(global.config.loading) : false
    let img = await q.download()
    let { files } = await uploadImage(img)
    let apiUrl = global.API('https://some-random-api.com', '/canvas/overlay/wasted', { avatar: files[0].url })
    let stiker = await sticker(false, apiUrl, global.config.stickpack, global.config.stickauth)
    conn.sendFile(m.chat, stiker, '', '', m)
}
handler.help = ['wasted']
handler.tags = ['sticker']
handler.command = /^(wasted)$/i

export default handler