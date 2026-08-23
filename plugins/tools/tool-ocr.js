import { ocrSpace } from "ocr-space-api-wrapper"
let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply('Fotonya Mana? Reply gambar atau upload')
        if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`Tipe ${mime} tidak didukung!`)
        await global.loading(m, conn)
        let image = await q.download()
        let download = await conn.getFile(image, true)
        let ocr = await ocrSpace(download.filename)
        m.reply(ocr.ParsedResults[0].ParsedText.trim())
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["ocr"]
handler.tags = ["tools"]
handler.command = /^(ocr)$/i
handler.limit = true
export default handler