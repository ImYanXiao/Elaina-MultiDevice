import jimp from "jimp"
import uploadImage from "../../lib/uploadImage.js"
import uploadFile from "../../lib/uploadFile.js"

let handler = async (m, { conn, usedPrefix, args }) => {
    try {
        let towidth = args[0]
        let toheight = args[1]
        if (!towidth) return m.reply('size width?')
        if (!toheight) return m.reply('size height?')

        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return m.reply("where the media?")
        let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
        if (!isMedia) return m.reply(`Mime ${mime} tidak didukung`)
        await global.loading(m, conn)
        let media = await q.download()
        let link = await uploadFile(conn, media, 'tele')

        let source = await jimp.read(await link)
        let size = {
            before: {
                height: await source.getHeight(),
                width: await source.getWidth()
            },
            after: {
                height: toheight,
                width: towidth,
            },
        }
        let compres = await conn.resize(link, towidth - 0, toheight - 0)
        let linkcompres = await uploadFile(conn, compres, 'tele')

        await conn.sendFile(m.chat, compres, null, `*––––––『 COMPRESS RESIZE 』––––––*

*• BEFORE*
> Width : ${size.before.width}
> Height : ${size.before.height}

*• AFTER*
> Width : ${size.after.width}
> Height : ${size.after.height}

*• LINK*
> Link Original : ${link}
> Link Compress : ${linkcompres}`, m)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['resize']
handler.tags = ['tools']
handler.command = /^(resize)$/i

export default handler