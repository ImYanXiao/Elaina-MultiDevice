import jimp from "jimp"
import uploadImage from "../../lib/uploadImage.js"
import uploadFile from "../../lib/uploadFile.js"

let handler = async (m, { conn, usedPrefix }) => {
    try {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply("where the media?")
        await global.loading(m, conn)

        let media = await q.download()
        let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
        let link = await uploadFile(conn, media, 'tele')

        let source = await jimp.read(await link)
        let height = await source.getHeight()
        let width = await source.getWidth()

        m.reply(`_*RESOLUTION :*_ ${width} x ${height}

> Width : ${width}
> Height : ${height}

> Link : ${link}`)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['cekresolution']
handler.tags = ['tools']
handler.command = /^(cekreso(lution)?)$/i

export default handler