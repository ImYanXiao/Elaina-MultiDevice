import { happymod } from '../../lib/scrape.js'
let handler = async (m, { text, command, usedPrefix }) => {
    try {
        if (!text) return m.reply(`Masukan Query!\n\nContoh:\n${usedPrefix + command} minecraft`)
        await global.loading(m, conn)
        let result = await happymod(text)
        let teks = result.map((v, i) => {
            return `
*${i + 1}.* ${v.name}
❃ Link: ${v.link}
`.trim()
        }).filter(v => v).join('\n\n\n')
        m.reply(teks)
    } catch (e) {
        throw e
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ['happymod']
handler.tags = ['internet']
handler.command = /^happymod$/i
export default handler