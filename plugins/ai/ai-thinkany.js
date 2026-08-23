import { thinkany } from "../../lib/scrape.js"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan text! \n\nContoh: \n${usedPrefix + command} Bagaimana cuaca indonesia`)
        await global.loading(m, conn)
        const result = await thinkany(text)
        await m.reply(result, false, false, { smlcap: false })
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['thinkany']
handler.tags = ['ai']
handler.command = /^(thinkany)$/i
handler.limit = true
export default handler