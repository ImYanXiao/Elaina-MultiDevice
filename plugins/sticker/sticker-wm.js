import { addExif } from '../../lib/sticker.js'

let handler = async (m, { conn, text }) => {
    try {
        if (!m.quoted) return m.reply('Quoted the sticker!')
        let stiker = false
        let [packname, ...author] = text.split('|')
        author = (author || []).join('|')
        let mime = m.quoted.mimetype || ''
        if (!/webp/.test(mime)) return m.reply('Reply sticker!')
        await global.loading(m, conn)
        let img = await m.quoted.download()
        stiker = await addExif(img, packname || '', author || '')
        await conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['wm']
handler.tags = ['sticker']
handler.command = /^(wm|watermark)$/i
handler.premium = false

export default handler