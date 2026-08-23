import uploadImage from '../../lib/uploadImage.js'
import { sticker } from '../../lib/sticker.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Gambar Yang Anda Masukan Tidak Didukung`)
        await global.loading(m, conn)
        let img = await q.download()
        let { files } = await uploadImage(img)
        let meme = global.API('lol', '/api/creator1/wanted', { img: files[0].url }, 'apikey')
        let stiker = await sticker(false, meme, global.config.stickpack, global.config.stickauth)
        await conn.sendFile(m.chat, stiker, '', '', m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['wanted']
handler.tags = ['sticker']
handler.command = /^(wanted)$/i
handler.limit = true
export default handler