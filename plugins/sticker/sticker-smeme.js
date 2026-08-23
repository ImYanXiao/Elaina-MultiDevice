import uploadFile from '../../lib/uploadFile.js'
import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let [atas, bawah] = text.split`|`
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply(`balas gambar dengan perintah\n\n${usedPrefix + command} <${atas ? atas: 'teks atas'}>|<${bawah ? bawah: 'teks bawah'}>`)
        if (!/image\/(jpe?g|png)|opus|webp/i.test(mime)) return m.reply(`_*Mime ${mime} tidak didukung!*_`)
        await global.loading(m, conn)
        let img = await q.download()
        let link = await uploadFile(conn, img, 'uguu')
        let api = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas: ' ')}/${encodeURIComponent(bawah ? bawah: ' ')}.png?background=${link}`
        let stiker = await sticker(false, api, global.config.stickpack, global.config.stickauth)
        await conn.sendFile(m.chat, stiker, false, false, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['smeme']
handler.tags = ['sticker']
handler.command = /^(smeme)$/i
handler.limit = true
export default handler