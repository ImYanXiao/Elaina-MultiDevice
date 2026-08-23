import { leptonAi } from "../../lib/scrape.js"

let handler = async (m, { conn, usedPrefix, command, text }) => {
    try {
        if (!text) return m.reply(`Masukan text! \n\nContoh: \n${usedPrefix + command} Kapan indonesia merdeka`)
        await global.loading(m, conn)
        let result = await leptonAi(text)
        await m.reply(result, false, false, { smlcap: false })
    } finally {
        await global.loading(m, conn, true)
    }
}
handler.help = ["leptonai"]
handler.tags = ["ai"]
handler.command = /^(lepton(ai)?)$/i
export default handler