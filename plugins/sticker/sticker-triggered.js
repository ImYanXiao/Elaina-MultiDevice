import uploadImage from '../../lib/uploadImage.js'
import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply(`balas gambar dengan perintah\n\n${usedPrefix + command}`)
        if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`_*Mime ${mime} tidak didukung!*_`)
        await global.loading(m, conn)
        let img = await q.download()
        let { files } = await uploadImage(img)
        let apiUrl = global.API('https://some-random-api.com', '/canvas/overlay/triggered', { avatar: files[0].url })
        let stiker = await sticker(false, apiUrl, global.config.stickpack, global.config.stickauth)
        await conn.sendFile(m.chat, stiker, false, false, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['triggered']
handler.tags = ['sticker']
handler.command = /^(triggered)$/i

export default handler