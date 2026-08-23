import { NHentai } from '@rexxhayanasi/nhentai'
import { extractImageThumb } from "@rexxhayanasi/elaina-baileys"
import { toPDF } from '../../lib/converter.js'
const nhentai = new NHentai()

let handler = async(m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan kode nuclear! \n\nContoh: \n${usedPrefix + command} 405397`)
        if (isNumber(text)) return m.reply(`Hanya nomor!`)
        await global.loading(m, conn)
        let result = await nhentai.getDoujin(text)
        let { data } = await conn.getFile(result.images.pages[0])
        let jpegThumbnail = await extractImageThumb(data)
        let pages = result.images.pages.map(v => {
            return `https://external-content.duckduckgo.com/iu/?u=${v}`
        })
        let imagepdf = await toPDF(pages)
        let ephemeral = conn.chats[m.chat]?.metadata?.ephemeralDuration || conn.chats[m.chat]?.ephemeralDuration || false
        await conn.sendMessage(m.chat, { document: imagepdf, jpegThumbnail, fileName: result.title + '.pdf', mimetype: 'application/pdf' }, { quoted: m, ephemeralExpiration: ephemeral })
    } catch {
    	m.reply(`Tidak dapat menemukan kode *${text}*`)
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['nhentai']
handler.tags = ['nsfw', 'premium']
handler.command = /^(nhentai)$/i
handler.premium = true
handler.nsfw = true
handler.age = 18
export default handler

const isNumber = x => typeof x === 'number' && !isNaN(x)