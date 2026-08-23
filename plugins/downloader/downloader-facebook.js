import { facebook } from '../../lib/scrape.js'
import { fileTypeFromBuffer } from 'file-type'
let handler = async (m, { conn, usedPrefix, command, args }) => {
    try {
        if (!args[0]) {
            return m.reply(`Masukan link facebook! \n\nContoh : \n${usedPrefix + command} https://www.facebook.com/reel/842055207643962?s=yWDuG2&fs=e&mibextid=Nif5oz`)
        }
        if (!/facebook\.\w+\/(reel|watch|share)/gi.test(args[0])) {
            return m.reply("URL Tidak Valid, Masukkan URL Video Facebook yang Valid")
        }
        let ephemeral = conn.chats[m.chat]?.metadata?.ephemeralDuration || conn.chats[m.chat]?.ephemeralDuration || false
        await global.loading(m, conn)
        let { media, title }= await facebook(args[0])
        let { data } = await conn.getFile(media)
        let sizeMB = data.byteLength / (1024 * 1024)
        if (sizeMB > 50000) {
            let mimetype = await fileTypeFromBuffer(data)
            await conn.sendMessage(m.chat, { document: data, fileName: Date.now() + ".mp4", mimetype, caption: title }, { quoted: m, ephemeralExpiration: ephemeral })
        } else {
            await conn.sendFile(m.chat, data, false, title, m)
        }
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['facebook']
handler.tags = ['downloader']
handler.command = /^(fb|facebook(dl)?)$/i
handler.limit = true
export default handler