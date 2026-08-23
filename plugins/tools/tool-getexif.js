import { extractMetadata } from 'wa-sticker-formatter'
import { format } from 'util'

let handler = async (m, { conn }) => {
    if (m.quoted && /sticker/.test(m.quoted.mtype)) {
        let img = await m.quoted.download()
        if (!img) return m.reply('Can\'t extract metadata sticker!')
        let metaData = await extractMetadata(img)
        await conn.sendMessage(m.chat, { text: format(metaData) }, { quoted: m })
    } else return m.reply('Reply a sticker!')
}
handler.help = ['getexif']
handler.tags = ['tools']
handler.command = /^(getexif)$/i

export default handler